import createDatabaseConnection from "../config";

type EventInputs = {
  title: string;
  description: string;
  date: Date;
  time: string;
  location: string;
  music: string;
  price: string;
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
      e.time,
      e.location,
      e.image, 
      e.music,
      e.price,
      e.user_id,
      u.email,
      u.profile_picture,
      GROUP_CONCAT(DISTINCT ec.category_id) AS category_Id,
      GROUP_CONCAT(DISTINCT c.category) AS categories
  FROM events e
  LEFT JOIN users u ON e.user_id = u.id
  LEFT JOIN event_category ec ON e.id = ec.event_id
  LEFT JOIN categories c ON ec.category_id = c.id
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
    u.email,
    u.profile_picture,
    e.id AS event_id,
    e.title,
    e.description,
    e.date,
    e.time,
    e.location,
    e.image, 
    e.music,
    e.price,
    GROUP_CONCAT(DISTINCT c.category) AS categories,
    GROUP_CONCAT(DISTINCT ec.category_id) AS category_Id
FROM events e 
LEFT JOIN users u ON e.user_id = u.id 
LEFT JOIN event_category ec ON e.id = ec.event_id 
LEFT JOIN categories c ON ec.category_id = c.id
WHERE e.id = ?
GROUP BY e.id;
`;

    return new Promise((resolve, reject) => {
      db.query(query, [id], (error, result) => {
        if (error) {
          reject(error);
          connection.closeConnection();
        } else {
          // if (result.length === 0) {
          //   reject(new Error("Event does not exist"));
          //   connection.closeConnection();
          // } else {
          // resolve(result);
          const postsWithImagesAndCategories =
            this.structureEventResult(result);
          resolve(postsWithImagesAndCategories);
          // }
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
      const createEventQuery = `INSERT INTO events (title, description, date, time, location, image, music, price, user_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
      const createEventValues = [
        inputs.title,
        inputs.description,
        inputs.date,
        inputs.time,
        inputs.location,
        inputs.files[0].path,
        inputs.music,
        inputs.price,
        inputs.user_id,
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
    } catch (error) {
      console.error("Error creating or updating event:", error);
      connection.closeConnection();
      throw error;
    }
  }

  static async updatePost({
    id,
    title,
    description,
    date,
    time,
    location,
    user_id,
    music,
    price,
    categories,
  }: {
    title: string;
    description: string;
    id: string;
    date: Date;
    time: string;
    location: string;
    user_id: string;
    music: string;
    price: string;
    categories: string[];
  }): Promise<any> {
    const connection = createDatabaseConnection();
    const db = connection.getConnection();

    try {
      const updateQuery =
        "UPDATE events SET title = ?, description = ?, date = ?, time = ?, location = ?, user_id = ?, music = ?, price = ? WHERE id = ?;";
      const updateValues = [
        title,
        description,
        date,
        time,
        location,
        user_id,
        music,
        price,
        id,
      ];

      db.query(updateQuery, updateValues, async (error, result) => {
        try {
          if (categories?.length > 0) {
            await Event.deleteCategory(id);
            await Event.addCategory(id, categories);
          } else {
            const existingTagsQuery =
              "SELECT category_id FROM event_category WHERE event_id = ?";
            db.query(existingTagsQuery, [id], async (error, result) => {
              if (error) {
                console.error("Error fetching existing categories:", error);
                connection.closeConnection();
                throw error;
              }
              const existingTags: string[] = result.map(
                (row: any) => row.tag_id
              );
              if (existingTags.length > 0) {
                await Event.addCategory(id, existingTags);
              }
            });
          }

          connection.closeConnection();
          return { success: true, id };
        } catch (error) {
          console.error("Error adding categories:", error);
          throw error;
        }
      });
    } catch (error) {
      console.error("Error in updateEvent:", error);
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
          "INSERT INTO event_category (event_id, category_id) VALUES (?, ?)";
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

  static async deleteCategory(eventId: string) {
    const connection = createDatabaseConnection();
    const db = connection.getConnection();

    const query = "DELETE FROM event_category WHERE event_id = ?";
    return new Promise((resolve, reject) => {
      db.query(query, [eventId], (error, _) => {
        if (error) {
          reject(error);
          return;
        }
        resolve(true);
      });
    });
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
        const getEventByMusic = await this.filterByMusic(word);
        const getEventByCost = await this.filterByCost(word);
        const getEventByLocation = await this.filterByLocation(word);
        const getEventByCategory = await this.filterByCategory(word);
        resolve({
          getEventByTitle,
          getEventByDescription,
          getEventByMusic,
          getEventByCost,
          getEventByLocation,
          getEventByCategory,
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

  static async filterByMusic(word: string) {
    const connection = createDatabaseConnection();
    const db = connection.getConnection();

    try {
      const query = `SELECT * FROM events WHERE music LIKE ?`;

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
      console.error("Error in filterByMusic", error);
      throw error;
    }
  }

  static async filterByCost(word: string) {
    const connection = createDatabaseConnection();
    const db = connection.getConnection();

    try {
      const query = `SELECT * FROM events WHERE price LIKE ?`;

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
      console.error("Error in filterByCost", error);
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
    e.price,
    GROUP_CONCAT(DISTINCT c.category) AS categories
FROM events e 
LEFT JOIN users u ON e.user_id = u.id
LEFT JOIN event_category ec ON e.id = ec.event_id
LEFT JOIN categories c ON ec.category_id = c.id
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
