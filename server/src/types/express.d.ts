import { JwtPayload } from "jsonwebtoken";

export interface UserPayload extends JwtPayload {
  userId: string;
  name: string;
  email: string;
  role: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: UserPayload;
    }
  }
}
