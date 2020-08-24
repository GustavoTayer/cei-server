const express = require('express');
const auth = require('./auth');

module.exports = function(server) {
    /*
    * Rotas protegidas por Token JWT
    */
    const AuthService = require('../api/user/authService');
    const ConviteService = require('../api/usuario_convidado/UsuarioConvidadoService')
    const protectedApi = express.Router();
    server.use('/api', protectedApi);
    protectedApi.use(auth);
    const BillingCycle = require('../api/billingCycle/billingCycleService');
    BillingCycle.register(protectedApi, '/billingCycles');
    const Produto = require('../api/produto/ProdutoService');
    Produto.register(protectedApi, '/produto')
    const SolicitacaoProduto = require('../api/produto_solicitacao/Solicitacao-ProdutoService')
    SolicitacaoProduto.register(protectedApi, '/solicitacao-produto')
    const SolicitacaoProduto2 = require('../api/solicitacao_produto/Solicitacao-ProdutoService2')
    SolicitacaoProduto2.register(protectedApi, '/solicitacao-produto2')
    const ProdutoSolicitado = require('../api/produto_solicitado/Produto-SolicitadoService.js')
    ProdutoSolicitado.register(protectedApi, '/produtos-solicitados')
    const equipe = require('../api/equipe/EquipeService')
    equipe.register(protectedApi, '/equipe')
    const partilha = require('../api/partilha_solidaria/partilhaSolidariaService')
    partilha.register(protectedApi, '/partilha')
    const partilhaAdiantamento = require('../api/partilha_adiantamento/partilhaAdiantamentoService')
    partilhaAdiantamento.register(protectedApi, '/partilha-adiantamento')
    protectedApi.get('/user/select', AuthService.usuariosSelect)
    protectedApi.post('/user/buscar', AuthService.userList)
    protectedApi.post('/user/buscarPorId', AuthService.findById)
    protectedApi.post('/user/atualizarUsuario', AuthService.atualizarUsuario)
    protectedApi.post('/user/criarConvite', ConviteService.criarConvite)
    protectedApi.post('/user/atualizarUsuarioLogado', AuthService.atualizarUsuarioLogado)
    protectedApi.get('/user/usuarioLogado', AuthService.usuarioLogado)
    protectedApi.get('/user/menuAdmin', AuthService.menuAdmin)
    protectedApi.get('/user/validarTelasDeGestao', AuthService.validarTelasDeGestao)
    protectedApi.get('/user/validaTelaNotUserComum', AuthService.validaTelaNotUserComum)
    protectedApi.post('/user/seminaristasAtivosAutocomplete', AuthService.seminaristasAtivosAutocomplete)
    protectedApi.post('/user/semPassListagem', AuthService.semPassListagem)
    protectedApi.post('/user/semPassAlterar', AuthService.semPassAlterar)
    protectedApi.post('/user/atualizarAvatar', AuthService.atualizarAvatar)
    protectedApi.get('/user/obterAvatar', AuthService.obterAvatar)
    /*
    * Rotas abertas
    */
    const openApi = express.Router();
    server.use('/oapi', openApi);
    openApi.post('/login', AuthService.login);
    openApi.post('/signup', AuthService.signup);
    openApi.post('/validateToken', AuthService.validateToken)
    openApi.post('/obterConvite', ConviteService.obterConvite)
};
