import type { HttpContext } from '@adonisjs/core/http'
import Cadastro from '../models/cadastro.js'
import { DateTime } from 'luxon'

export default class CadastroController {
  public async getCadastrosPorData({ request, response, auth }: HttpContext) {
    try {
      const user = auth.user
      if (!user) {
        return response.unauthorized({ error: 'Usuário não autenticado.' })
      }

      const { dataInicial, dataFinal } = request.qs()
      if (!dataInicial || !dataFinal) {
        return response.badRequest({ error: 'Por favor, forneça o período de datas.' })
      }

      // Conversão segura de datas para UTC
      const startDate = DateTime.fromISO(dataInicial, { zone: 'utc' }).startOf('day').toISO()
      const endDate = DateTime.fromISO(dataFinal, { zone: 'utc' }).endOf('day').toISO()

      if (!startDate || !endDate) {
        return response.badRequest({ error: 'Datas fornecidas são inválidas.' })
      }

      console.log(`Filtrando cadastros de ${startDate} até ${endDate}`)

      // Buscar os cadastros dentro do período, incluindo o usuário que cadastrou
      const cadastros = await Cadastro.query()
        .whereBetween('created_at', [startDate, endDate])
        .preload('user')
        .orderBy('created_at', 'asc')

      if (cadastros.length === 0) {
        return response.notFound({ message: 'Nenhum cadastro encontrado no período informado.' })
      }

      // Estruturando o relatório agrupado por usuário
      const relatorio = cadastros.reduce<
        Record<string, { id: number; nome: string; criadoEm: string }[]>
      >((acc, cadastro) => {
        const usuarioEmail = cadastro.user?.email || 'Desconhecido'
        if (!acc[usuarioEmail]) {
          acc[usuarioEmail] = []
        }
        acc[usuarioEmail].push({
          id: cadastro.id,
          nome: cadastro.nome, // Supondo que o cadastro tenha um campo "nome"
          criadoEm: cadastro.createdAt?.toISO() || 'Data inválida', // Garantir que seja string
        })
        return acc
      }, {})

      return response.ok(relatorio)
    } catch (error) {
      console.error('Erro ao buscar cadastros:', error)
      return response.internalServerError({ error: 'Erro ao buscar cadastros.' })
    }
  }
}
