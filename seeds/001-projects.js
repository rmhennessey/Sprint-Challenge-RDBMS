
exports.seed = function(knex, Promise) {
      return knex('projects').insert([
        {name: 'Seeded Project 1', description: 'I am a seed 1'},
        {name: 'Seeded Project 2', description: 'I am a seed 2'},
        {name: 'Seeded Project 3', description: 'I am a seed 3'}
      ]);
};
