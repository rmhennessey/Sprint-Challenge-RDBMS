const express = require('express');
const helmet = require('helmet');
const knex = require('knex');

const knexConfig = {
    client: 'sqlite3',
    connection: {
      filename: './data/project_tracker.sqlite3',
    },
    useNullAsDefault: true,
  };


  const server = express();

  server.use(helmet());
  server.use(express.json());

  const db = knex(knexConfig);

//  =====Projects CRUD =====

server.get('/api/projects', (req, res) => {
    db('projects')
      .then(projects => {
          res.status(200).json(projects);
      })
      .catch(error => {
          res.status(500).json(error);
      })
})

server.get('/api/projects/:id', (req, res) => {
    const projectId = req.params.id;

  db('projects')
      .where({ id: projectId })
      .first()
      .then(project => {
          if (project) {
              res.status(200).json(project);
          } else {
              res.status(404).json({message: 'Project not found' })
          }
    })
    .catch(error => {
        res.status(500).json(error);
    })
})

server.get('/api/projects/:id/actions', (req, res) => {
    const projectId = req.params.id;

    db('actions')
        .join('projects', 'projects.id', 'actions.project_id')
        .select('projects.id', 'projects.name', 'projects.description', 'actions.id', 'actions.description', 'actions.notes', 'actions.completed')
        .where('actions.project_id', projectId)
        .then(projectActions => {
            if (projectActions.length === 0) {
                res
                .status(404)
                .json({ error: 'There are no actions in this project'})
            } else {
                res 
                .status(200)
                .json(projectActions);
            }
        })
        .catch(error => {
            res
                .status(500)
                .json({ error: "Something terrible happened"})
        });
    });


server.post('/api/projects', (req, res) => {
    const { name } = req.body;
    const { description } = req.body;

    if (!name || !description) {
        res.status(400).json({ errorMessage: 'Please provide a project name and description.' })
    } else {
        db('projects')
        .insert(req.body)
        .then(ids => {
            const id = ids[0];
            db('projects')
                .where({ id })
                .first()
                .then(project => {
                    res.status(201).json(project);
                })
                .catch(err => {
                    res.status(500).json(err)
                })
        })

    }
})

server.put('/api/projects/:id', (req, res) => {
    db ('projects')
        .where ({ id: req.params.id })
        .update(req.body)
        .then(count => {
        if (count > 0) {
            db('projects')
                .where({ id: req.params.id })
                .first();

                res.status(200).json(count);
        } else {
            res.status(404).json({ message: 'Project not found' })
        }
    })
        .catch(error => {
            res.status(500).json(error);
        })
})

server.delete('/api/projects/:id', (req, res) => {
    db('projects')
        .where({ id: req.params.id })
        .del()
        .then(count => {
        if (count > 0 ) {
            res.status(204).end();
        } else {
            res.status(404).json({ message: 'Project not found' });
        }
        })
        .catch(error => {
            res.status(500).json(error);
        })
});

//  =====Actions CRUD =====

server.get('/api/actions', (req, res) => {
    db('actions')
      .then(actions => {
          res.status(200).json(actions);
      })
      .catch(error => {
          res.status(500).json(error);
      })
})

server.get('/api/actions/:id', (req, res) => {
    const actionId = req.params.id;

  db('actions')
      .where({ id: actionId })
      .first()
      .then(action => {
          if (action) {
              res.status(200).json(action);
          } else {
              res.status(404).json({message: 'Action not found' })
          }
    })
    .catch(error => {
        res.status(500).json(error);
    })
})

server.post('/api/actions', (req, res) => {
    const description = req.params;
    const notes = req.params;
    const projectId = req.params;

if (!description || !notes || !projectId) {
    res.status(400).json({ errorMessage: 'Please provide a action description, notes and project id.' })
} else {
    db('actions')
        .insert(req.body)
        .then(ids => {
            const id = ids[0];
            db('actions')
                .where({ id })
                .first()
                .then(action => {
                    res.status(201).json(action);
                })
                .catch(err => {
                    res.status(500).json(err)
                })
        })
    }
})

server.put('/api/actions/:id', (req, res) => {
    db ('actions')
        .where ({ id: req.params.id })
        .update(req.body)
        .then(count => {
        if (count > 0) {
            db('actions')
                .where({ id: req.params.id })
                .first();

                res.status(200).json(count);
        } else {
            res.status(404).json({ message: 'Action not found' })
        }
    })
        .catch(error => {
            res.status(500).json(error);
        })
})

server.delete('/api/actions/:id', (req, res) => {
    db('actions')
        .where({ id: req.params.id })
        .del()
        .then(count => {
        if (count > 0 ) {
            res.status(204).end();
        } else {
            res.status(404).json({ message: 'Action not found' });
        }
        })
        .catch(error => {
            res.status(500).json(error);
        })
});


  const port = process.env.PORT || 5000;
  server.listen(port, () =>
    console.log(`\n** API running on http://localhost:${port} **\n`)
  );