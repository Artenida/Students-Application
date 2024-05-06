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
  category: string[];
  files: Express.Multer.File[];
};

class Event {
  static async getEvents() {
    const connection = createDatabaseConnection();
    const db = connection.getConnection();

    try {
      const query = `SELECT 
      e.id,
      e.title,
      e.description,
      e.date,
      e.location,
      e.user_id,
      e.image, 
      e.music,
      e.cost,
      u.email,
      u.profile_picture,
      GROUP_CONCAT(DISTINCT ec.category_id) AS category_Id,
      GROUP_CONCAT(DISTINCT c.category) AS categories
  FROM events e
  LEFT JOIN users u ON e.user_id = u.id
  LEFT JOIN events_category ec ON e.id = ec.event_id
  LEFT JOIN category c ON ec.category_id = c.id
  GROUP BY e.id
  ORDER BY e.date DESC;
  `;

      const data = await new Promise((resolve, reject) => {
        db.query(query, (error, result) => {
          connection.closeConnection();
          if (error) {
            reject(error);
          } else {
            // resolve(result);
            const postsWithImagesAndTags = this.structureEventResult(result);
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

  static async getEventById(id: string) {
    const connection = createDatabaseConnection();
    const db = connection.getConnection();

    const query = `
    SELECT 
    u.id AS user_id,
    u.username,
    u.profile_picture,
    e.id AS event_id,
    e.title,
    e.description,
    e.date,
    e.location,
    e.image, 
    e.music,
    e.cost,
    GROUP_CONCAT(DISTINCT c.category) AS categories,
    GROUP_CONCAT(DISTINCT ec.category_id) AS category_Id
FROM events e 
LEFT JOIN users u ON e.user_id = u.id 
LEFT JOIN events_category ec ON e.id = ec.event_id 
LEFT JOIN category c ON ec.category_id = c.id
WHERE e.id = ?
GROUP BY e.id;
`;

    return new Promise((resolve, reject) => {
      db.query(query, [id], (error, result) => {
        if (error) {
          reject(error);
          connection.closeConnection();
        } else {
          if (result.length === 0) {
            reject(new Error("Post does not exist"));
            connection.closeConnection();
          } else {
            // resolve(result);
            const postsWithImagesAndTags = this.structureEventResult(result);
            resolve(postsWithImagesAndTags);
          }
        }
      });
    });
  }

  static structureEventResult(result: any[]) {
    return result.map((event: any) => {
      const categoryId = event.category_Id ? event.category_Id.split(",") : [];
      const category = event.categories ? event.categories.split(",") : [];

      const categories = categoryId.map(
        (categoryId: string, index: number) => ({
          id: categoryId,
          name: category[index].trim(),
        })
      );

      return {
        ...event,
        categories: categories,
      };
    });
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
                inputs.id,
                inputs.title,
                inputs.description,
                new Date(),
                inputs.location,
                inputs.user_id,
                inputs.files[0].path,
                inputs.music,
                inputs.cost,
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
              const createEventQuery = `INSERT INTO events (id, title, description, date, location, user_id, files, music, cost) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
              const createEventValues = [
                inputs.id,
                inputs.title,
                inputs.description,
                new Date(),
                inputs.location,
                inputs.user_id,
                inputs.files[0].path,
                inputs.music,
                inputs.cost,
              ];

              db.query(
                createEventQuery,
                createEventValues,
                async (createError, createResult) => {
                  if (createError) {
                    console.error("Error creating event:", createError);
                    connection.closeConnection();
                    throw createError;
                  }
                  // else {
                  //   return createResult;
                  // }
                  const eventId = createResult.insertId;
                  try {
                    await Event.addCategory(eventId, inputs.category);
                    connection.closeConnection();
                    return { success: true, eventId };
                  } catch (error) {
                    console.log("Error adding category", error);
                    connection.closeConnection();
                    throw error;
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

  static async addCategory(eventId: string, category: string[]) {
    const connection = createDatabaseConnection();
    const db = connection.getConnection();

    try {
      if (category) {
        const query =
          "INSERT INTO events_category (event_id, category_id) VALUES (?, ?)";
        await new Promise((resolve, reject) => {
          for (const cat of category) {
            db.query(query, [eventId, cat], (error, result) => {
              if (error) {
                reject(error);
              } else {
                resolve(result);
              }
            });
          }
        });
      }

      connection.closeConnection();

      return { success: true };
    } catch (error) {
      console.error("Error adding categories", error);
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
        const getEventByCategory = await this.filterByCategory(word);
        resolve({
          getEventByTitle,
          getEventByDescription,
          getEventByAuthor,
          getEventByLocation,
          getEventByCategory
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

  static async filterByCategory(word: string) {
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
    e.cost,
    GROUP_CONCAT(DISTINCT c.category) AS categories
FROM events e 
LEFT JOIN users u ON e.user_id = u.id
LEFT JOIN events_category ec ON e.id = ec.event_id
LEFT JOIN category c ON ec.category_id = c.id
WHERE c.category LIKE ?
GROUP BY e.id;`;

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
      console.error("Error in filterByCategory", error);
      throw error;
    }
  }
}

export default Event;
