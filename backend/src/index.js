import express from "express";
import cors from "cors";
const app = express();
app.use(express.json());

app.use(cors())

app.route("/user", userRouter)

export default app;

