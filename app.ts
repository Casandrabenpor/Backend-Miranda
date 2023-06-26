import express, { Request, Response } from "express";

const app = express();
const PORT = 3000;

app.get("/", function (req: Request, res: Response) {
  res.send("dddddddd");
});

app.listen(PORT, () => {
  console.log(`connected to port ${PORT}`);
});