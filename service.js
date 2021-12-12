import Sequelize from 'sequelize';
import { Project, Student, Team, Judging } from './repository.js';

async function getProjects(request, response) {
    try {
        const projects = await Project.findAll();
        if (projects.length > 0) {
            response.status(200).json(projects);
        }
        else {
            response.status(204).send();
        }
    } catch (error) {
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
    } catch (error) {
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
    } catch (error) {
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
    } catch (error) {
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

async function getTeams(request, response) {
    try {
        const teams = await Team.findAll({
            include: [
                {
                    model: Student,
                    attributes: { exclude: ['teamId'] }
                }]
        });

        if (teams.length > 0) {
            response.status(200).json(teams);
        }
        else {
            response.status(204).send();
        }
    } catch (error) {
        response.status(500).json(error);
    }
}

async function getTeam(request, response) {
    try {
        if (request.params.id) {
            const team = await Team.findByPk(request.params.id, {
                include: [
                    {
                        model: Student,
                        attributes: { exclude: ['teamId'] }
                    }]
            });
            if (team) {
                response.json(team);
            }
            else {
                response.status(404).send();
            }
        }
        else {
            response.status(400).send();
        }
    } catch (error) {
        response.status(500).json(error);
    }
}

async function addTeam(request, response) {
    try {
        var existingName = await Team.findOne({
            where: { name: request.body.name },
            attributes: ["name"]
        }).then(d => d.get("name"));

        var existingId = await Team.findOne({
            where: { id: request.body.id },
            attributes: ["id"]
        }).then(d => d.get("id"));

        if (request.body) {
            await Team.create(request.body);
            return response.status(201).send("created");
        }
        else {
            response.status(400).send();
        }
    } catch (error) {
        return response.status(500).send("team id taken");
    }
}

async function updateTeam(request, response) {
    try {
        const team = await Team.findByPk(request.params.id);
        if (team) {
            Object.entries(request.body).forEach(([body, value]) => team[body] = value);

            await team.save();
            response.send(`Team with id ${request.params.id} has been updated!`);
        }
        else {
            response.status(404).send(`Team with id ${request.params.id} not found!`);
        }
    } catch (error) {
        response.status(500).json(error);
    }
}

async function getJudgings(request, response) {
    try {
        const judgings = await Judging.findAll({
            include: [
                {
                    model: Project,
                    attributes: { exclude: ['id'] },
                    include: {
                        model: Team,
                        attributes: { exclude: ['id'] },
                        include: {
                            model: Student,
                            attributes: { exclude: ['teamId'] }
                        }
                    }
                }]
        });

        if (judgings.length > 0) {
            response.status(200).json(judgings);
        }
        else {
            response.status(204).send();
        }
    } catch (error) {
        response.status(500).json(error);
    }
}

async function getJudging(request, response) {
    try {
        if (request.params.id) {
            const judging = await Judging.findByPk(request.params.id, {
                include: [
                    {
                        model: Project,
                        attributes: { exclude: ['id'] },
                        include: {
                            model: Team,
                            attributes: { exclude: ['id'] },
                            include: {
                                model: Student,
                                attributes: { exclude: ['teamId'] }
                            }
                        }
                    }]
            });

            if (judging) {
                response.json(judging);
            }
            else {
                response.status(404).send();
            }
        }
        else {
            response.status(400).send();
        }
    } catch (error) {
        response.status(500).json(error);
    }
}

async function addJudging(request, response) {
    const studentId = request.body.studentId;
    const searchProject = await Project.findOne({
        where: { id: request.body.projectId },
        attributes: ["teamId"]
    }).then(d => d.get("teamId"));

    try {
        if (request.body) {
            await Judging.create(request.body);
            response.status(201).send();
        }
        else {
            response.status(400).send();
        }
    } catch (error) {
        response.status(500).send(projId);
    }
}

async function updateJudging(request, response) {
    try {
        const judging = await Judging.findByPk(request.params.id);
        if (judging) {
            Object.entries(request.body).forEach(([body, value]) => judging[body] = value);

            await judging.save();
            response.status(204).send();
        }
        else {
            response.status(404).send();
        }
    } catch (error) {
        response.status(500).json(error);
    }
}

export { getProjects, getProject, addProject, updateProject, deleteProject, getStudents, getStudent, addStudent, updateStudent, getTeams, getTeam, addTeam, updateTeam, getJudgings, getJudging, addJudging, updateJudging }

// DE DISCUTAT deleteStudent