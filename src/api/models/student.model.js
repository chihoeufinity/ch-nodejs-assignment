export default (sequelize, Sequelize) => {
   const student = sequelize.define("student", {
        email: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true
        },
        is_suspended: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: false
        }
    },{
        tableName: "student",
    });

    return student;
}
