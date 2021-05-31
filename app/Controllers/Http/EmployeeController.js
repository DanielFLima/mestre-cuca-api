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




    async findByName({request, response, auth,params}){
        const first_name = request.input('first_name');
        const user = await User.query().where('first_name','LIKE',`%${first_name}%`).fetch()
        
        console.log(user)

        if (user == undefined){
            response.status(404);
            response.json({err:"Nome não encontrado!"});

        }else{
            response.status(200);
            response.json({user});
        }
    }
}



module.exports = EmployeeController
