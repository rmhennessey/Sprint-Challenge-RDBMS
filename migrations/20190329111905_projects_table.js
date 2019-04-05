
exports.up = function(knex, Promise) {
    return knex.schema.createTable('projects', function(tbl) {
        tbl.increments();
  
        tbl
          .text('name', 128)
          .notNullable()
          .unique();

        tbl
          .string('description', 250)
          .notNullable()
          .unique();

        tbl
          .boolean('completed', 250)
          .notNullable()
          .defaultTo(false);
    })
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('projects');
  };
