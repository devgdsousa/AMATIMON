const UsersController = () => import('#controllers/users_controller')
const CadastrosController = () => import('#controllers/cadastros_controller')
const SessionController = () => import('#controllers/session_controller')

import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'

// Rota de login
router.post('session', [SessionController, 'store'])

// Rotas de usuário
router.resource('user', UsersController).apiOnly()

// Rotas protegidas por autenticação
router
  .group(() => {
    router.resource('cadastro', CadastrosController).apiOnly()
  })
  .use(middleware.auth())
