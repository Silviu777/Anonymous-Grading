import express from 'express';
import { getProjects, getProject, addProject, deleteProject, updateProject, getStudents, getStudent, addStudent, updateStudent, getTeams, getTeam, addTeam, updateTeam, getJudgings, getJudging, addJudging, updateJudging } from './service.js';

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

router.route('/teams')
    .get((request, response) => getTeams(request, response))
    .post((request, response) => addTeam(request, response));

router.route('/teams/:id')
    .get((request, response) => getTeam(request, response))
    .patch((request, response) => updateTeam(request, response));

router.route('/judgings')
    .get((request, response) => getJudgings(request, response))
    .post((request, response) => addJudging(request, response));

router.route('/judgings/:id')
    .get((request, response) => getJudging(request, response))
    .patch((request, response) => updateJudging(request, response));

export default router;