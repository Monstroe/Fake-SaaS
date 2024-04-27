import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

function generateAccessToken(id: number, username: string, permissions: number) {
  return jwt.sign({ id: id, username: username, permissions: permissions }, process.env.ACCESS_TOKEN_KEY as string, { expiresIn: "1h" });
}

function authenticateToken(req: Request, res: Response, next: NextFunction) {

  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.sendStatus(401).json({ error: "No token provided" });

  jwt.verify(token, process.env.ACCESS_TOKEN_KEY as string, (err: jwt.VerifyErrors | null, user: string | jwt.JwtPayload | undefined) => {
    if (err) return res.sendStatus(403).json({ error: "Invalid token" });
    req.user = user as JSON;
    next();
  });
}

function authenticateAdmin(req: Request, res: Response, next: NextFunction) {
  authenticateToken(req, res, () => {
    const user = req.user as JwtPayload;
    if (user.permissions === 1) {
      next();
    } else {
      res.sendStatus(403).json({ error: "Unauthorized" });
    }
  });
}

export { generateAccessToken, authenticateToken, authenticateAdmin };
