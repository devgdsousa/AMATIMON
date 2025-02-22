import User from '#models/user'
import { createUserValidator, updateUserValidator } from '#validators/user'
import type { HttpContext } from '@adonisjs/core/http'

export default class UsersController {
  async index({}: HttpContext) {
    const users = await User.query().preload('cadastros')
    return users
  }

  async store({ request }: HttpContext) {
    const { email, nome, password } = await request.validateUsing(createUserValidator)
    const user = await User.create({ nome, email, password })
    return user
  }

  async show({ params, response }: HttpContext) {
    try {
      const user = await User.findByOrFail('id', params.id)
      await user.load('cadastros')
      return user
    } catch (error) {
      return response.status(400).json({ error: 'Usuario não encontrado' })
    }
  }

  async update({ params, request }: HttpContext) {
    const user = await User.findBy('id', params.id)
    const { nome, password } = await request.validateUsing(updateUserValidator)
    user!.merge({ nome, password })
    await user!.save()
    return user
  }

  async destroy({ params, response }: HttpContext) {
    try {
      const user = await User.findByOrFail('id', params.id)
      await user.delete()
      return response.status(203)
    } catch (error) {
      return response.status(400).json({ error: 'Usuario não encontrado' })
    }
  }
}
