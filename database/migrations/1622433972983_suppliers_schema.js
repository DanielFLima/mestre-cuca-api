'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class SuppliersSchema extends Schema {
  up () {
    this.create('suppliers', (table) => {
      table.increments()
      table.integer('category_id').unsigned().references('id').inTable('categories');
      
      table.string('name',45).notNullable()
      table.string('company_name',45).notNullable()

      table.string('phone',11).notNullable()
      table.string('phone2',11).defaultTo(null)

      table.string('email',45).defaultTo(null)
      table.timestamps()
    })
  }

  down () {
    this.drop('suppliers')
  }
}

module.exports = SuppliersSchema
