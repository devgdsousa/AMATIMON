import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'cadastros'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('nome').notNullable()
      table.string('foto').nullable()
      table.date('data_nascimento').notNullable()
      table.string('responsaveis').notNullable()
      table.string('cpf').notNullable().unique()
      table.string('contatos').notNullable()
      table.string('documento').nullable()
      table.string('documento_responsaveis').nullable()

      table.string('diagnostico').notNullable()
      table.string('cid').notNullable()
      table.string('tratamentos').notNullable()
      table.string('medicacoes').notNullable()
      table.string('local_atendimento').notNullable()
      table.string('laudo').nullable()

      table.string('renda_bruta_familiar').notNullable()
      table.string('pessoas_residencia').notNullable()
      table.string('casa_situacao').notNullable()
      table.string('recebe_beneficio').notNullable()

      table.string('instituicao_ensino').notNullable()
      table.string('endereco_escola').notNullable()
      table.string('nivel_escolaridade').notNullable()
      table.string('acompanhamento_especializado').notNullable()
      table.text('observacoes', 'longText').nullable()

      table
        .integer('user_id')
        .notNullable()
        .unsigned()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')

      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
