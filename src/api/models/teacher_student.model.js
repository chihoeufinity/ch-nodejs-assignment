export default (sequelize, Sequelize) => {
   const teacher_student = sequelize.define("teacher_student", {
    
    },{
        tableName: "teacher_student"
    });

    return teacher_student;
  }