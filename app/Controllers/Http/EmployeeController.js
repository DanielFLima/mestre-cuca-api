'use strict'


const Employee = use('App/Models/Employee');
const User = use('App/Models/User')
const {validateAll} = use('Validator')

class EmployeeController {

//----------------------------------------------------------------------------
 

    async index({request, response, auth,params}){
    
        try {
            const user = await User.query().where('role','LIKE',0).fetch()
            return user
            
        } catch (error) {
            response.status(404).send({
                message:'Funcionários não encontrados!'
            })
        }

    }

    async findById({request, response, auth,params}){
        try {
            const user = await User.find(params.id);

            if(user.role == 0){
                return user
            }
            return response.status(404).send({message:'Id de funcionário não encontrado!'})
            //const user = await User.query().where('id','LIKE',id).fetch()

            
        } catch (error) {
            return response.status(404).send({message:'Id de funcionário não encontrado!'})
        }

    }




    async findUserName({request, response, auth,params}){
        var first_name = request.input('first_name');
        var user = await User.query().where('first_name','LIKE',first_name)
        
        if (user == undefined){
            res.status(404);
            res.json({err:"Nome não encontrado!"});

        }else{
            res.status(200);
            res.json(user);
        }
    }
}



module.exports = EmployeeController
