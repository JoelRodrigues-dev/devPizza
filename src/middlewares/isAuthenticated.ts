import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

interface payLoad {
  sub: string;
}

export function isAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authToken = req.headers.authorization;

  if (!authToken) {
    return res.status(401).json({ message: "unauthorized token" });
  }

  const [, token] = authToken.split(" ");

  try {
    const { sub } = verify(token, process.env.JWT_PASS) as payLoad;

    req.user_id = sub;

    return next();
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
}
