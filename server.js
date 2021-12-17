import express, { json } from "express";
import router from './router.js';
import { init } from './repository.js'

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