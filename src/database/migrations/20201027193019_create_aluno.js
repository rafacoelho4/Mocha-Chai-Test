
exports.up = function(knex) {
    return knex.schema.createTable('alunos', function (table) {
        table.string('id').primary();
        table.string('name')
            .notNullable();
        table.string('email')
            .notNullable()
            .unique();
        table.string('password').notNullable();
        table.string('photo');
        table.string('major').notNullable();
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('alunos');
};