import express from 'express';
import { getProjects, getProject, addProject, deleteProject, updateProject, getStudents, getStudent, addStudent, updateStudent } from './service.js';

const router = express.Router();

router.route('/projects')
    .get((request, response) => getProjects(request, response))
    .post((request, response) => addProject(request, response));

router.route('/projects/:id')
    .get((request, response) => getProject(request, response))
    .patch((request, response) => updateProject(request, response))
    .delete((request, response) => deleteProject(request, response));

router.route('/students')
    .get((request, response) => getStudents(request, response))
    .post((request, response) => addStudent(request, response));

router.route('/students/:id')
    .get((request, response) => getStudent(request, response))
    .patch((request, response) => updateStudent(request, response));


export default router;