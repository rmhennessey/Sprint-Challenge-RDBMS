
exports.seed = function(knex, Promise) {
      return knex('actions').insert([
        {description: 'I am seeded action 1', notes: 'seeded notes 1', project_id: 1 },
        {description: 'I am seeded action 2', notes: 'seeded notes 2', project_id: 2 },
        {description: 'I am seeded action 3', notes: 'seeded notes 3', project_id: 3 }
      ]);
};
