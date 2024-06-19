import mongoose from "mongoose";
interface UserDocument extends Document {
	_id?: string;
	username: string;
	password: string;
	createdAt: Date;
	updatedAt: Date;
  }

const userSchema = new mongoose.Schema(
	{
		username: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
			minlength: 6,
		}
		// createdAt, updatedAt => Member since <createdAt>
	},
	{ timestamps: true }
);

const User = mongoose.model("User", userSchema);

export { User, UserDocument };
