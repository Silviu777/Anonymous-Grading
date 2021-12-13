import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('anonymous_grading', 'root', 'password', {
    host: 'localhost',
    dialect: 'mariadb',
    define: {
        timestamps: false
    }
});

const Project = sequelize.define('project', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    teamId: {
        type: Sequelize.INTEGER,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false
    },
    deadline: {
        type: Sequelize.DATE
    }
});

const Student = sequelize.define('student', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    firstName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    lastName: {
        type: Sequelize.STRING,
    },
    teamId: {
        type: Sequelize.INTEGER,
        allowNull: true
    }
});

const Team = sequelize.define('team', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

const Judging = sequelize.define('judging', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    projectId: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    grade: {
        type: Sequelize.DOUBLE,
        allowNull: false
    },
    studentId: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

Project.belongsTo(Team, { foreignKey: 'teamId' });
Project.hasMany(Judging, { foreignKey: 'projectId' }); // DE MODIFICAT FOREIGN KEY
Judging.belongsTo(Project, { foreignKey: 'projectId' });

Team.hasMany(Student, { foreignKey: 'teamId' }); // DE MODIFICAT FOREIGN KEY
Student.belongsTo(Team, { foreignKey: 'teamId' });

Student.hasMany(Judging, { foreignKey: 'id' }); // DE DISCUTAT + DE MODIFICAT FOREIGN KEY

async function init() {
    await sequelize.authenticate();
    await sequelize.sync({ alter: true });
}

export { Project, Student, Team, Judging, init }