'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AddUserFkInEmployeeSchema extends Schema {
  up () {
    this.table('employees', (table) => {

      table.integer('user_id').unsigned().notNullable()
      table.foreign('user_id').references('id').inTable('users').onUpdate('CASCADE').onDelete('SET NULL')
      //table.integer('user_id').references('id').inTable('users').onUpdate('CASCADE').onDelete('SET NULL')
    })
  }

  down () {
    this.table('employees', (table) =>{
      table.dropColumn('user_id')
    })
  }
}

module.exports = AddUserFkInEmployeeSchema
