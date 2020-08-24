const Equipe = require("./equipe");
const User = require("../user/user");
const errorHandler = require("../common/errorHandler");
const Cargo = require("../equipe_cargo/equipe-cargo");
Equipe.methods([]);
Equipe.updateOptions({ new: true, runValidators: true });
Equipe.after("post", errorHandler).after("put", errorHandler);

Equipe.route("lista", (req, res, next) => {
  Equipe.find({ ativo: true }, (err, produtos) => {
    if (err) {
      return res.status(400).json(err);
    } else {
      return res.json(produtos);
    }
  });
});

Equipe.route("atualizar", (req, res, next) => {
  const usuario = req.decoded._id;
  const id = req.body.id;
  const dadosProduto = req.body;
  delete dadosProduto.id;
  User.findById(usuario, (err, usr) => {
    if (err) {
      return res.status(400).json(err);
    } else if (!validar(usr, id)) {
      return res
        .status(403)
        .json({ errors: ["Você não possui permissão para fazer isso"] });
    } else {
      Equipe.findByIdAndUpdate(id, dadosProduto, (err, produto) => {
        if (err) {
          return res.status(400).json(err);
        } else {
          return res.json(produto);
        }
      });
    }
  });
});

Equipe.route("buscarPorId", (req, res, next) => {
  const usuario = req.decoded._id;
  const id = req.body.id;
  User.findById(usuario, (err, usr) => {
    if (err) {
      return res.status(400).json(err);
    } else if (!validar(usr, id)) {
      return res
        .status(403)
        .json({ errors: ["Você não possui permissão para fazer isso"] });
    } else {
      Equipe.findById(id, (err, eqp) => {
        if (err) {
          return res.status(400).json(err);
        } else {
          populateEquipe(eqp, res);
        }
      });
    }
  });
});

Equipe.route("removerMembro", (req, res, next) => {
  const usuario = req.decoded._id;
  User.findById(usuario, (err, usr) => {
    if (err) {
      return res.status(400).json(err);
    } else if (!validar(usr, cargo.equipe)) {
      return res
        .status(403)
        .json({ errors: ["Você não possui permissão para fazer isso"] });
    } else {
      Equipe.updateOne(
        { _id: req.body.id },
        {
          $pull: { membros: req.body.usuarioId },
        },
        (err, eqp) => {
          if (err) {
            return res.status(400).json(err);
          }
          User.updateOne(
            { _id: req.body.usuarioId },
            { equipe: null },
            (err, user) => {
              if (err) {
                return res.status(400).json(err);
              } else {
                Equipe.findById(req.body.id, (err, eqp) => {
                  populateEquipe(eqp, res);
                });
              }
            }
          );
        }
      );
    }
  })
});

Equipe.route("adicionarCargoUsuario", (req, res, next) => {
  const usuario = req.decoded._id;
  User.findById(usuario, (err, usr) => {
    if (err) {
      return res.status(400).json(err);
    } else if (!validar(usr, req.body.id)) {
      return res
        .status(403)
        .json({ errors: ["Você não possui permissão para fazer isso"] });
    } else {
      User.updateOne(
        { _id: req.body.usuarioId },
        { cargo: req.body.cargoId },
        (err, upd) => {
          Equipe.findById(req.body.id, (err, eqp) => {
            if (err) {
              return res.status(400).json(err);
            }
            populateEquipe(eqp, res);
          });
        }
      );
    }
  });
});

Equipe.route("criarCargo", (req, res, next) => {
  delete req.body._id;
  const cargo = new Cargo(req.body);
  const usuario = req.decoded._id;
  User.findById(usuario, (err, usr) => {
    if (err) {
      return res.status(400).json(err);
    } else if (!validar(usr, cargo.equipe)) {
      return res
        .status(403)
        .json({ errors: ["Você não possui permissão para fazer isso"] });
    } else {
      Equipe.findById(cargo.equipe, (err, eqp) => {
        if (err) {
          return res.status(400).json(err);
        }
        if (!eqp.cargos) {
          eqp.cargos = [];
        }
        cargo.save((err, crg) => {
          if (err) {
            return res.status(400).json(err);
          }
          eqp.cargos.push(crg._id);
          eqp.save((err, equipeSalva) => {
            if (err) {
              return res.status(400).json(err);
            }
            populateEquipe(equipeSalva, res);
          });
        });
      });
    }
  });
});

