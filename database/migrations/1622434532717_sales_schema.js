'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class SalesSchema extends Schema {
  up () {
    this.create('sales', (table) => {
      table.increments()
      table.integer('product_id').unsigned().references('id').inTable('products')
      table.integer('qtd').notNullable().unsigned()
      table.decimal('total_sale'[10,2]).notNullable().unsigned()

      table.timestamps()
    })
  }

  down () {
    this.drop('sales')
  }
}

module.exports = SalesSchema
