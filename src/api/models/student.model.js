export default (sequelize, Sequelize) => {
   const student = sequelize.define("student", {
        email: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true
        },
        status: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: true
        }
    },{
        tableName: "student",
    });

    return student;
}
