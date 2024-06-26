import bcrypt from "bcrypt";
import { Request, Response } from "express";
import {User} from "../../models/ChatUserModel";
import generateTokenAndSetCookie from "../../utils/generateTokenAndSetCookie";

interface SignupRequest extends Request {
  body: {
    username: string;
    // password: string;
    // confirmPassword: string;
  };
}

interface LoginRequest extends Request {
  body: {
    username: string;
    // password: string;
  };
}

export const signup = async (req: SignupRequest, res: Response): Promise<void> => {
  try {
    const { username } = req.body;

    // if (password !== confirmPassword) {
    //   res.status(400).json({ error: "Passwords don't match" });
    //   return;
    // }

    const user = await User.findOne({ username });

    if (user) {
      res.status(400).json({ error: "Username already exists" });
      return;
    }

    // HASH PASSWORD HERE
    // const salt = await bcrypt.genSalt(10);
    // const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      // password: hashedPassword
    });

    if (newUser) {
      // Generate JWT token here
      generateTokenAndSetCookie(newUser._id, res);
      await newUser.save();

      res.status(201).json({
        _id: newUser._id,
        username: newUser.username,
      });
    } else {
      res.status(400).json({ error: "Invalid user data" });
    }
  } catch (error: any) {
    console.log("Error in signup controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const loginOrRegister = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, password } = req.body;
    
    // Check if user exists
    let user = await User.findOne({ username });

    if (!user) {
      // If user does not exist, register the user
      const hashedPassword = await bcrypt.hash(password, 10);
      user = new User({
        username,
        password: hashedPassword
      });
      await user.save();
    } else {
      // If user exists, check if the password is correct
      const isPasswordCorrect = await bcrypt.compare(password, user.password);
      if (!isPasswordCorrect) {
        res.status(400).json({ error: "Invalid username or password" });
        return;
      }
    }

    // Generate token and set cookie
    const token = generateTokenAndSetCookie(user._id, res);

    res.status(200).json({
      _id: user._id,
      username: user.username,
      token,
    });
  } catch (error: any) {
    console.log("Error in loginOrRegister controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const logout = (req: Request, res: Response): void => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error: any) {
    console.log("Error in logout controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
