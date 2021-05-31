'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserSchema extends Schema {
  up () {
    this.create('users', (table) => {
      table.increments()

      table.string('username', 80).notNullable().unique()
      table.string('email', 254).notNullable().unique()
      table.string('password', 60).notNullable()

      table.string('first_name',45).notNullable()
      table.string('last_name',45).notNullable()

      table.string('phone',11).notNullable()
      table.string('phone2',11).defaultTo(null)

      table.string('street',45).notNullable()
      table.string('number',10).notNullable()
      table.string('district',25).notNullable()
      table.string('complement',20).defaultTo(null)
      
      table.string('sector',20).defaultTo("").notNullable()
      table.decimal('salary',[10,2]).defaultTo(0.0).notNullable()
      
      table.integer('role').defaultTo(0).notNullable()

      table.timestamps()
    })
  }

  down () {
    this.drop('users')
  }
}

module.exports = UserSchema
