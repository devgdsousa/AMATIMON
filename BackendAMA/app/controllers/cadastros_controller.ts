import { createCadastroValidator, updateCastroValidator } from '#validators/cadastro'
import type { HttpContext } from '@adonisjs/core/http'
import Cadastro from '#models/cadastro'
import Application from '@adonisjs/core/services/app'

export default class CadastrosController {
  // Listar todos os cadastros do usuário autenticado
  async index({ auth, response }: HttpContext) {
    try {
      const user = auth.user!
      await user.preload('cadastros')
      return response.ok(user.cadastros)
    } catch (error) {
      console.log('Erro ao listar cadastros:', error)
      return response.internalServerError({ message: 'Erro ao listar cadastros', error })
    }
  }

  // Criar um novo cadastro
  async store({ request, auth, response }: HttpContext) {
    try {
      const data = await request.validateUsing(createCadastroValidator)
      const user = auth.user!

      const foto = request.file('foto', { extnames: ['jpg', 'jpeg', 'png'] })
      const documento = request.file('documento', { extnames: ['pdf', 'jpg', 'jpeg', 'png'] })
      const laudo = request.file('laudo', { extnames: ['pdf', 'jpg', 'jpeg', 'png'] })
      const documentoResponsaveis = request.file('documentoResponsaveis', {
        extnames: ['pdf', 'jpg', 'jpeg', 'png'],
      })

      const uploadPath = Application.tmpPath('uploads')

      // Gerar nome único para cada arquivo
      const fotoFileName = foto ? `${Date.now()}_${foto.clientName}` : null
      const documentoFileName = documento ? `${Date.now()}_${documento.clientName}` : null
      const laudoFileName = laudo ? `${Date.now()}_${laudo.clientName}` : null
      const documentoResponsaveisFileName = documentoResponsaveis
        ? `${Date.now()}_${documentoResponsaveis.clientName}`
        : null

      // Mover os arquivos para a pasta de uploads
      if (foto) await foto.move(uploadPath, { name: fotoFileName || `${Date.now()}_foto` })

      if (documento)
        await documento.move(uploadPath, { name: documentoFileName || `${Date.now()}_documento` })

      if (laudo) await laudo.move(uploadPath, { name: laudoFileName || `${Date.now()}_laudo` })

      if (documentoResponsaveis)
        await documentoResponsaveis.move(uploadPath, {
          name: documentoResponsaveisFileName || `${Date.now()}_documentoResponsaveis`,
        })

      // Criar cadastro com os arquivos
      const cadastro = await user.related('cadastros').create({
        ...data,
        foto: fotoFileName ? `/uploads/${fotoFileName}` : null,
        documento: documentoFileName ? `/uploads/${documentoFileName}` : null,
        laudo: laudoFileName ? `/uploads/${laudoFileName}` : null,
        documento_responsaveis: documentoResponsaveisFileName
          ? `/uploads/${documentoResponsaveisFileName}`
          : null,
      })

      return response.created({ message: 'Cadastro criado com sucesso', cadastro })
    } catch (error) {
      console.log('Erro ao criar cadastro:', error)
      return response.badRequest({ message: 'Erro ao criar cadastro', error })
    }
  }

  // Exibir um cadastro específico
  async show({ params, auth, response }: HttpContext) {
    try {
      const user = auth.user!
      const cadastro = await Cadastro.query()
        .where('id', params.id)
        .andWhere('user_id', user.id)
        .first()

      if (!cadastro) {
        return response.notFound({ message: 'Cadastro não encontrado' })
      }

      return response.ok(cadastro)
    } catch (error) {
      console.log('Erro ao buscar cadastro:', error)
      return response.internalServerError({ message: 'Erro ao buscar cadastro', error })
    }
  }

  // Atualizar um cadastro específico
  async update({ params, request, response }: HttpContext) {
    try {
      const cadastro = await Cadastro.findByOrFail('id', params.id)
      const cadastroData = await request.validateUsing(updateCastroValidator)

      // Tratamento de arquivos
      const foto = request.file('foto', { extnames: ['jpg', 'jpeg', 'png'] })
      const documento = request.file('documento', { extnames: ['pdf', 'jpg', 'jpeg', 'png'] })
      const laudo = request.file('laudo', { extnames: ['pdf', 'jpg', 'jpeg', 'png'] })
      const documentoResponsaveis = request.file('documentoResponsaveis', {
        extnames: ['pdf', 'jpg', 'jpeg', 'png'],
      })

      const uploadPath = Application.tmpPath('uploads')

      // Gerar nome único para cada arquivo e mover para a pasta de uploads
      if (foto) {
        const fotoFileName = `${Date.now()}_${foto.clientName}`
        await foto.move(uploadPath, { name: fotoFileName })
        cadastro.foto = `/uploads/${fotoFileName}`
      }

      if (documento) {
        const documentoFileName = `${Date.now()}_${documento.clientName}`
        await documento.move(uploadPath, { name: documentoFileName })
        cadastro.documento = `/uploads/${documentoFileName}`
      }

      if (laudo) {
        const laudoFileName = `${Date.now()}_${laudo.clientName}`
        await laudo.move(uploadPath, { name: laudoFileName })
        cadastro.laudo = `/uploads/${laudoFileName}`
      }

      if (documentoResponsaveis) {
        const documentoResponsaveisFileName = `${Date.now()}_${documentoResponsaveis.clientName}`
        await documentoResponsaveis.move(uploadPath, { name: documentoResponsaveisFileName })
        cadastro.documento_responsaveis = `/uploads/${documentoResponsaveisFileName}`
      }

      const updatedCadastroData = {
        ...cadastroData,
        foto: cadastro.foto || undefined,
        documento: cadastro.documento || undefined,
        laudo: cadastro.laudo || undefined,
        documento_responsaveis: cadastro.documento_responsaveis || undefined,
      }

      cadastro.merge(updatedCadastroData)
      await cadastro.save()

      return response.ok({ message: 'Cadastro atualizado com sucesso', cadastro })
    } catch (error) {
      console.log('Erro ao atualizar cadastro:', error)
      return response.badRequest({ message: 'Erro ao atualizar cadastro', error })
    }
  }

  // Deletar um cadastro específico
  async destroy({ params, auth, response }: HttpContext) {
    try {
      const user = auth.user!
      const cadastro = await Cadastro.query()
        .where('id', params.id)
        .andWhere('user_id', user.id)
        .first()

      if (!cadastro) {
        return response.notFound({ message: 'Cadastro não encontrado' })
      }

      await cadastro.delete()
      return response.noContent()
    } catch (error) {
      console.log('Erro ao excluir cadastro:', error)
      return response.internalServerError({ message: 'Erro ao excluir cadastro', error })
    }
  }
}
