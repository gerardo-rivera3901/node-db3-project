const express = require('express');

const Schemes = require('./scheme-model.js');

const router = express.Router();

router.get('/', (req, res) => {
  Schemes.find()
    .then(schemes => {
      res.json(schemes);
    })
    .catch(err => {
      res.status(500).json({ message: err.message });
    });
});

router.get('/:id', (req, res) => {
  const { id } = req.params;

  Schemes.findById(id)
    .then(scheme => {
      if (scheme) {
        res.json(scheme);
      } else {
        res.status(404).json({ message: 'Could not find scheme with given id.' });
      }
    })
    .catch(err => {
      res.status(500).json({ message: err.message });
    });
});

router.get('/:id/steps', (req, res) => {
  const { id } = req.params;

  Schemes.findSteps(id)
    .then(steps => {
      if (steps.length) {
        res.json(steps);
      } else {
        res.status(404).json({ message: 'Could not find steps for given scheme' });
      }
    })
    .catch(err => {
      res.status(500).json({ message: err.message });
    });
});

router.post('/', (req, res) => {
  const schemeData = req.body;

  Schemes.add(schemeData)
    .then(scheme => {
      return Schemes.findById(scheme[0]);
    })
    .then(newScheme => {
      res.status(201).json(newScheme);
    })
    .catch(err => {
      res.status(500).json({ message: err.message });
    });
});

router.post('/:id/steps', (req, res) => {
  const stepData = req.body;
  const { id } = req.params;

  Schemes.findById(id)
    .then(scheme => {
      if (scheme) {
        return Schemes.addStep(stepData, id);
      } else {
        res.status(404).json({ message: 'Could not find scheme with given id.' });
      }
    })
    .then(step => {
      return Schemes.findNewStep(step[0]);
    })
    .then(newStep => {
      res.status(201).json(newStep);
    })
    .catch(err => {
      res.status(500).json({ message: err.message });
    });
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  Schemes.findById(id)
    .then(scheme => {
      if (scheme) {
        return Schemes.update(changes, id);
      } else {
        res.status(404).json({ message: 'Could not find scheme with given id' });
      }
    })
    .then(() => {
      return Schemes.findById(id);
    })
    .then(updated => {
      res.status(200).json(updated);
    })
    .catch(err => {
      res.status(500).json({ message: err.message });
    });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;

  Schemes.remove(id)
    .then(deleted => {
      if (deleted) {
        res.json({ message: `Scheme with the id of ${id} was deleted along with its corresponding steps` });
      } else {
        res.status(404).json({ message: 'Could not find scheme with given id' });
      }
    })
    .catch(err => {
      res.status(500).json({ message: err.message });
    });
});

module.exports = router;
