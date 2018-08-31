const express = require('express');
projectDB = require('./data/helpers/projectModel.js');
actionsDB = require('./data/helpers/actionModel.js');

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
    res.send('Hello FSW12');
});

server.get('/api/projects', (req, res) => {
    projectDB.get().then(projects => {
        res.status(200).json(projects);
    }).catch(err => {
        console.error('Error', err);
        res.status(500).json({message: "Error retrieving projects."});
    });
});

server.get('/api/actions', (req, res) => {
    actionsDB.get().then(actions => {
        res.status(200).json(actions);
    }).catch(err => {
        console.error('Error', err);
        res.status(500).json({message: "Error retrieving actions."});
    });
});

server.listen(9000, () => console.log('\n== API on port 9k ==\n'));