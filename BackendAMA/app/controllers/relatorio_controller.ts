import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url' // Adicionado para corrigir __dirname
import PDFDocument from 'pdfkit'
import { HttpContext } from '@adonisjs/core/http'
import Cadastro from '../models/cadastro.js'

// Criando __dirname manualmente para ES Modules
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default class RelatorioController {
  public async generate({ params, response }: HttpContext) {
    try {
      const cadastro = await Cadastro.query().where('id', params.id).firstOrFail()
      const doc = new PDFDocument()

      doc.fontSize(20).text('Relatório de Cadastro', { align: 'center' })
      doc.moveDown()

      doc.fontSize(12).text(`Nome: ${cadastro.nome}`)
      doc.text(`Data de Nascimento: ${cadastro.data_nascimento.toLocaleDateString()}`)
      doc.text(`CPF: ${cadastro.cpf}`)
      doc.text(`Responsáveis: ${cadastro.responsaveis}`)
      doc.text(`Contatos: ${cadastro.contatos}`)
      doc.moveDown()

      doc.text(`Diagnóstico: ${cadastro.diagnostico}`)
      doc.text(`CID: ${cadastro.cid}`)
      doc.text(`Tratamentos: ${cadastro.tratamentos}`)
      doc.text(`Medicações: ${cadastro.medicacoes}`)
      doc.text(`Local de Atendimento: ${cadastro.local_atendimento}`)
      doc.moveDown()

      doc.text(`Renda Bruta Familiar: ${cadastro.renda_bruta_familiar}`)
      doc.text(`Pessoas na Residência: ${cadastro.pessoas_residencia}`)
      doc.text(`Situação da Casa: ${cadastro.casa_situacao}`)
      doc.text(`Recebe Benefício: ${cadastro.recebe_beneficio}`)
      doc.moveDown()

      doc.text(`Instituição de Ensino: ${cadastro.instituicao_ensino}`)
      doc.text(`Endereço da Escola: ${cadastro.endereco_escola}`)
      doc.text(`Nível de Escolaridade: ${cadastro.nivel_escolaridade}`)
      doc.text(`Acompanhamento Especializado: ${cadastro.acompanhamento_especializado}`)
      doc.moveDown()

      doc.text(`Observações: ${cadastro.observacoes || 'Nenhuma observação.'}`)
      doc.moveDown()

      // 📌 Corrigindo o caminho da imagem
      if (cadastro.foto) {
        const uploadDir = path.join(__dirname, '../../tmp/uploads')
        const fotoPath = path.join(uploadDir, cadastro.foto)

        if (fs.existsSync(fotoPath)) {
          doc.image(fotoPath, { width: 150, align: 'center' })
          doc.moveDown()
        } else {
          console.warn(`Imagem não encontrada: ${fotoPath}`)
        }
      }

      // Envia o PDF como resposta
      response.header('Content-Type', 'application/pdf')
      response.header('Content-Disposition', `inline; filename="relatorio_${cadastro.id}.pdf"`)

      doc.pipe(response.response)
      doc.end()
    } catch (error) {
      console.error('Erro ao gerar o relatório:', error)
      response.status(500).send('Erro ao gerar o relatório')
    }
  }
}
