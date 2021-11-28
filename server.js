import express from "express";
import cors from 'cors';
import dotenv from 'dotenv';
import { rootCertificates } from "tls";

const server = express();
const router = express.Router();

server.use(express.urlencoded({ extended: true }));
server.use(express.json());
server.use(cors());
server.use("/api", router);

// app.get("/*", (req, res) => {
//     res.sendFile(path.resolve("frontend", "index.html"));
// });

server.get('/api', (req, res) => res.send('WORKS'));
server.listen(process.env.PORT || 8080, () => console.log("App Server running..."));

export { server, router };