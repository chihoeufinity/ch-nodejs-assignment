## Teacher System
### Teachers need a system where they can perform administrative functions for their students. Teachers and students are identified by their email addresses.
### Instructions for running local instance of the API server

Run the following to start the docker service and init database
```
docker-compose up
```

Run the following to install and run the instance
```
npm install

npm start
```

Run the following for the unit test

**API test**
```
npm test 
```

**Unit test**
```
npm run jest-test
```

To stop the docker service
```
docker-compose down
```

