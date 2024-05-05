import createDatabaseConnection from "../config";

type EventInputs = {
  id: string;
  title: string;
  description: string;
  date: Date;
  location: string;
  music: string;
  cost: string;
  user_id: string;
  files: Express.Multer.File[];
};

class Event {
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
      const existingEventQuery = `SELECT * FROM events WHERE id = ?`;
      db.query(
        existingEventQuery,
        [inputs.id],
        async (error, existingResult) => {
          if (error) {
            console.error("Error checking existing event:", error);
            connection.closeConnection();
            throw error;
          } else {
            if (existingResult.length > 0) {
              const updateEventQuery = `UPDATE events SET title = ?, description = ?, date = ?, location = ?, user_id = ?, music = ?, cost = ? WHERE id = ?;`;
              const updateEventValues = [
                inputs.title,
                inputs.description,
                new Date(),
                inputs.location,
                inputs.user_id,
                inputs.music,
                inputs.cost,
                inputs.id,
                // inputs.files,
              ];

              db.query(
                updateEventQuery,
                updateEventValues,
                async (updateError, updateResult) => {
                  if (updateError) {
                    console.error("Error updating event:", updateError);
                    connection.closeConnection();
                    throw updateError;
                  } else {
                    return updateResult;
                  }
                }
              );
            } else {
              const createEventQuery = `INSERT INTO events (id, title, description, date, location, user_id, music, cost) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
              const createEventValues = [
                inputs.id,
                inputs.title,
                inputs.description,
                new Date(),
                inputs.location,
                inputs.user_id,
                inputs.music,
                inputs.cost,
                // inputs.files,
              ];

              db.query(
                createEventQuery,
                createEventValues,
                async (createError, createResult) => {
                  if (createError) {
                    console.error("Error creating event:", createError);
                    connection.closeConnection();
                    throw createError;
                  } else {
                    return createResult;
                  }
                }
              );
            }
          }
        }
      );
    } catch (error) {
      console.error("Error creating or updating event:", error);
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
        const getEventByTitle = await this.filterByTitle(word);
        const getEventByDescription = await this.filterByDescription(word);
        const getEventByAuthor = await this.filterByAuthor(word);
        const getEventByLocation = await this.filterByLocation(word);
        resolve({
          getEventByTitle,
          getEventByDescription,
          getEventByAuthor,
          getEventByLocation
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

  static async filterByLocation(word: string) {
    const connection = createDatabaseConnection();
    const db = connection.getConnection();

    try {
      const query = `
      SELECT * FROM events WHERE location LIKE ?`;

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
      e.image,
      e.music,
      e.cost
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

export default Event;
