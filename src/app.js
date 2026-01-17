import express from "express";
import cors from "cors";
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded());
app.get("/", (req, res) => {
    res.send("Task manager api is running")
});
export default app;