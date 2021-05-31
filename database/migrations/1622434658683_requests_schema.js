'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class RequestsSchema extends Schema {
  up () {
    this.create('requests', (table) => {
      table.increments()
      table.integer('sale_id').unsigned().references('id').inTable('sales')
      table.integer('client_id').unsigned().references('id').inTable('customers')
      table.integer('employee_id').unsigned().references('id').inTable('employees')
      table.timestamps()
    })
  }

  down () {
    this.drop('requests')
  }
}

module.exports = RequestsSchema
