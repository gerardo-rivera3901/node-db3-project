// scheme-model
const db = require('../../data/db-config');

module.exports = {
  find() {
    return db('schemes');
  },
  findById(id) {
    return db('schemes').where({id}).first();
  },
  findSteps(id) {
    return db('steps')
      .join('schemes', 'steps.scheme_id', 'schemes.id')
      .select('steps.id', 'schemes.scheme_name', 'steps.step_number', 'steps.instructions')
      .where('scheme_id', id)
      .orderBy('step_number');
  },
  add(scheme) {
    return db('schemes').insert(scheme);
  },
  addStep(stepData, id) {
    return db('steps').insert({...stepData, scheme_id: id});
  },
  findNewStep(id) {
    return db('steps').where({id}).first();
  },
  update(changes, id) {
    return db('schemes').where({id}).update(changes);
  },
  remove(id) {
    db('schemes').where({id}).del();
    db('steps').where('scheme_id', id).del();
    return db('schemes');
  }
};