'use strict'

const User = use('App/Models/User');
const {validateAll} = use('Validator')


class UserController {

    async signIn({request, response}){
        const rules ={
            username:'required | min:6| max:45',
            email:'required',
            password:'required | min:6| max:45',
        }
        const messages = {
            'username.required':'Campo Usuário é obrigatório',
            'username.min':'Quantidade de caracteres para Usuário insuficiente (min:6)',
            'username.max':'Quantidade de caracteres para Usuário acima do permitido (max:45)',
        
            'email.required':'Campo e-mail é obrigatório',

            'password.required':'Campo Senha é obrigatório',
            'password.min':'Quantidade de caracteres para Senha insuficiente (min:6)',
            'password.max':'Quantidade de caracteres para Senha acima do permitido (max:45)',
        }

        const validate = await validateAll(request.all(), rules, messages);

        if(validate.fails()){
            return response.status(401).send({message:validate.messages()})
        }

        try {
            const {first_name, last_name, email, username, password, phone, phone2, sector, 
            salary, street, number, district, complement, role} = request.all();
            console.log(request.all())

            const user = await User.create({first_name, last_name, email, username, password, phone, phone2, sector, 
            salary, street, number, district, complement, role});

           console.log(user)
           return response.status(200).json({
                status:'success',
                message:'cadastro de '+user.username + ' realizado com sucesso!'
            })
            
        }catch (error) {
            return response.status(400).json({
                status: 'error',
                message: 'Falha ao cadastrar, por favor tente novamente!'
            })
        }
    }
    
    
    async update({request, response, params}){

        try {
            const {username,email,role} = request.all();
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


    async login({request, response, auth}){
        try {
            const{username, password} = request.all();
            
            const token = await auth.withRefreshToken().attempt(username, password);

            return response.send(token);

        } catch (error) {
            return response.status(500).send({error:error})
        }
        
    }

    async refresh({request, response, auth}){
        try {
            var refreshToken = request.input('refreshToken');
            
            if(!refreshToken){
                refreshToken = request.header('refreshToken')
            }

            const user = await auth.newRefreshToken().generateForRefreshToken(refreshToken);
 
            return response.send({data:user});

        } catch (error) {
            return response.status(500).send({error:error})
        }
        
    }

    async logout({request,response,auth}){
        let refreshToken = request.input('refreshToken')
        
        if(!refreshToken){
            refreshToken = request.header('refreshToken')
        }

        await auth.authenticator('jwt').revokeTokens([refreshToken],true)

        return response.status(204).send({})
    }


  


}

module.exports = UserController
''