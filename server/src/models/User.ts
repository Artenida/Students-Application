import createDatabaseConnection from "../config";
import bcrypt from "bcrypt";

interface UserData {
  id: number;
  username: string;
  email: string;
  password: string;
  profile_picture: string;
}

interface DeleteResult {
  affectedRows?: number;
}

interface UpdateResult {
  success: boolean;
  message: string;
  result?: string;
}
export class User {
  static async findByUsername(username: string): Promise<UserData[]> {
    const connection = createDatabaseConnection();
    const db = connection.getConnection();

    try {
      const checkQuery = `SELECT u.*, uni.subject, s.social_media
      FROM users u
      LEFT JOIN university uni ON u.id = uni.user_id
      LEFT JOIN socials s ON u.id = s.user_id
      WHERE u.username = ?;
      `;
      const data = await new Promise<UserData[]>((resolve, reject) => {
        db.query(checkQuery, [username], (error, data) => {
          connection.closeConnection();
          if (error) {
            reject(error);
          } else {
            resolve(data as UserData[]);
          }
        });
      });

      return data;
    } catch (error) {
      console.error("Error in findByUsername:", error);
      throw error;
    }
  }

  static async createUser(username: string, email: string, password: string) {
    const connection = createDatabaseConnection();
    const db = connection.getConnection();

    try {
      const hashedPassword = await bcrypt.hash(password, 10);

      const insertQuery =
        "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
      const values = [username, email, hashedPassword];

      await db.query(insertQuery, values);
      connection.closeConnection();

      return true;
    } catch (error) {
      connection.closeConnection();
      throw error;
    }
  }

  static async getAllUserData(id: string): Promise<any[]> {
    const connection = createDatabaseConnection();
    const db = connection.getConnection();

    try {
      const data = await new Promise<any[]>((resolve, reject) => {
        db.query(
          `SELECT u.id, u.username, u.password, u.email, u.profile_picture, u.bio, uni.subject 
   FROM users u
   LEFT JOIN university uni ON u.id = uni.user_id
   WHERE u.id = ?`,
          [id],
          (error, result) => {
            if (error) {
              reject(error);
            } else {
              resolve(result);
            }
            connection.closeConnection();
          }
        );
      });

      return data;
    } catch (error) {
      console.error("Error in getAllUserData:", error);
      throw error;
    }
  }

  static async updateUser(
    id: string,
    username: string,
    email: string,
    bio: string,
  ): Promise<UpdateResult> {
    const connection = createDatabaseConnection();
    const db = connection.getConnection();

    try {
      let query: string;
      let queryParams: (string | number)[];

      query = "UPDATE users SET username = ?, email = ?, bio = ? WHERE id = ?";
      queryParams = [username, email, bio, id];

      const result: any = await new Promise((resolve, reject) => {
        db.query(query, queryParams, (error, result) => {
          if (error) {
            console.error("Error updating user:", error);
            reject("Error updating user");
          } else {
            resolve({
              success: true,
              message: "User updated successfully",
            });
          }
        });
      });

      connection.closeConnection();

      if (!result) {
        throw new Error("User update failed");
      }

      return result;
    } catch (error) {
      console.error("Error updating user:", error);
      connection.closeConnection();
      throw error;
    }
  }

  static async updateUniversity(
    userId: string,
    newSubject: string
  ): Promise<UpdateResult> {
    const connection = createDatabaseConnection();
    const db = connection.getConnection();

    try {
      // Check if a record with the provided id exists in the university table
      const checkQuery =
        "SELECT COUNT(*) AS count FROM university WHERE user_id = ?";
      const checkParams = [userId];

      const countResult: any = await new Promise((resolve, reject) => {
        db.query(checkQuery, checkParams, (error, result) => {
          if (error) {
            console.error("Error checking university record:", error);
            reject("Error checking university record");
          } else {
            resolve(result[0].count);
          }
        });
      });

      let query: string;
      let queryParams: (string | number)[];

      if (countResult === 1) {
        // Update the existing record
        query = "UPDATE university SET subject = ? WHERE user_id = ?";
        queryParams = [newSubject, userId];
      } else {
        // Insert a new record
        query = "INSERT INTO university (user_id, subject) VALUES (?, ?)";
        queryParams = [userId, newSubject];
      }

      const result: any = await new Promise((resolve, reject) => {
        db.query(query, queryParams, (error, result) => {
          if (error) {
            console.error("Error updating university:", error);
            reject("Error updating university");
          } else {
            resolve({
              success: true,
              message: "University updated successfully",
            });
          }
        });
      });

      connection.closeConnection();

      if (!result) {
        throw new Error("University update failed");
      }

      return result;
    } catch (error) {
      console.error("Error updating university:", error);
      connection.closeConnection();
      throw error;
    }
  }

  static async updateProfilePicture(userId: string, file: Express.Multer.File) {
    const connection = createDatabaseConnection();
    const db = connection.getConnection();

    try {
      const query = `
          UPDATE users
          SET profile_picture = ?
          WHERE id = ?
        `;

      await new Promise((resolve, reject) => {
        db.query(query, [file.path, userId], (error, result) => {
          connection.closeConnection();
          if (error) {
            reject(error);
          } else {
            resolve(file.path);
          }
        });
      });
    } catch (error) {
      console.error("Error in updateProfilePicture", error);
      throw error;
    }
  }

  static async deleteUser(id: number): Promise<boolean> {
    const connection = createDatabaseConnection();
    const db = connection.getConnection();

    try {
      const query = `DELETE FROM users WHERE id = ?;`;
      const result: DeleteResult = await new Promise((resolve, reject) => {
        db.query(query, [id], (error, result) => {
          if (error) {
            console.error("Error deleting user:", error);
            connection.closeConnection();
            reject(error);
          } else {
            resolve(result);
          }
        });
      });

      connection.closeConnection();

      if (result && result.affectedRows === 0) {
        return false;
      }

      return true;
    } catch (error) {
      console.error("Error deleting user:", error);
      throw error;
    }
  }
}
