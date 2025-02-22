import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import User from './user.js'
import { type BelongsTo } from '@adonisjs/lucid/types/relations'

export default class Cadastro extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  // 📌 Dados Pessoais
  @column()
  declare nome: string

  @column()
  declare data_nascimento: Date

  @column()
  declare responsaveis: string

  @column()
  declare cpf: string

  @column()
  declare contatos: string

  @column()
  declare foto: string | null

  @column()
  declare documento: string | null

  @column()
  declare documento_responsaveis: string | null

  // 📌 Saúde
  @column()
  declare diagnostico: string

  @column()
  declare cid: string

  @column()
  declare tratamentos: string

  @column()
  declare medicacoes: string

  @column()
  declare local_atendimento: string

  @column()
  declare laudo: string | null

  // 📌 Financeiro
  @column()
  declare renda_bruta_familiar: string

  @column()
  declare pessoas_residencia: string

  @column()
  declare casa_situacao: string

  @column()
  declare recebe_beneficio: string

  // 📌 Escolar
  @column()
  declare instituicao_ensino: string

  @column()
  declare endereco_escola: string

  @column()
  declare nivel_escolaridade: string

  @column()
  declare acompanhamento_especializado: string

  @column()
  declare observacoes: string

  @column()
  declare userId: number

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
