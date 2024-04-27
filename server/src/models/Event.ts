import createDatabaseConnection from "../config";

type EventInputs = {
    title: string;
    description: string;
    date: Date;
    location: string;
    details: string;
    user_id: string;
    files: Express.Multer.File[];
  };

class Post {
  static async getEvents() {
    const connection = createDatabaseConnection();
    const db = connection.getConnection();

    try {
      const query = `SELECT * FROM events`;

      const data = await new Promise((resolve, reject) => {
        db.query(query, (error, result) => {
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
      console.error("Error in getPosts", error);
      throw error;
    }
  }

  static async createEvent(inputs: EventInputs): Promise<any> {
    const connection = createDatabaseConnection();
    const db = connection.getConnection();

    try {
      const eventQuery = `INSERT INTO events (title, description, date, location, details, user_id, image) VALUES (?, ?, ?, ?, ?, ?);`;
      const eventValues = [
        inputs.title,
        inputs.description,
        new Date(),
        inputs.location,
        inputs.details,
        inputs.user_id,
        inputs.files,
      ];

      db.query(eventQuery, eventValues, async (error, result) => {
        if (error) {
          console.error("Error creating event:", error);
          connection.closeConnection();
          throw error;
        } else {
          return result;
        }
      });
    } catch (error) {
      console.error("Error creating post:", error);
      connection.closeConnection();
      throw error;
    }
  }

  static async deleteEventById(eventId: string): Promise<any> {
    const connection = createDatabaseConnection();
    const db = connection.getConnection();

    return new Promise((resolve, reject) => {
      const query = `DELETE FROM events WHERE id = ?;`;
      db.query(query, [eventId], (error, data) => {
        if (error) {
          reject(error);
        } else {
          resolve(data);
        }
      });
      connection.closeConnection();
    });
  }

  static async searchEvent(word: string) {
    return new Promise(async (resolve, reject) => {
      try {
        const getEventByTitle = await Post.filterByTitle(word);
        const getEventByDescription = await Post.filterByDescription(word);
        const getEventByAuthor = await Post.filterByAuthor(word);
        resolve({
            getEventByTitle,
            getEventByDescription,
            getEventByAuthor,
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
      const query = `SELECT * FROM events WHERE title LIKE ?`;

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
      const query = `SELECT * FROM events WHERE description LIKE ?`;

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
      e.id,
      e.title,
      e.description,
      e.date,
      e.location,
      e.details,
      e.image
      FROM events e 
      LEFT JOIN users u ON e.user_id = u.id
      WHERE 
      u.username LIKE ?`;

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
}

export default Post;
