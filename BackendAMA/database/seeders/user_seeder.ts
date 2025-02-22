import User from '#models/user'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    await User.create({
      nome: 'Ama Timon',
      email: 'amatimon@email.com',
      password: 'timonAma2025',
      id: 1,
    })
  }
}
