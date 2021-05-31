'use strict'

const User = use('App/Models/User');
const Employee = use('App/Models/Employee');

class UserController {

    async signIn({request, response, auth}){
        const {username, password, email} = request.all();
        try {
            const user = await User.create({username, password, email} )
           
            return response.status(200).json({
                status:'sucess',
                message:'cadastro de '+user.username + ' realizado com sucesso!'
            })
            
        } catch (error) {
            return response.status(400).json({
                status: 'error',
                message: 'Falha ao cadastrar, por favor tente novamente!'
            })
        }
    }
    
    
    async update({request, response, params}){
        const {username,email,role} = request.all();
        try {
            const user = await User.find(params.id)
            if(!user){
                return response.status(404).send({
                    message:'Id não encontrado!'
                })
            }
            user.username = username;
            user.email = email;
            user.role = role;

            await user.save();

            return user

        } catch (error) {
            response.send(error)
        }
    }

    async destroy({request, response, params}){
       
            const user = await User.find(params.id);
            if(!user){
                return response.status(404).send({
                    message:'Id não encontrado!'
                })
            }
            await user.delete();
        return response.status(200).send({
            message:'foi'
        })
    }



    async index({request, response, auth}){
        try {
            const users = await User.all()
            
            return users
            
        } catch (error) {
            response.send(error)
        }
        
    }
//--------------------------------------------------------- FIM DO CRUD-----------------------------------------------


    async login({request, response}){
        
        
    }

    async employeeSignIn({request, response}){
        const data = request.only(['first_name','last_name','email','phone','phone2','function','salary','street','number','complement','role'])
    
        try{
        const employee = await Employee.create(data)

        return response.status(200).json({
            status:'sucess',
            message:'cadastro de '+ employee.first_name + ' realizado com sucesso!'
        })
        
        } catch (error) {
            return response.status(400).json({
                status: error,
                message: 'Falha ao cadastrar, por favor tente novamente!'
            })
        }
    }

    async employeeList({request, response}){



    }


}

module.exports = UserController
''