Equipe.route("criar", (req, res, next) => {
  const usuario = req.decoded._id;
  const dadosEquipe = req.body;
  User.findById(usuario, (err, usr) => {
    if (err) {
      return res.status(400).json(err);
    } else if (!validar(usr, null)) {
      return res
        .status(403)
        .json({ errors: ["Você não possui permissão para fazer isso"] });
    } else {
      if (!equipe.nome) {
        return res.status(400).json({ errors: ["Nome é obrigatório"] });
      }
      const equipe = new Equipe(dadosEquipe);
      equipe.save((err, eqp) => {
        if (err) {
          return res.status(400).json(err);
        } else {
          return res.json(eqp);
        }
      });
    }
  });
});

Equipe.route("validarTela", (req, res, next) => {
  const usuario = req.decoded._id;
  const eqpId = req.body.id;
  User.findById(usuario, (err, usr) => {
    if (err) {
    } else {
      return usr.hierarquia === "REITOR" ||
        (eqpId === "minha-equipe" && usr.coordenaEquipe && usr.equipe)
        ? res.status(200).json({ autorizado: true })
        : res.status(403).json({ autorizado: false });
    }
  });
});

Equipe.route("usuariosSemEquipeSelect", (req, res, next) => {
  User.find(
    { equipe: null, name: { $regex: `${req.body.q}`, $options: "i" } },
    { name: 1, _id: 1 }
  )
    .limit(5)
    .exec((err, prod) => {
      if (err) {
        console.log(err);
      } else {
        return res.json(prod);
      }
    });
});

Equipe.route("buscar", (req, res, next) => {
  Equipe.find({}, (err, prod) => {
    if (err) {
      console.log(err);
    } else {
      return res.json(prod);
    }
  });
});

Equipe.route("buscarMinhaEquipe", (req, res, next) => {
  const usuario = req.decoded._id;
  User.findById(usuario, (err, usr) => {
    if (!usr.equipe) {
      return res.status(403).json({ errors: ["Você não possui uma equipe"] });
    }
    populate(usr.equipe, res);
  });
});

Equipe.route("adicionarMembro", (req, res, next) => {
  const { usuarioId, id } = req.body;
  Equipe.findById(id, (err, equipe) => {
    if (err) {
      console.log(err);
    } else {
      if (!equipe.membros) {
        equipe.membros = [];
      }
      equipe.membros.push(usuarioId);
      equipe.save((err, equipe) => {
        if (err) {
          console.log(err);
          return res.status(400).json(err);
        } else {
          User.findByIdAndUpdate(usuarioId, { equipe: id }, (err, usr) => {
            if (err) {
              console.log(err);
              return res.status(400).json(err);
            } else {
              populateEquipe(equipe, res);
            }
          });
        }
      });
    }
  });
});

Equipe.route("removerCargo", (req, res, next) => {
  const usuario = req.decoded._id;
  const { id, cargoId } = req.body;
  User.findById(usuario, (err, usr) => {
    if (err) {
      return res.status(400).json(err);
    } else if (!validar(usr, id)) {
      return res
        .status(403)
        .json({ errors: ["Você não possui permissão para fazer isso"] });
    } else {
      User.updateMany({ cargo: cargoId }, { cargo: null }, (err, update) => {
        if (err) {
          return res.status(400).json(err);
        }
        Equipe.updateOne(
          { _id: id },
          { $pull: { cargos: cargoId } },
          (err, eqp) => {
            if (err) {
              return res.status(400).json(err);
            }
            Cargo.remove({ _id: id }, (err, rmv) => {
              if (err) {
                return res.status(400).json(err);
              }
              Equipe.findById(id, (err, equipe) => {
                populateEquipe(equipe, res);
              });
            });
          }
        );
      });
    }
  });
});

Equipe.route("count", (req, res, next) => {
  Equipe.count((error, value) => {
    if (error) {
      res.status(500).json({ errors: [error] });
    } else {
      res.json({ value });
    }
  });
});

Equipe.route("select", (req, res, next) => {
  Equipe.find({ ativo: true }, { nome: 1, _id: 1 }, (error, value) => {
    if (error) {
      res.status(500).json({ errors: [error] });
    } else {
      res.json(value);
    }
  });
});

const populateEquipe = (equipe, res) => {
  equipe
    .populate({
      path: "membros",
      populate: {
        path: "cargo",
      },
      select: "-password",
    })
    .populate("permissoes")
    .populate("cargos", (err, equipePop) => {
      if (err) {
        return res.status(400).json(err);
      } else {
        return res.json(equipePop);
      }
    });
};

const validar = (usr, eqpId) => {
  return (
    usr.hierarquia === "REITOR" || (usr.coordenaEquipe && usr.equipe === eqpId)
  );
};

module.exports = Equipe;
