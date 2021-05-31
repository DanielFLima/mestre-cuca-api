'use strict'


const Employee = use('App/Models/Employee');
const {validateAll} = use('Validator')

class EmployeeController {


    async employeeSignIn({request, response, auth}){
        
        const rules ={
            first_name:'required',
            last_name:'required',
            phone:'required',
            sector:'required',
            salary:'required',
            street:'required',
            number:'required',
            district:'required',

        }
        const validate = await validateAll(request.all(), rules);
        if(validate.fails()){
            return response.status(401).send({message:validate.messages()})
        }
        try{

            const {id} = auth.user;
            //const data = request.only(['first_name','last_name','email','phone','phone2','function','salary','street','number','district','complement','role'])
            const {first_name, last_name, email, phone, phone2, sector, 
                    salary, street, number, district, complement, role} = request.all();
           
           
            const employee = await Employee.create({first_name, last_name, email, phone, phone2, sector, 
                salary, street, number, district, complement, role, user_id:id});

            return response.status(200).json({
                status:'sucess',
                message:'cadastro de '+ employee.first_name + ' realizado com sucesso!'
        });
        
        } catch (error) {
            return response.status(400).json({
                status: error,
                message: 'Falha ao cadastrar, por favor tente novamente!'
            });
        }
    }

    async index({request, response}){
        //const employee = await Employee.all();
        const employee = await Employee.query().with('user').fetch();
        
        return employee

    }
}



module.exports = EmployeeController
