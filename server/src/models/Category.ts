import createDatabaseConnection from "../config";

export class Category {
  static async getCategories() {
    const connection = createDatabaseConnection();
    const db = connection.getConnection();
    
    const query = `SELECT * FROM categories`;
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
  }
  catch(error: any) {
    console.error("Error in getPosts", error);
    throw error;
  }
}
