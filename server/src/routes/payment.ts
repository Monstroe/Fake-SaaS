import express, { Request, Response, Router } from "express";
import { pool } from "../utils/database";
import { authenticateToken, authenticateAdmin } from "../utils/auth";

const router: Router = express.Router();

router.get("/", authenticateAdmin, async (req: Request, res: Response) => {
    try {
        const sql = "SELECT * FROM Payments ORDER BY UserID";
        const rows = await pool.query(sql);
        res.status(200).json(rows);
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
        const sql = "SELECT * FROM Payments WHERE UserID = ?";
        const rows = await pool.query(sql, [id]);
        res.status(200).json(rows);
    } catch (error) {
        res.status(400).json({ error: error });
    }
});

router.post("/update/:UserID", authenticateToken, async (req: Request, res: Response) => {
    try {
        const id = req.params.UserID;
        if ((req.user as { id: string }).id != id && (req.user as { permissions: number }).permissions !== 1) {
            return res.status(403).json({ error: "Unauthorized" });
        }
        const { CardID, CardHolder, CardNumber, CVV, ExpDate, Address, City, State, ZipCode } = req.body;
        if (!CardID || !CardHolder || !CardNumber || !CVV || !ExpDate || !Address || !City || !State || !ZipCode) {
            return res.status(400).json({ error: "Missing fields" });
        }
        const sql = "UPDATE Payments SET CardHolder = ?, CardNumber = ?, CVV = ?, ExpDate = ?, Address = ?, City = ?, State = ?, ZipCode = ? WHERE CardID = ? AND UserID = ?";
        const rows = await pool.query(sql, [CardHolder, CardNumber, CVV, ExpDate.split('T')[0], Address, City, State, ZipCode, CardID, id]);
        // If no rows were affected, the payment does not exist and we need to add it
        if (rows.affectedRows === 0) {
            const sql = "INSERT INTO Payments (UserID, CardHolder, CardNumber, CVV, ExpDate, Address, City, State, ZipCode) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
            await pool.query(sql, [id, CardHolder, CardNumber, CVV, ExpDate, Address, City, State, ZipCode]);
            return res.status(201).json({ message: "Payment added" });
        }
        res.status(200).json({ message: "Payment updated" });
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
        const CardID = req.body.CardID;
        if (!CardID) {
            return res.status(400).json({ error: "Missing fields" });
        }
        const sql = "DELETE FROM Payments WHERE CardID = ? AND UserID = ?";
        const rows = await pool.query(sql, [CardID, id]);
        if (rows.affectedRows === 0) {
            return res.status(404).json({ error: "Payment not found" });
        }
        res.status(200).json({ message: "Payment deleted" });
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: error });
    }
});

export { router };