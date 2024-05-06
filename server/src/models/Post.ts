import createDatabaseConnection from "../config";
interface PostInterface {
  post_id: string;
  title: string;
  description: string;
  createdAt: Date;
  images: [];
}

type PostInputs = {
  title: string;
  description: string;
  user_id: string;
  files: Express.Multer.File[];
};

class Post {
  static async getPosts() {
    const connection = createDatabaseConnection();
    const db = connection.getConnection();

    try {
      const query = `
            SELECT 
                p.id,
                p.title,
                p.description,
                p.createdAt,
                p.user_id,
                u.username, 
                u.profile_picture,
                GROUP_CONCAT(DISTINCT i.image_url) AS images
            FROM posts p 
            LEFT JOIN users u ON p.user_id = u.id
            LEFT JOIN images i ON p.id = i.post_id
            GROUP BY p.id;
        `;

      const data = await new Promise<PostInterface[]>((resolve, reject) => {
        db.query(query, (error, result) => {
          connection.closeConnection();
          if (error) {
            reject(error);
          } else {
            const postsWithImagesAndTags = this.structurePostResult(result);
            resolve(postsWithImagesAndTags);
          }
        });
      });

      return data;
    } catch (error) {
      console.error("Error in getPosts", error);
      throw error;
    }
  }

  static async getPostById(postId: string) {
    const connection = createDatabaseConnection();
    const db = connection.getConnection();

    const query = `
    SELECT 
        u.id AS user_id,
        u.username,
        u.profile_picture,
        p.id AS post_id,
        p.title,
        p.description,
        p.createdAt AS createdAt,
        GROUP_CONCAT(DISTINCT i.image_url) AS images
    FROM posts p 
    LEFT JOIN users u ON p.user_id = u.id 
    LEFT JOIN images i ON p.id = i.post_id
    WHERE p.id = ?
    GROUP BY p.id, u.id, u.username, u.profile_picture, p.title, p.description, p.createdAt;
`;

    return new Promise((resolve, reject) => {
      db.query(query, [postId], (error, result) => {
        if (error) {
          reject(error);
          connection.closeConnection();
        } else {
          if (result.length === 0) {
            reject(new Error("Post does not exist"));
            connection.closeConnection();
          } else {
            const postsWithImagesAndTags = this.structurePostResult(result);
            resolve(postsWithImagesAndTags);
          }
        }
      });
    });
  }

  static structurePostResult(result: any[]) {
    return result.map((post: any) => {
      return {
        ...post,
        images: post.images
          ? post.images
              .split(",")
              .map((image: string) => ({ url: image.trim() }))
          : [],
      };
    });
  }

  static async createPost(inputs: PostInputs): Promise<any> {
    const connection = createDatabaseConnection();
    const db = connection.getConnection();

    try {
      const postQuery =
        "INSERT INTO posts (title, description, createdAt, user_id) VALUES (?, ?, ?, ?)";
      const postValues = [
        inputs.title,
        inputs.description,
        new Date(),
        inputs.user_id,
      ];

      db.query(postQuery, postValues, async (error, result) => {
        if (error) {
          console.error("Error creating post:", error);
          connection.closeConnection();
          throw error;
        }

        const postId = result.insertId;

        try {
          await Post.addImages(postId, inputs.files);
          connection.closeConnection();
          return { success: true, postId };
        } catch (error) {
          console.error("Error adding images:", error);
          connection.closeConnection();
          throw error;
        }
      });
    } catch (error) {
      console.error("Error creating post:", error);
      connection.closeConnection();
      throw error;
    }
  }

  static async updatePost({title, description, id} : {title: string, description: string, id: string}): Promise<any> {
    const connection = createDatabaseConnection();
    const db = connection.getConnection();

    try {
      const postQuery =
        "UPDATE posts SET title = ?, description = ? WHERE id = ?;";
      const postValues = [
        title,
        description,
        id
      ];

      db.query(postQuery, postValues, async (error, result) => {
        if (error) {
          console.error("Error updating post:", error);
          connection.closeConnection();
          throw error;
        } else {
          return result;
        }
      });
    } catch (error) {
      console.error("Error updating post:", error);
      connection.closeConnection();
      throw error;
    }
  }

