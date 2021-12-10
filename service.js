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

async function getProject(request, response) {
    try {
        if (request.params.id) {
            const project = await Project.findByPk(request.params.id);

            if (project) {
                response.json(project);
            }
            else {
                response.status(404).send("Project not found!"); // TO MODIFY
            }
        } else {
            response.status(400).send();
        }
    }
    catch (error) {
        response.status(500).json(error);
    }
}

async function addProject(request, response) {
    try {
        if (request.body.name) {
            await Project.create(request.body);
            response.status(201).send();
        }
        else {
            response.status(400).send();
        }
    }
    catch (error) {
        response.status(500).json(error);
    }
}

async function updateProject(request, response) {
    try {
        const project = await Project.findByPk(request.params.id);
        if (project) {
            Object.entries(request.body).forEach(([body, value]) => project[body] = value);

            await project.save();
            response.send(`The project with the id ${request.params.id} has been updated!`);
        }
        else {
            response.status(404).send();
        }
    } catch (error) {
        response.status(404).send();
    }
}

async function deleteProject(request, response) {
    try {
        if (request.params.id) {
            const project = await Project.findByPk(request.params.id);

            if (project) {
                await project.destroy();
                response.send(`The project with the id ${request.params.id} has been deleted!`);
            }
            else {
                response.status(404).send(`Project not found`);
            }
        } else {
            response.status(400).send();
        }
    } catch (error) {
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

async function getStudent(request, response) {
    try {
        if (request.params.id) {
            const student = await Student.findByPk(request.params.id);

            if (student) {
                response.json(student);
            }
            else {
                response.status(404).send("Student not found!");
            }
        } else {
            response.status(400).send();
        }

    } catch (error) {
        response.status(500).json(error);
    }
}

async function addStudent(request, response) {
    try {
        if (request.body) {
            await Student.create(request.body);
            response.status(201).send(`The student with the id ${request.body.id} has been created!`);
        }
        else {
            response.status(400).send();
        }
    } catch (error) {
        response.status(500).json(error);
    }
}

async function updateStudent(request, response) {
    try {
        const student = await Student.findByPk(request.params.id);
        if (student) {
            Object.entries(request.body).forEach(([body, value]) => student[body] = value);

            await student.save();
            response.send(`The student with the id ${request.params.id} has been updated!`);
        }
        else {
            response.status(404).send();
        }
    } catch (error) {
        response.status(404).send();
    }
}

export { getProjects, getProject, addProject, updateProject, deleteProject, getStudents, getStudent, addStudent, updateStudent }