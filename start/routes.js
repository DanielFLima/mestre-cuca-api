'use strict'

const UserController = require('../app/Controllers/Http/UserController')

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', () => {
  return { greeting: 'Hello world in JSON' }
})
Route.post('/signIn', 'UserController.signIn')

Route.get('/list', 'UserController.index')

Route.put('/update/:id', 'UserController.update')

Route.delete('/list/:id', 'UserController.destroy')


Route.post('/employee/singin', 'UserController.employeeSignIn')
Route.post('/login', 'UserController.login')
Route.get('/employee/list', 'UserController.employeeList')