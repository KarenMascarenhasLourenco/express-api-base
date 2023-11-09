import express, { Request, Response, ErrorRequestHandler } from "express";
import path from "path";
import dotenv from "dotenv";
import cors from "cors";
import apiRoutes from "./routes/api";

dotenv.config();

const server = express();

server.use(cors());

server.use(express.static(path.join(__dirname, "../public")));
server.use(express.urlencoded({ extended: true }));

server.use(apiRoutes);

server.use((req: Request, res: Response) => {
 res.status(404).json({ error: "endpoint não encontrado" });
});

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
 console.log(err);
 res.status(400).json({ error: "ocorreu um erro" });
};

server.use(errorHandler);

server.listen(process.env.PORT);