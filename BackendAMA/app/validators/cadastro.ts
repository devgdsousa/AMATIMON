import vine from '@vinejs/vine'

export const createCadastroValidator = vine.compile(
  vine.object({
    nome: vine.string(),
    data_nascimento: vine.date(),
    responsaveis: vine.string(),
    cpf: vine.string(),
    contatos: vine.string(),
    foto: vine
      .file({
        size: '2mb',
        extnames: ['jpg', 'png', 'jpeg'],
      })
      .optional(),

    documento: vine
      .file({
        size: '5mb',
        extnames: ['pdf'],
      })
      .optional(),

    documento_responsaveis: vine
      .file({
        size: '5mb',
        extnames: ['pdf'],
      })
      .optional(),

    laudo: vine
      .file({
        size: '5mb',
        extnames: ['pdf', 'jpg', 'png'],
      })
      .optional(),

    diagnostico: vine.string(),
    cid: vine.string(),
    tratamentos: vine.string(),
    medicacoes: vine.string(),
    local_atendimento: vine.string().optional(),

    renda_bruta_familiar: vine.string(),
    pessoas_residencia: vine.string(),
    casa_situacao: vine.string(),
    recebe_beneficio: vine.string(),

    instituicao_ensino: vine.string().optional(),
    endereco_escola: vine.string().optional(),
    nivel_escolaridade: vine.string().optional(),
    acompanhamento_especializado: vine.string().optional(),
    observacoes: vine.string().optional(),
  })
)

export const updateCastroValidator = vine.compile(
  vine.object({
    nome: vine.string().optional(),
    data_nascimento: vine.date().optional(),
    responsaveis: vine.string().optional(),
    cpf: vine.string().optional(),
    contatos: vine.string().optional(),
    foto: vine.file({ size: '5mb', extnames: ['jpg', 'jpeg', 'png', 'pdf'] }).optional(),
    documento: vine.file({ size: '5mb', extnames: ['jpg', 'jpeg', 'png', 'pdf'] }).optional(),
    documento_responsaveis: vine
      .file({ size: '5mb', extnames: ['jpg', 'jpeg', 'png', 'pdf'] })
      .optional(),

    diagnostico: vine.string().optional(),
    cid: vine.string().optional(),
    tratamentos: vine.string().optional(),
    medicacoes: vine.string().optional(),
    local_atendimento: vine.string().optional(),
    laudo: vine.file({ size: '5mb', extnames: ['jpg', 'jpeg', 'png', 'pdf'] }).optional(),

    renda_bruta_familiar: vine.string().optional(),
    pessoas_residencia: vine.string().optional(),
    casa_situacao: vine.string().optional(),
    recebe_beneficio: vine.string().optional(),

    instituicao_ensino: vine.string().optional(),
    endereco_escola: vine.string().optional(),
    nivel_escolaridade: vine.string().optional(),
    acompanhamento_especializado: vine.string().optional(),
    observacoes: vine.string().optional(),
  })
)
