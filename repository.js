import Sequelize from 'sequelize';

const sequelize = new Sequelize('anonymous_grading', 'root', 'password', {
    host: 'localhost',
    dialect: 'mariadb',
    define: {
        timestamps: false
    }
});

try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully!');
}
catch (err) {
    console.error('Unable to connect to the database:', err);
}