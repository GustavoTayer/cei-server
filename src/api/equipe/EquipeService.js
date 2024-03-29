const Equipe = require("./equipe");
const User = require("../user/user");
const errorHandler = require("../common/errorHandler");
const Cargo = require("../equipe_cargo/equipe-cargo");
const equipeCargo = require("../equipe_cargo/equipe-cargo");
const { eq } = require("lodash");
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
      populateEquipe2(Equipe.findById(id), res)
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
                return populateEquipe2(Equipe.findById(req.body.id), res)
              }
            }
          );
        }
      );
    }
  });
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
          return getEquipeById(req.body.id);
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
          return populateEquipe2(eqp.save(), res);
          // eqp.save((err, equipeSalva) => {
          //   if (err) {
          //     return res.status(400).json(err);
          //   }
          //   populateEquipe(equipeSalva, res);
          // });
        });
      });
    }
  });
});

Equipe.route("editarCargo", (req, res, next) => {
  editarCargo(req, res, next);
});

const editarCargo = async (req, res, next) => {
  try {
    const id = req.body._id;
    const usr = await User.findById(req.decoded._id);

    const { nome, descricao, permissoes } = req.body;
    const cargo = await Cargo.findById(id);

    if (!validar(usr, cargo.equipe)) {
      return res
        .status(400)
        .json({ errors: ["Você não possui permissão para isso"] });
    }
    // const equipe =  Equipe.findById(cargo.equipe)
    cargo.nome = nome || cargo.nome;
    cargo.descricao = descricao || cargo.descricao;
    cargo.permissoes = permissoes || cargo.permissoes;
    await cargo.save();

    const equipe = await Equipe.findById(cargo.equipe)
      .populate({
        path: "membros",
        populate: {
          path: "cargo",
        },
        select: "-password",
      })
      .populate("permissoes")
      .populate("cargos");
    return res.json(equipe);
  } catch (e) {
    console.log(e);
    return res.status(403).json(e);
  }
};

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

const adicionrMembro = async (req, res) => {
  const { usuarioId, id } = req.body;
  var equipe = await Equipe.findById(id);
  if (!equipe.membros) {
    equipe.membros = [];
  }
  equipe.membros.push(usuarioId);
  let equipeSaved = await equipe.save();
  equipeSaved = await equipeSaved
    .populate({
      path: "membros",
      populate: {
        path: "cargo",
      },
      select: "-password",
    })
    .populate("permissoes")
    .populate("cargos")
    .execPopulate()
  return res.json(equipeSaved)
}

Equipe.route("adicionarMembro", (req, res, next) => adicionrMembro(req, res));

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

const getEquipeById = (id, res) => {
  Equipe.findById(id)
    .populate({
      path: "membros",
      populate: {
        path: "cargo",
      },
      select: "-password",
    })
    .populate("permissoes")
    .populate("cargos")
    .exec((err, eqp) => {
      if (err) {
        res.status(400).json({ errors: [error] })
      } else {
        return res.json(eqp);
      }
    });
};

const populateEquipe2 = (queryFunc, res) => {
  queryFunc
    .populate({
      path: "membros",
      populate: {
        path: "cargo",
      },
      select: "-password",
    })
    .populate("permissoes")
    .populate("cargos")
    .exec((err, equipePop) => {
      if (err) {
        return res.status(400).json(err);
      } else {
        return res.json(equipePop);
      }
    }
    );
}

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
    .populate("cargos").exec(
      (err, equipePop) => {
        if (err) {
          return res.status(400).json(err);
        } else {
          return res.json(equipePop);
        }
      }
    );
};

const validar = (usr, eqpId) => {
  return (
    usr.hierarquia === "REITOR" || (usr.coordenaEquipe && usr.equipe === eqpId)
  );
};

module.exports = Equipe;
