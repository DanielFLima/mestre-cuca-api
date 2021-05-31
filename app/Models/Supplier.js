'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Supplier extends Model {
    category(){
        return this.hasOne('App/Models/Category')
      }
}

module.exports = Supplier
