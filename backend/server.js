import express, { json } from "express";
import cors from "cors";
import router from './router.js';
import { init } from './repository.js'
import { join, resolve } from "path";

express()
    .use(cors({
        origin: "*",
        methods: "GET, PATCH, HEAD, POST, PUT, DELETE",
        optionsSuccessStatus: 200
    }))
    .use(json())
    .use(express.static(join(resolve(), '../client/build')))
    .use('/api', router)
    .listen(8080, async () => {
        try {
            await init();
        }
        catch (error) {
            console.error(error);
        }
    });