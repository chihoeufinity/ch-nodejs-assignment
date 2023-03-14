import express from 'express';
import bodyParser from 'body-parser';
import db from './src/api/models/index.js'
// routes 
import studentRoutes from './src/api/routes/studentRouter.js';
import teacherRoutes from './src/api/routes/teacherRouter.js';

const host = process.env.DB_HOST || "localhost";
const port = process.env.PORT || 3000;
// Set up the express app
const app = express();

// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(bodyParser.json());

// Require our routes into the application.
app.use('/', studentRoutes);
app.use('/', teacherRoutes);

app.get('*', (req, res) => res.status(200).send({
  message: 'Welcome to the beginning of nothingness.',
}));

// Server listen to port
app.listen(port, host, function(){
  console.log('Listening on port/host ' + host + ":" + port);
});

db.sequelize.sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
});

export default app;