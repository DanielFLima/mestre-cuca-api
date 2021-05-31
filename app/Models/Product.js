'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')



class Product extends Model {

    category(){
        return this.hasMany('App/Models/Category')
      }

    supplier(){
        return this.hasMany('App/Models/Supplier')
      }
      
}

module.exports = Product
