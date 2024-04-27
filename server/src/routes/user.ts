import express, { Request, Response, Router } from "express";
import { pool } from "../utils/database";
import { hashPassword, comparePassword } from "../utils/crypt";
import { authenticateToken, authenticateAdmin, generateAccessToken } from "../utils/auth";

const router: Router = express.Router();

router.get("/", authenticateAdmin, async (req: Request, res: Response) => {
  try {
    const sql = "SELECT * FROM Users";
    const rows = await pool.query(sql);
    res.status(200).json(rows);
  } catch (error) {
    res.status(400).json({ error: error });
  }
});

router.post("/login", async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ error: "Missing fields" });
    }
    const sql = "SELECT UserID, UserName, PasswordHash, FirstName, LastName, IsAdmin FROM Users WHERE UserName = ?";
    const rows = await pool.query(sql, [username]);
    if (rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }
    const user = rows[0];
    if (await comparePassword(password, rows[0].PasswordHash)) {
      res.status(200).json({
        id: user.UserID,
        token: generateAccessToken(user.UserID, user.UserName, user.IsAdmin)
      });
    } else {
      res.status(403).json({ error: "Invalid password" });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error });
  }
});

router.get("/logout", authenticateToken, async (req: Request, res: Response) => {
  res.status(200).json({ message: "User logged out" });
});

router.post("/register", async (req: Request, res: Response) => {
  try {
    const { username, password, firstname, lastname } = req.body;
    if (!username || !password || !firstname || !lastname) {
      return res.status(400).json({ error: "Missing fields" });
    }
    const passwordHash = await hashPassword(password);
    const sql = "INSERT INTO Users (UserName, PasswordHash, FirstName, LastName, Plan, IsAdmin) VALUES (?, ?, ?, ?, ?, ?)";
    await pool.query(sql, [username, passwordHash, firstname, lastname, 1, 0]);
    res.status(201).json({ message: "User created" });
  } catch (error) {
    res.status(400).json({ error: error });
  }
});

router.get("/get/:UserID", authenticateToken, async (req: Request, res: Response) => {
  try {
    const id = req.params.UserID;
    if ((req.user as { id: string }).id != id && (req.user as { permissions: number }).permissions !== 1) {
      return res.status(403).json({ error: "Unauthorized" });
    }
    const sql = "SELECT UserID, UserName, FirstName, LastName FROM Users WHERE UserID = ?";
    const rows = await pool.query(sql, [id]);
    if (rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(rows[0]);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error });
  }
});

router.delete("/delete/:UserID", authenticateToken, async (req: Request, res: Response) => {
  try {
    const id = req.params.UserID;
    if ((req.user as { id: string }).id != id && (req.user as { permissions: number }).permissions !== 1) {
      return res.status(403).json({ error: "Unauthorized" });
    }
    const sql = "DELETE FROM Users WHERE UserID = ?";
    await pool.query(sql, [id]);
    res.status(200).json({ message: "User successfully deleted" });
  } catch (error) {
    res.status(400).json({ error: error });
  }
});

router.put("/update/:UserID", authenticateToken, async (req: Request, res: Response) => {
  try {
    const id = req.params.UserID;
    if ((req.user as { id: string }).id != id && (req.user as { permissions: number }).permissions !== 1) {
      return res.status(403).json({ error: "Unauthorized" });
    }
    const { UserName, Password, FirstName, LastName } = req.body;

    if (!UserName || !FirstName || !LastName) {
      return res.status(400).json({ error: "Missing fields" });
    }

    if (Password) {
      const passwordHash = await hashPassword(Password);
      const sql = "UPDATE Users SET UserName = ?, PasswordHash = ?, FirstName = ?, LastName = ? WHERE UserID = ?";
      await pool.query(sql, [UserName, passwordHash, FirstName, LastName, id]);
    }
    else {
      const sql = "UPDATE Users SET UserName = ?, FirstName = ?, LastName = ? WHERE UserID = ?";
      await pool.query(sql, [UserName, FirstName, LastName, id]);
    }
    res.status(200).json({ message: "User successfully updated" });
  } catch (error) {
    console.log(error)
    res.status(400).json({ error: error });
  }
});

export { router };
