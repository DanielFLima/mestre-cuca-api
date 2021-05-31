'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CustomersSchema extends Schema {
  up () {
    this.create('customers', (table) => {
      table.increments()      
      table.string('first_name',45).notNullable()
      table.string('last_name',45).defaultTo(null)
      table.string('email',45).defaultTo(null)
      
      table.string('phone',11).notNullable()
      table.string('phone2',11).defaultTo(null)

      table.string('street',45).defaultTo(null)
      table.string('number',10).defaultTo(null)
      table.string('district',25).defaultTo(null)
      table.string('complement',20).defaultTo(null)

      table.timestamps()
    })
  }

  down () {
    this.drop('customers')
  }
}

module.exports = CustomersSchema
