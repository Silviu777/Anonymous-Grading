import express from 'express';
import { getProjects, getStudents } from './service.js';

const router = express.Router();

router.route('/projects')
    .get((request, response) => getProjects(request, response));

router.route('/students')
    .get((request, response) => getStudents(request, response));


export default router;