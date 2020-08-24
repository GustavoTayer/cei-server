const Produto = require('./produto')
const User = require('../user/user')
const errorHandler = require('../common/errorHandler')

Produto.methods([])
Produto.updateOptions({new: true, runValidators: true})
Produto.after('post', errorHandler).after('put', errorHandler)

Produto.route('lista', (req, res, next) => {
  Produto.find({ativo: true}, (err, produtos) => {
    if(err) {
      return res.status(400).json(err)
    } else {
      return res.json(produtos)
    }
  })
})

Produto.route('atualizar', (req, res, next) => {
  const usuario = req.decoded._id
  const id = req.body.id
  const dadosProduto = req.body;
  delete dadosProduto.id;
  User.findById(usuario, (err, usr) => {
    if(err) {
      return res.status(400).json(err)
    } else if(!validar(usr)) {
      return res.status(403).json({errors: ['Você não possui permissão para fazer isso']})
    } else {
      Produto.findByIdAndUpdate(id, dadosProduto, (err, produto) => {
        if(err) {
          return res.status(400).json(err)
        } else {
          return res.json(produto)
        }
      })
    }
  })
})

Produto.route('buscarPorId', (req, res, next) => {
  const usuario = req.decoded._id
  const id = req.body.id;
  User.findById(usuario, (err, usr) => {
    if(err) {
      return res.status(400).json(err)
    } else if(!validar(usr)) {
      return res.status(403).json({errors: ['Você não possui permissão para fazer isso']})
    } else {
      Produto.findById(id, (err, prod) => {
        if(err) {
          return res.status(400).json(err)
        } else {
          return res.json(prod)
        }
      })
    }
  })
})

Produto.route('criar', (req, res, next) => {
  const usuario = req.decoded._id
  const dadosProduto = req.body;
  User.findById(usuario, (err, usr) => {
    if(err) {
      return res.status(400).json(err)
    } else if(!validar(usr)) {
      return res.status(403).json({errors: ['Você não possui permissão para fazer isso']})
    } else {
      const produto = new Produto(dadosProduto)
      produto.save((err, produto) => {
        if(err) {
          return res.status(400).json(err)
        } else {
          return res.json(produto)
        }
      })
    }
  })
})

Produto.route('validarTela', (req, res, next) => {
  const usuario = req.decoded._id
  User.findById(usuario, (err, usr) => {
    if(err) {
    } else {
      return validar(usr) ?
        res.status(200).json({autorizado: true}) :
        res.status(403).json({autorizado: false})
    }
  })
})

Produto.route('buscar', (req, res, next) => {
  Produto.find({}, (err, prod) => {
    if (err) {
      console.log(err)
    } else {
      return res.json(prod)
    }
  })
})

Produto.route('count', (req, res, next) => {
    Produto.count((error, value) => {
        if(error) {
            res.status(500).json({errors: [error]})
        } else {
            res.json({value})
        }
    })
})

const validar = (usr) => {
  return usr.hierarquia === 'REITOR' || usr.hierarquia === 'CONSELHO_GESTOR'
}

module.exports = Produto
