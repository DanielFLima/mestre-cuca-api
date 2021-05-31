'use strict'

const Employee = use('App/Models/Employee')
const Product = use('App/Models/Product')
const User = use('App/Models/User')

class ProductController {

    async create({request, response}){

        try{
            const {name,price,qtd,category_id,supplier_id} = request.all()
            
            const product = await Product.create({name,price,qtd,category_id,supplier_id})
    
            return response.status(201).send(product)
        }catch(error){
            
            response.status(400).send({message:'Não foi possível criar o produto!'})
        }
    }

    async index({request, response, auth,params}){
    
        try {
            //const products = await Product.query().fetch()
            const products = await Product.all()

            return products
            
        } catch (error) {
            response.status(404).send({
                message:'Produtos Não encontrado!'
            })
        }

    }
}

module.exports = ProductController
