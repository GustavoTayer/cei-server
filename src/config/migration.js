const migrationService = require('../api/migrations/migrationService')
const mudancas = () => {
  migrationService.criarUsuarioAdmin()
  migrationService.atualizarEquipe()
  migrationService.criarEquipeBolo()
  migrationService.gerarCaixaPartilha()
  migrationService.criarCount('PARTILHA_MOVIMENTACAO')
}

module.exports = { mudancas }
