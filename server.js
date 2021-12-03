import express, { json } from "express";
import cors from 'cors';
import dotenv from 'dotenv';
import { rootCertificates } from "tls";
import router from './router.js';
import { init } from './repository.js'

// const server = express();

// server.use(express.urlencoded({ extended: true }));
// server.use(express.json());
// server.use(cors());
// server.use("/api", router);


// server.get('/api', (req, res) => res.send('WORKS'));
// server.listen(process.env.PORT || 8080, () => console.log("App Server running..."));

// export { server, router };

express()
    .use(json())
    .use('/api', router)
    .listen(8080, async () => {
        try {
            await init();
        }
        catch (error) {
            console.error(error);
        }
    });