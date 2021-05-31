'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class EmployeeSchema extends Schema {
  up () {
    this.create('employees', (table) => {
      table.increments()

     // table.foreign('user_id').references('id').inTable('users')
      
      table.string('first_name',45).notNullable()
      table.string('last_name',45).notNullable()
      table.string('email',45).defaultTo(null)
      
      table.string('phone',11).notNullable()
      table.string('phone2',11).defaultTo(null)

      table.string('street',45).notNullable()
      table.string('number',10).notNullable()
      table.string('district',25).notNullable()
      table.string('complement',20).defaultTo(null)
      
      table.string('function',20).defaultTo("").notNullable()
      table.decimal('salary',[7,2]).defaultTo(0.0).notNullable()
      
      table.integer('role').defaultTo(0).notNullable()

      table.timestamps()
    })
  }

  down () {
    this.drop('employees')
  }
}

module.exports = EmployeeSchema
