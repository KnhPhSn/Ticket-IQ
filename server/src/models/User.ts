import { InferSchemaType, Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

interface IUserMethods {
  createTokens(): { accessToken: string; refreshToken: string };
  comparePassword(password: string): Promise<boolean>;
}

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide a name'],
      maxLength: 50,
      minLength: 3,
    },
    email: {
      type: String,
      required: [true, 'Please provide an email'],
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        'Please provide a valid email',
      ],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Please provide a password'],
      minLength: 6,
    },
    role: {
      type: String,
      enum: ['user', 'moderator', 'admin'],
      default: 'user',
    },
    skills: [String],
  },
  { timestamps: true }
);

userSchema.pre('save', async function () {
  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.createTokens = function () {
  const accessToken = jwt.sign(
    { userId: this._id, name: this.name, role: this.role, email: this.email },
    process.env.ACCESS_TOKEN_SECRET!,
    { expiresIn: '15m' }
  );

  const refreshToken = jwt.sign(
    { userId: this._id, name: this.name, role: this.role, email: this.email },
    process.env.REFRESH_TOKEN_SECRET!,
    { expiresIn: '1h' }
  );
  return { accessToken, refreshToken };
};

userSchema.methods.comparePassword = async function (
  password: string
): Promise<boolean> {
  return await bcrypt.compare(password, this.password);
};

export type UserType = InferSchemaType<typeof userSchema> & IUserMethods;
const User = model<UserType>('User', userSchema);
export default User;
