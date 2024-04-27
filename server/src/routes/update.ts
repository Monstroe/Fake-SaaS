import express, { Request, Response, Router } from "express";
import { pool } from "../utils/database";
import { authenticateToken, authenticateAdmin } from "../utils/auth";

const router: Router = express.Router();

router.get("/", authenticateToken, async (req: Request, res: Response) => {
    try {
        let sql = "SELECT * FROM Updates";
        const rows = await pool.query(sql);
        if (rows.length === 0) return res.status(404).json({ error: "No updates found" });
        res.status(200).json(rows);
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: error });
    }
});

router.get("/get/:UserID", authenticateToken, async (req: Request, res: Response) => {
    try {
        const id = req.params.UserID;
        if ((req.user as { id: string }).id != id && (req.user as { permissions: number }).permissions !== 1) {
            return res.status(403).json({ error: "Unauthorized" });
        }
        let sql = "SELECT Plan FROM Users WHERE UserID = ?";
        let rows = await pool.query(sql, [id]);
        if (rows.length === 0) {
            return res.status(404).json({ error: "User not found" });
        }

        const plan = rows[0].Plan;
        sql = "SELECT * FROM Updates WHERE Plan = ?";
        rows = await pool.query(sql, [plan]);
        if (rows.length === 0) return res.status(404).json({ error: "No updates found for specified plan" });
        res.status(200).json(rows);
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: error });
    }
});

router.post("/add", authenticateAdmin, async (req: Request, res: Response) => {
    try {
        const { UpdateDescription, Plan } = req.body;
        if (!UpdateDescription || !Plan) {
            return res.status(400).json({ error: "Missing fields" });
        }
        const formattedDate = new Date().toISOString().slice(0, 19).replace('T', ' ');
        const sql = "INSERT INTO Updates (UpdateDescription, DateReleased, Plan) VALUES (?, ?, ?)";
        await pool.query(sql, [UpdateDescription, formattedDate, Plan]);
        res.status(201).json({ message: "Update added" });
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: error });
    }
});

export { router };