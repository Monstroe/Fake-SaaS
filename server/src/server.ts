import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import { router as userRouter } from "./routes/user";
import { router as paymentRouter } from "./routes/payment";
import { router as updateRouter } from "./routes/update";

dotenv.config();

const app: Express = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cors());
app.use("/user", userRouter);
app.use("/payment", paymentRouter);
app.use("/update", updateRouter);

app.get("/", (req: Request, res: Response) => {
  console.log("Hello from client!");
  res.status(200).send("Hello from server!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
