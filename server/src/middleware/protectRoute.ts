import jwt from "jsonwebtoken";
import { User, UserDocument } from "../models/ChatUserModel";
import { Request, Response, NextFunction } from "express";

declare global {
  namespace Express {
    interface Request {
      user?: UserDocument;
    }
  }
}

const protectRoute = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      res.status(401).json({ error: "Unauthorized - No Token Provided" })
      return;
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      res.status(401).json({ error: "Unauthorized - No Token Provided" });
      return 
    }

    const decoded: any = jwt.verify(token, process.env.JWT_SECRET || "");

    if (!decoded) {
      res.status(401).json({ error: "Unauthorized - Invalid Token" });
      return 
    }

    const user: UserDocument = await User.findById(decoded.userId).select("-password");

    if (!user) {
      res.status(404).json({ error: "User not found" });
      return 
    }

    req.user = user;
    next();
  } catch (error: any) {
    console.log("Error in protectRoute middleware: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export default protectRoute;


// import jwt from "jsonwebtoken";
// import { User, UserDocument } from "../models/ChatUserModel";
// import { Request, Response, NextFunction } from "express";

// declare global {
//   namespace Express {
//     interface Request {
//       user?: UserDocument;
//     }
//   }
// }

// const protectRoute = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
//   try {
//     const token = req.cookies.jwt;

//     if (!token) {
//       res.status(401).json({ error: "Unauthorized - No Token Provided" });
//       return;
//     }

//     const decoded: any = jwt.verify(token, process.env.JWT_SECRET || "");

//     if (!decoded) {
//       res.status(401).json({ error: "Unauthorized - Invalid Token" });
//       return;
//     }

//     const user: UserDocument = await User.findById(decoded.userId).select("-password");

//     if (!user) {
//       res.status(404).json({ error: "User not found" });
//       return;
//     }

//     req.user = user;

//     next();
//   } catch (error: any) {
//     console.log("Error in protectRoute middleware: ", error.message);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };

// export default protectRoute;
