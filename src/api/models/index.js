import dotenv from 'dotenv';
import Sequelize from 'sequelize';
import student_model from './student.model.js';
import teacher_model from './teacher.model.js';
import teacher_student_model from './teacher_student.model.js';

const config = dotenv.config()

const sequelize = new Sequelize(
    config.parsed.DB_NAME,
    config.parsed.DB_USER,
    config.parsed.DB_PASSWORD,
    {
        host: config.parsed.DB_HOST,
        dialect: 'mysql'
    }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.student = student_model(sequelize, Sequelize);
db.teacher = teacher_model(sequelize, Sequelize);
db.teacher_student = teacher_student_model(sequelize, Sequelize);

db.student.belongsToMany(db.teacher, { through: db.teacher_student, foreignKey: "student_id" });
db.teacher.belongsToMany(db.student, { through: db.teacher_student, foreignKey: "teacher_id" });

export default db;