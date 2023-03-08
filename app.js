import express from 'express';
import bodyParser from 'body-parser';

// routes 
import routes from './routes/index.js';

const host = process.env.DB_HOST || "localhost";
const port = process.env.PORT || 3306;
// Set up the express app
const app = express();

// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(bodyParser.json());

// Require our routes into the application.
app.use('/', routes);

app.get('*', (req, res) => res.status(200).send({
  message: 'Welcome to the beginning of nothingness.',
}));

// Server listen to port
app.listen(port, host, function(){
  console.log('Listening on port/host ' + host + ":" + port);
});

export default app;