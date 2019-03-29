exports.up = function(knex, Promise) {
    return knex.schema.createTable('actions', function(tbl) {
        tbl.increments();
  
        tbl
            .string('description', 250)
            .notNullable()
            .unique();

        tbl
            .string('notes', 250)
            .notNullable()
            .unique();

        tbl
            .boolean('completed', 250)
            .notNullable()
            .defaultTo(false);

        tbl
            .integer('project_id')
            .unsigned()
            .references('id')
            .inTable('projects')
            .onDelete('CASCADE')
            .onUpdate('CASCADE');


    })
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('actions');
  };