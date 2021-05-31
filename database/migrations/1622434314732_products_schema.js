'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProductsSchema extends Schema {
  up () {
    this.create('products', (table) => {
      table.increments()
      table.integer('category_id').unsigned().references('id').inTable('categories')
      table.integer('supplier_id').unsigned().references('id').inTable('suppliers')

      table.string('name',45).notNullable()
      table.decimal('price',[7,2]).notNullable().unsigned()
      table.integer('qtd').notNullable().unsigned() 

      table.timestamps()
    })
  }

  down () {
    this.drop('products')
  }
}

module.exports = ProductsSchema
