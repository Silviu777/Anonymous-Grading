import Sequelize from 'sequelize';
import { Project, Student, Team, Judging } from './repository.js';

// import { CLASSES HERE } from './classes_locations';

// CRUD operations (create, reade, update, delete)

// METHODS (getStudents, getProjects etc.)

async function getProjects(request, response) {
    try {
        const projects = await Project.findAll();
        if (projects.length > 0) {
            response.status(200).json(projects);
        }
        else {
            response.status(204).send();
        }
    }
    catch (error) {
        response.status(500).json(error);
    }
}

async function getStudents(request, response) {
    try {
        const students = await Student.findAll();

        if (students.length > 0) {
            response.status(200).json(students);
        }
        else {
            response.status(204).send();
        }
    }
    catch (error) {
        response.status(500).json(error);
    }
}

export { getProjects, getStudents }