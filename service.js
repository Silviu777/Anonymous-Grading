import { Project, Student, Team, Judging } from './repository.js';

async function getProjects(request, response) {
    try {
        const projects = await Project.findAll({
            include: [
                {
                    model: Team,
                    attributes: { exclude: ['id'] },
                    include: {
                        model: Student,
                        attributes: { exclude: ['teamId'] }
                    }
                }]
        });
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
            const project = await Project.findByPk(request.params.id, {
                include: [
                    {
                        model: Team,
                        attributes: { exclude: ['id'] },
                        include: {
                            model: Student,
                            attributes: { exclude: ['teamId'] }
                        }
                    }]
            });
            if (project) {
                response.json(project);
            }
            else {
                response.status(404).send(`Project with id ${request.params.id} not found! Please introduce a valid id in order to complete the requested action.`);
            }
        } else {
            response.status(400).send();
        }
    } catch (error) {
        response.status(500).json(error);
    }
}

async function addProject(request, response) {
    const existingProject = await Project.findAndCountAll({
        where: {
            name: request.body.name
        },
        attributes: ['name']
    });

    try {
        if (request.body.id && request.body.name && existingProject['count'] < 1) {
            await Project.create(request.body);
            response.status(201).send(`The project with the id ${request.body.id} has been created!`);
        }
        else {
            if (existingProject['count'] == 1) {
                response.status(400).send(`Project '${request.body.name}' is already registered! Please select a distinct project name.`);
            }

            else if (request.body.id == null || request.body.id == "") {
                response.status(400).send(`Project id missing! Please introduce a valid id in order to add a new project.`);
            }
            else if (request.body.name == null || request.body.name == "") {
                response.status(400).send(`Project name missing! Please introduce a valid name in order to add a new project.`);
            }
        }
    } catch (error) {
        response.status(500).send(`Project with id ${request.body.id} already exists! Please select a distinct id.`);
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
            response.status(404).send(`Project with id ${request.params.id} not found! Please introduce a valid id in order to complete the requested action.`);
        }
    } catch (error) {
        response.status(500).json(error);
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
                response.status(404).send(`Project with id ${request.params.id} not found! Please introduce a valid id in order to complete the requested action.`);
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
        const students = await Student.findAll({
            include: [
                {
                    model: Team,
                    attributes: { exclude: ['id'] }
                }]
        });
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
            const student = await Student.findByPk(request.params.id, {
                include: [
                    {
                        model: Team,
                        attributes: { exclude: ['id'] }
                    }]
            });
            if (student) {
                response.json(student);
            }
            else {
                response.status(404).send(`Student with id ${request.params.id} not found! Please introduce a valid id in order to complete the requested action.`);
            }
        } else {
            response.status(400).send();
        }
    } catch (error) {
        response.status(500).json(error);
    }
}

async function addStudent(request, response) {
    const existingStudent = await Student.findAndCountAll({
        where: {
            firstName: request.body.firstName,
            lastName: request.body.lastName
        },
        attributes: ['firstName', 'lastName']
    });

    try {
        if (request.body.id && request.body.firstName && request.body.lastName && existingStudent['count'] < 1) {
            await Student.create(request.body);
            response.status(201).send(`The student with the id ${request.body.id} has been created!`);
        }
        else {
            if (existingStudent['count'] == 1) {
                response.status(400).send(`Student '${request.body.firstName} ${request.body.lastName}' is already registered! Please introduce a distinct student.`);
            }
            else if (request.body.id == null || request.body.id == "") {
                response.status(400).send(`Student id missing! Please introduce a valid id in order to add a new student.`);
            }
            else if (request.body.firstName == null || request.body.firstName == "") {
                response.status(400).send(`Student first name missing! Please introduce a valid first name in order to add a new student.`);
            }
            else {
                response.status(400).send(`Student last name missing! Please introduce a valid last name in order to add a new student.`);
            }
        }
    } catch (error) {
        response.status(500).send(`Student with id ${request.body.id} already exists! Please select a distinct id.`);
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
            response.status(404).send(`Student with id ${request.params.id} not found! Please introduce a valid id in order to complete the requested action.`);
        }
    } catch (error) {
        response.status(500).json(error);
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
                response.status(404).send(`Team with id ${request.params.id} not found! Please introduce a valid id in order to complete the requested action.`);
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
    const existingTeam = await Team.findAndCountAll({
        where: {
            name: request.body.name
        },
        attributes: ['name']
    });

    try {
        if (request.body.id && request.body.name && existingTeam['count'] < 1) {
            await Team.create(request.body);
            return response.status(201).send(`The team with the id ${request.body.id} has been created!`);
        }
        else {
            if (existingTeam['count'] == 1) {
                response.status(400).send(`Team '${request.body.name}' is already registered! Please introduce a distinct team name.`);
            }
            else if (request.body.id == null || request.body.id == "") {
                response.status(400).send(`Team id missing! Please introduce a valid id in order to add a new team.`);
            }
            else if (request.body.name == null || request.body.name == "") {
                response.status(400).send(`Team name missing! Please introduce a valid name in order to add a new team.`);
            }
        }
    } catch (error) {
        return response.status(500).send(`Team with id ${request.body.id} is already registered! Please select another id.`);
    }
}

async function updateTeam(request, response) {
    try {
        const team = await Team.findByPk(request.params.id);

        if (team) {
            Object.entries(request.body).forEach(([body, value]) => team[body] = value);

            await team.save();
            response.send(`The team with the id ${request.params.id} has been updated!`);
        }
        else {
            response.status(404).send(`Team with id ${request.params.id} not found! Please introduce a valid id in order to complete the requested action.`);
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
                    model: Student,
                    attributes: { exclude: ['id', 'teamId'] },
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
                response.status(404).send(`Judging with id ${request.params.id} not found! Please introduce a valid id in order to complete the requested action.`);
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
    const existingJudging = await Judging.findAndCountAll({
        where: {
            projectId: request.body.projectId,
            studentId: request.body.studentId
        },
        attributes: ['projectId', 'studentId']
    });

    try {
        if (existingJudging['count'] < 1) {
            await Judging.create(request.body);
            response.status(201).send(`Judging with id ${request.body.id} has been added!`);
        }
        else {
            response.status(400).send(`You can only judge the same project once!`);
        }
    } catch (error) {
        response.status(500).json(error);
    }
}

async function updateJudging(request, response) {
    try {
        const judging = await Judging.findByPk(request.params.id);

        if (judging) {
            Object.entries(request.body).forEach(([body, value]) => judging[body] = value);

            await judging.save();
            response.send(`The judging with the id ${request.body.id} has been updated!`);
        }
        else {
            response.status(404).send(`Judging with id ${request.params.id} not found! Please introduce a valid id in order to complete the requested action.`);
        }
    } catch (error) {
        response.status(500).json(error);
    }
}

export { getProjects, getProject, addProject, updateProject, deleteProject, getStudents, getStudent, addStudent, updateStudent, getTeams, getTeam, addTeam, updateTeam, getJudgings, getJudging, addJudging, updateJudging }