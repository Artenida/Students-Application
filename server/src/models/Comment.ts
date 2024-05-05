import createDatabaseConnection from "../config";

interface CommentInputs {
  postId: string;
  userId: string;
  comment_text: string;
  date_created: Date;
}

class Comments {
  static async addComments(
    postId: String,
    user_id: String,
    comment_text: String
  ) {
    const connection = createDatabaseConnection();
    const db = connection.getConnection();
    const query = `INSERT INTO comments (post_id, user_id, comment_text, date_created) VALUES (?, ?, ?, ?)`;

    try {
      await new Promise((resolve, reject) => {
        db.query(
          query,
          [postId, user_id, comment_text, new Date()],
          (err, result) => {
            if (err) {
              reject(err);
            } else {
              resolve(result);
            }
          }
        );
      });
    } catch (error) {
      console.error("Error adding comments", error);
      throw error;
    }
  }

  static async deleteCommentsById(commentId: string): Promise<any> {
    const connection = createDatabaseConnection();
    const db = connection.getConnection();

    return new Promise((resolve, reject) => {
      const query = `DELETE FROM comments WHERE id = ?`;
      db.query(query, [commentId], (error, data) => {
        connection.closeConnection();
        if (error) {
          reject(error);
        } else {
          resolve(data);
        }
      });
    });
  }

  static async getPostComments(postId: string) {
    const connection = createDatabaseConnection();
    const db = connection.getConnection();
    const query = `SELECT * FROM comments WHERE post_id = ?`;

    try {
      return new Promise((resolve, reject) => {
        db.query(query, [postId], (error, result) => {
          connection.closeConnection();
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        });
      });
    } catch (error) {
      console.error("Error in getPostComments", error);
      connection.closeConnection();
      throw error;
    }
  }
}
export default Comments;