  static async addImages(postId: any, images: Express.Multer.File[]) {
    const connection = createDatabaseConnection();
    const db = connection.getConnection();
    const query = "INSERT INTO images (post_id, image) VALUES (?, ?)";

    try {
      await Promise.all(
        images.map(async (element) => {
          await new Promise((resolve, reject) => {
            db.query(query, [postId, element.path], (err, _) => {
              if (err) {
                reject(err);
              } else {
                resolve(true);
              }
            });
          });
        })
      );

      connection.closeConnection();
      return { success: true };
    } catch (error) {
      console.error("Error adding images", error);
      throw error;
    }
  }

  static async deletePostById(postId: string): Promise<any> {
    const connection = createDatabaseConnection();
    const db = connection.getConnection();

    return new Promise((resolve, reject) => {
      const q = "DELETE FROM posts WHERE `id` = ?";
      db.query(q, [postId], (error, data) => {
        if (error) {
          connection.closeConnection();
          reject(error);
        } else {
          connection.closeConnection();
          resolve(data);
        }
      });
    });
  }

  static async searchPost(word: string) {
    return new Promise(async (resolve, reject) => {
      try {
        const getPostByTitle = await Post.filterByTitle(word);
        const getPostByDescription = await Post.filterByDescription(word);
        const getPostByAuthor = await Post.filterByAuthor(word);
        resolve({
          getPostByTitle,
          getPostByDescription,
          getPostByAuthor,
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  static async filterByTitle(word: string) {
    const connection = createDatabaseConnection();
    const db = connection.getConnection();

    try {
      const query = `
            SELECT 
                u.id,
                u.username,
                u.profile_picture,
                p.id,
                p.title,
                p.description,
                p.createdAt
            FROM 
                posts p
                LEFT JOIN users u ON p.user_id = u.id
            WHERE 
                p.title LIKE ?;
        `;

      const data = await new Promise((resolve, reject) => {
        db.query(query, [`%${word}%`], (error, result) => {
          connection.closeConnection();
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        });
      });

      return data;
    } catch (error) {
      console.error("Error in filterByTitle", error);
      throw error;
    }
  }

  static async filterByDescription(word: string) {
    const connection = createDatabaseConnection();
    const db = connection.getConnection();

    try {
      const query = `
            SELECT 
                u.id,
                u.username,
                u.profile_picture,
                p.id,
                p.title,
                p.description,
                p.createdAt
            FROM 
                posts p
                LEFT JOIN users u ON p.user_id = u.id
            WHERE 
                p.description LIKE ?;
        `;

      const data = await new Promise((resolve, reject) => {
        db.query(query, [`%${word}%`], (error, result) => {
          connection.closeConnection();
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        });
      });

      return data;
    } catch (error) {
      console.error("Error in filterByDescription", error);
      throw error;
    }
  }

  static async filterByAuthor(word: string) {
    const connection = createDatabaseConnection();
    const db = connection.getConnection();

    try {
      const query = `
            SELECT 
                u.id,
                u.username,
                u.profile_picture,
                p.id,
                p.title,
                p.description,
                p.createdAt
            FROM 
                posts p
                LEFT JOIN users u ON p.user_id = u.id
            WHERE 
                u.username LIKE ?;
        `;

      const data = await new Promise((resolve, reject) => {
        db.query(query, [`%${word}%`], (error, result) => {
          connection.closeConnection();
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        });
      });

      return data;
    } catch (error) {
      console.error("Error in filterByAuthor", error);
      throw error;
    }
  }

  static async retrieveBlogsByUser(userId: string) {
    const connection = createDatabaseConnection();
    const db = connection.getConnection();

    const query = `SELECT 
    u.id AS user_id,
    u.username,
    u.profile_picture,
    u.bio,
    u.email,
    p.id,
    p.title,
    p.description,
    p.createdAt AS created_at,
    GROUP_CONCAT(DISTINCT i.image_url) AS images
FROM 
    posts p 
    LEFT JOIN users u ON p.user_id = u.id 
    LEFT JOIN images i ON p.id = i.post_id
WHERE 
    u.id = ? 
GROUP BY 
    u.id, u.username, u.profile_picture, u.bio, u.email, p.id, p.title, p.description, p.createdAt;`;

    try {
      return new Promise((resolve, reject) => {
        db.query(query, [userId], (error, result) => {
          connection.closeConnection();
          if (error) {
            reject(error);
          } else {
            const postsWithImagesAndTags = this.structurePostResult(result);
            resolve(postsWithImagesAndTags);
          }
        });
      });
    } catch (error) {
      console.error("Error in getUsersPost", error);
      connection.closeConnection();
      throw error;
    }
  }
}

export default Post;
