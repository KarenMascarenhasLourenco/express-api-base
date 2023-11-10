import express, { Request, Response, ErrorRequestHandler } from "express";
import path from "path";
import dotenv from "dotenv";
import cors from "cors";
import passport from 'passport'
import apiRoutes from "./routes/api";


dotenv.config();

const server = express();

server.use(cors());

server.use(express.static(path.join(__dirname, "../public")));
server.use(express.urlencoded({ extended: true }));

server.use(passport.initialize())

server.use(apiRoutes);

server.use((req: Request, res: Response) => {
 res.status(404).json({ error: "endpoint não encontrado" });
});

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
 err.status ? res.status(err.status).json({error:'ocorreu um erro'}) : res.status(400).json({error:'ocorreu um erro'})
};

server.use(errorHandler);


server.listen(process.env.PORT);