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
}
export class User {
  static async findByUsername(username: string): Promise<UserData[]> {
    const connection = createDatabaseConnection();
    const db = connection.getConnection();

    try {
      const checkQuery = "SELECT * FROM users WHERE username = ?";
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

  static async getAllUserData(userId: string): Promise<any[]> {
    const connection = createDatabaseConnection();
    const db = connection.getConnection();

    try {
      const data = await new Promise<any[]>((resolve, reject) => {
        db.query(
          "SELECT * FROM users WHERE id = ?",
          [userId],
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
    email: string
  ): Promise<UpdateResult> {
    const connection = createDatabaseConnection();
    const db = connection.getConnection();

    try {
      let query: string;
      let queryParams: (string | number)[];

      // Retrieve the existing user data from the database
      const getUserQuery = "SELECT username, email FROM users WHERE id = ?";
      const getUserParams = [id];

      const existingUser: any = await new Promise((resolve, reject) => {
        db.query(getUserQuery, getUserParams, (error, results) => {
          if (error) {
            console.error("Error retrieving user data:", error);
            reject("Error retrieving user data");
          } else {
            resolve(results[0]);
          }
        });
      });

      if (!existingUser) {
        throw new Error("User not found");
      }

      // Check if the new data matches the existing data
      if (username === existingUser.username && email === existingUser.email) {
        throw new Error("No changes detected. User update aborted.");
      }

      // Update the user data in the database
      query = "UPDATE users SET username = ?, email = ? WHERE id = ?";
      queryParams = [username, email, id];

      const result: any = await new Promise((resolve, reject) => {
        db.query(query, queryParams, (error, result) => {
          if (error) {
            console.error("Error updating user:", error);
            reject("Error updating user");
          } else if (result.changedRows === 1) {
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

  static async updateBio(id: string, bio: string): Promise<UpdateResult> {
    const connection = createDatabaseConnection();
    const db = connection.getConnection();

    try {
      let query: string;
      let queryParams: (string | number)[];

      query = "UPDATE users SET bio = ? WHERE id = ?";
      queryParams = [bio, id];

      const result: any = await new Promise((resolve, reject) => {
        db.query(query, queryParams, (error, result) => {
          if (error) {
            console.error("Error updating nio:", error);
            reject("Error updating nio");
          } else if (result.changedRows === 1) {
            resolve({
              success: true,
              message: "Bio updated successfully",
            });
          }
        });
      });

      connection.closeConnection();

      if (!result) {
        throw new Error("Bio update failed");
      }

      return result;
    } catch (error) {
      console.error("Error updating bio:", error);
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
