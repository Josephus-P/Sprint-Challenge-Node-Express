const express = require('express');
projectDB = require('./data/helpers/projectModel.js');
actionsDB = require('./data/helpers/actionModel.js');

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
    res.send('Hello FSW12');
});

server.post('/api/projects', (req, res) => {
    
    projectDB.insert(req.body).then(response => {
        res.status(201).json(response);
    }).catch(err => {
        console.error('Error', err);
        res.status(500).json({message: "Error creating project."});
    });
});

server.post('/api/actions', (req, res) => {
    
    actionsDB.insert(req.body).then(response => {
        res.status(201).json(response);
    }).catch(err => {
        console.error('Error', err);
        res.status(500).json({message: "Error creating action."});
    });
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

server.put('/api/projects/:id', (req, res) => {
    projectDB.update(req.params.id, req.body).then(response => {
        res.status(200).json(response);
    })
    .catch(err => res.status(500).json({ message: 'project update failed' }));
});

server.put('/api/actions/:id', (req, res) => {
    actionDB.update(req.params.id, req.body).then(response => {
        res.status(200).json(response);
    })
    .catch(err => res.status(500).json({ message: 'action update failed' }));
});

server.delete('/api/projects/:id', (req, res) => {
    const { id } = req.params;
    projectDB.remove(id)
        .then(response => {
            console.log(response);
            if(response) {
                res.status(204).end();
            }
            else {
                res.status(404).json({ message: 'No project with this id found'});
            }
            res.status(204).end();
        })
        .catch(err => res.status(500).json(err));
});

server.delete('/api/actions/:id', (req, res) => {
    const { id } = req.params;
    actionDB.remove(id)
        .then(response => {
            console.log(response);
            if(response) {
                res.status(204).end();
            }
            else {
                res.status(404).json({ message: 'No action with this id found'});
            }
            res.status(204).end();
        })
        .catch(err => res.status(500).json(err));
});

server.listen(9000, () => console.log('\n== API on port 9k ==\n'));
