import Cadastro from '#models/cadastro'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    await Cadastro.createMany([
      {
        userId: 1,
        nome: 'Cesar Filho',
        data_nascimento: new Date(2011, 7, 9),
        cpf: '77712354399',
        responsaveis: 'Maria Graça',
        contatos: '86988995544',
        diagnostico: 'TEA',
        cid: '412324',
        medicacoes: 'remediotea',
        tratamentos: 'psiquiatria',
        local_atendimento: 'caps timon',
        casa_situacao: 'alugada',
        pessoas_residencia: '3',
        recebe_beneficio: 'bolsa familia',
        renda_bruta_familiar: '1500',
        instituicao_ensino: 'Escola Juana Dark',
        acompanhamento_especializado: 'não consta',
        endereco_escola: 'rua abreu, 1240',
        nivel_escolaridade: '9 ano',
        observacoes:
          'hiperfoco em desenhos, precisa constantemente de atenção, e não gosta de barulhos',
      },
    ])
  }
}
