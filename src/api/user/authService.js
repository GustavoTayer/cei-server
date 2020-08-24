// import {v4 as uuidV4 } from 'uuid';
const _ = require("lodash");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("./user");
const env = require("../../.env");
const multer = require("multer");
const emailRegex = /\S+@\S+\.\S+/;
const passwordRegex = /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%]).{6,20})/;
const UsuarioConvidado = require("../usuario_convidado/UsuarioConvidado");
const Equipe = require("../equipe/equipe");
var mongoose = require("mongoose");
const sendErrorsFromDB = (res, dbErrors) => {
  const errors = [];
  _.forIn(dbErrors.errors, (error) => errors.push(error.message));
  return res.status(400).json({ errors });
};

const usuarioLogado = (req, res, next) => {
  const id = req.decoded._id;
  User.findById(
    id,
    {
      _id: 1,
      name: 1,
      bd: 1,
      email: 1,
      comunidade: 1,
      equipe: 1,
      hierarquia: 1,
      ativo: 1,
      tolkenConvite: 1,
    },
    (err, usr) => {
      if (err) {
        return sendErrorsFromDB(res, err);
      } else {
        return res.json(usr);
      }
    }
  );
};

const usuariosSelect = (req, res, next) => {
  User.find({}, { _id: 1, name: 1 }, (err, users) => {
    if (err) {
      return sendErrorsFromDB(res, err);
    } else {
      return res.json(users);
    }
  });
};

const userList = (req, res, next) => {
  const filtro = req.body.filtro;
  const query = {};
  if (filtro && filtro.nome) {
    query["name"] = { $regex: `${filtro.nome}` };
  }
  User.find(query, { _id: 1, name: 1, comunidade: 1 }, (err, users) => {
    if (err) {
      return sendErrorsFromDB(res, err);
    } else {
      return res.json(users);
    }
  });
};

const atualizarUsuario = (req, res, next) => {
  const dadosUsuario = req.body;
  const id = dadosUsuario._id;
  delete dadosUsuario._id;
  const usuario = req.decoded._id;
  User.findById(usuario, (err, usr) => {
    if (err) {
      return res.status(400).json(err);
    } else if (!validar(usr)) {
      return res
        .status(403)
        .json({ errors: ["Você não tem permissão para fazer isso"] });
    } else {
      User.findById(id, (err, user) => {
        if (err) {
          console.log(err);
          return sendErrorsFromDB(res, err);
        } else {
          user.bd = dadosUsuario.bd;
          user.comunidade = dadosUsuario.comunidade;
          user.hierarquia = dadosUsuario.hierarquia;
          user.ativo = dadosUsuario.ativo;
          user.name = dadosUsuario.name;
          user.coordenaEquipe = dadosUsuario.coordenaEquipe;
          if (dadosUsuario.equipe != user.equipe) {
            Equipe.updateOne(
              { _id: dadosUsuario.equipe },
              { $push: { membros: id } },
              (err, upd) => {
                if (err) {
                  return res.status(400).json(err);
                } else if (user.equipe) {
                  Equipe.updateOne(
                    { _id: user.equipe },
                    { $pull: { membros: id } },
                    (err, upd) => {
                      if (err) {
                        return res.status(400).json(err);
                      }
                      user.cargo = null;
                      user.equipe = dadosUsuario.equipe;
                      userSave(user, res);
                    }
                  );
                } else {
                  user.equipe = dadosUsuario.equipe;
                  userSave(user, res);
                }
              }
            );
          } else {
            userSave(user, res);
          }
        }
      });
    }
  });
};

const userSave = (user, res) => {
  user.save((erro, u) => {
    if (erro) {
      console.log(erro);
    } else {
      return res.status(200).json("ok");
    }
  });
};
var DIR = "uploads/avatar";

const atualizarAvatar = (req, res, next) => {
  console.log(req.params);
  const filename = req.decoded._id;
  var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, DIR);
    },
    filename: function (req, file, cb) {
      cb(null, filename + '.JPG'
        // + "." + file.originalname.split(".")[1]
        );
    },
  });
  const upload = multer({ storage: storage }).single("file");
  upload(req, res, function (err) {
    if (err) {
      return res.json({ err: err.toString() });
    }
    return res.json({ ok: "File is uploaded" });
  });
};
const path = require('path')

obterAvatar = (req, res, next) => {
  return res.sendFile(req.decoded._id + '.JPG', {
    root: path.join(__dirname, "../../../uploads/avatar"),
  });
};

const atualizarUsuarioLogado = (req, res, next) => {
  const dadosUsuario = req.body;
  const id = req.decoded._id;
  User.findById(id, (err, user) => {
    if (err) {
      console.log(err);
      return sendErrorsFromDB(res, err);
    } else if (!user) {
      return res.status(403).json({ errors: ["Usuário não encontrado"] });
    } else {
      user.bd = dadosUsuario.bd;
      user.name = dadosUsuario.name;
      if (dadosUsuario.mudarSenha) {
        if (!dadosUsuario.password) {
          return res.status(400).send({ errors: ["Senha é obrigatório"] });
        }
        if (!dadosUsuario.password_confirm) {
          return res
            .status(400)
            .send({ errors: ["Confirmação de senha é obrigatório"] });
        }
        if (!dadosUsuario.password.match(passwordRegex)) {
          return res.status(400).send({
            errors: [
              "Senha precisar ter: uma letra maiúscula, uma letra minúscula, um número, uma caractere especial(@#$%) e tamanho entre 6-20.",
            ],
          });
        }

        const salt = bcrypt.genSaltSync();
        const passwordHash = bcrypt.hashSync(dadosUsuario.password, salt);
        if (!bcrypt.compareSync(dadosUsuario.password_confirm, passwordHash)) {
          return res.status(400).send({ errors: ["Senhas não conferem."] });
        }
        user.password = passwordHash;
      }
      user.save((erro, u) => {
        if (erro) {
          console.log(erro);
        } else {
          return res.status(200).json("ok");
        }
      });
    }
  });
};

const findById = (req, res, next) => {
  const usuario = req.decoded._id;
  User.findById(usuario, (err, usr) => {
    if (err) {
      return sendErrorsFromDB(res, err);
    } else if (!validar(usr)) {
      return res
        .status(403)
        .json({ errors: ["Você não tem permissão para fazer isso"] });
    } else {
      User.findById(
        req.body.id,
        {
          _id: 1,
          name: 1,
          bd: 1,
          email: 1,
          comunidade: 1,
          equipe: 1,
          hierarquia: 1,
          ativo: 1,
          tolkenConvite: 1,
          paroquia: 1,
          passagem: 1,
        },
        (err, user) => {
          if (err) {
            return sendErrorsFromDB(res, err);
          } else {
            return res.json(user);
          }
        }
      );
    }
  });
};

const login = (req, res, next) => {
  const email = req.body.email || "";
  const password = req.body.password || "";
  User.findOne({ email }, (err, user) => {
    if (err) {
      return sendErrorsFromDB(res, err);
    } else if (user && bcrypt.compareSync(password, user.password)) {
      const token = jwt.sign(user.toJSON(), env.authSecret, {
        expiresIn: "1 day",
      });
      const { name, email } = user;
      return res.json({ name, email, token });
    } else {
      return res.status(400).send({ errors: ["Usuário/Senha inválidos"] });
    }
  });
};
const validaTelaNotUserComum = (req, res, next) => {
  const usuario = req.decoded._id;
  User.findById(usuario, (err, usr) => {
    if (err) {
    } else {
      return usr.hierarquia !== "OUTROS"
        ? res.status(200).json({ autorizado: true })
        : res.status(403).json({ autorizado: false });
    }
  });
};

const validateToken = (req, res, next) => {
  const token = req.body.token || "";
  jwt.verify(token, env.authSecret, function (err, decoded) {
    return res.status(200).send({ valid: !err });
  });
};

const signup = (req, res, next) => {
  const name = req.body.name || "";
  const email = req.body.email || "";
  const password = req.body.password || "";
  const confirmPassword = req.body.confirm_password || "";
  const conviteId = req.body.conviteId;

  if (!email.match(emailRegex)) {
    return res
      .status(400)
      .send({ errors: ["O e-mail informado está inválido"] });
  }
  if (!password.match(passwordRegex)) {
    return res.status(400).send({
      errors: [
        "Senha precisar ter: uma letra maiúscula, uma letra minúscula, um número, uma caractere especial(@#$%) e tamanho entre 6-20.",
      ],
    });
  }

  const salt = bcrypt.genSaltSync();
  const passwordHash = bcrypt.hashSync(password, salt);
  if (!bcrypt.compareSync(confirmPassword, passwordHash)) {
    return res.status(400).send({ errors: ["Senhas não conferem."] });
  }
  const newUser = new User({ name, email, password: passwordHash });
  User.find({}, (err, usr) => {
    if (err) {
      return sendErrorsFromDB(res, err);
    } else if (usr && usr.length) {
      if (!conviteId) {
        return res
          .status(400)
          .send({ errors: ["O Id do convite é obrigatório"] });
      }
      User.findOne({ email }, (err, user) => {
        if (err) {
          return sendErrorsFromDB(res, err);
        } else if (user) {
          return res.status(400).send({ errors: ["Usuário já cadastrado."] });
        } else {
          UsuarioConvidado.findOne(
            { _id: conviteId, email },
            (err, convite) => {
              if (err) {
                return sendErrorsFromDB(res, err);
              } else if (!convite) {
                return res
                  .status(400)
                  .send({ errors: ["Convite não encontrado"] });
              } else {
                newUser.hierarquia = convite.hierarquia;
                newUser.save((err) => {
                  if (err) {
                    return sendErrorsFromDB(res, err);
                  } else {
                    UsuarioConvidado.findByIdAndDelete(convite._id).exec(
                      (err) => {
                        if (err) {
                          console.log(err);
                        }
                        login(req, res, next);
                      }
                    );
                  }
                });
              }
            }
          );
        }
      });
    } else {
      signUpAdmin(newUser, res, next);
    }
  });
};

const validarTelasDeGestao = (req, res, next) => {
  const usuario = req.decoded._id;
  User.findById(usuario, (err, usr) => {
    if (err) {
    } else {
      return validar(usr)
        ? res.status(200).json({ autorizado: true })
        : res.status(403).json({ autorizado: false });
    }
  });
};

const validar = (usr) => {
  return (
    usr.hierarquia === "REITOR" ||
    usr.hierarquia === "CONSELHO_GESTOR" ||
    usr.equipe === "REDES_SOCIAIS"
  );
};

const seminaristasAtivosAutocomplete = (req, res, next) => {
  User.find(
    {
      hierarquia: "SEMINARISTA",
      ativo: true,
      name: { $regex: `${req.body.q}`, $options: "i" },
    },
    { _id: 1, name: 1 },
    (err, usrs) => {
      if (err) {
        return res.status(400);
      } else {
        return res.json(usrs);
      }
    }
  );
};

const signUpAdmin = (newUser, res, next) => {
  newUser.save((err) => {
    if (err) {
      return sendErrorsFromDB(res, err);
    } else {
      login(req, res, next);
    }
  });
};
const semPassListagem = (req, res, next) => {
  const { q } = req.body;
  const query = { hierarquia: "SEMINARISTA", ativo: true };
  if (q) {
    query["name"] = { $regex: `${q}`, $options: "i" };
  }
  User.find(query, { _id: 1, name: 1, passagem: 1, paroquia: 1, comunidade: 1 })
    .sort("name")
    .exec((err, seminaristas) => {
      if (err) {
        sendErrorsFromDB(err);
      }
      return res.json(seminaristas);
    });
};

const semPassAlterar = (req, res, next) => {
  const { id, passagem, paroquia } = req.body;
  if (!id) {
    return res.status(400).json({ errors: ["ID é obrigatório"] });
  }

  if (passagem < 0) {
    return res
      .status(400)
      .json({ errors: ["Valor da passagem não pode ser negativo"] });
  }

  if (!paroquia) {
    return res.status(400).json({ errors: ["Paróquia é obrigatório"] });
  }

  User.updateOne({ _id: id }, { $set: { passagem, paroquia } }, (err, upd) => {
    if (err) {
      sendErrorsFromDB(err);
    }
    return res.json(upd);
  });
};

const menuAdmin = (req, res, next) => {
  const usuario = req.decoded._id;
  const menu = {
    usuario: false,
    produtos: false,
    solicitacoes: false,
    partilha: false,
    listaEquipe: false,
    minhaEquipe: false,
    partilha: false,
  };
  User.findById(usuario)
    .populate({
      path: "cargo",
      populate: {
        path: "permissoes",
      },
    })
    .populate("equipe")
    .exec((err, usr) => {
      let menus = [
        {
          title: "Dashboard",
          icon: "text-outline",
          link: "/pages/dashboard",
          home: true,
        },
        {
          title: "Partilha Solidária",
          icon: "gift-outline",
          link: "/pages/partilha-solidaria/lista",
        },
        {
          title: "Minhas solicitações",
          icon: "cube-outline",
          link: "/pages/solicitacao-produto",
        },
        {
          title: "Escalas",
          icon: "briefcase-outline",
          link: "/pages/escalas",
        },
        {
          title: "Calendário",
          icon: "calendar-outline",
          link: "/pages/dashboard",
        },
      ];
      if (err) {
      } else {
        switch (usr.hierarquia) {
          case "REITOR":
          case "FORMADOR":
            menu.usuario = true;
            menu.produtos = true;
            menu.solicitacoes = true;
            menu.partilha = true;
            menu.listaEquipe = true;
            menu.partilha = true;
            break;
          case "CONSELHO_GESTOR":
            menu.usuario = true;
            menu.produtos = true;
            menu.solicitacoes = true;
            menu.partilha = false;
            menu.listaEquipe = false;
            menu.partilha = true;
            break;
          case "SEMINARISTA":
            if (usr.equipe) {
              if (usr.coordenaEquipe) {
                menu.minhaEquipe = true;
              }
              if (usr.equipe.role === "PRODUTO") {
                menu.solicitacoes = true;
              }
            }
            break;
          case "OUTROS":
            menus = menus.filter(
              (it) =>
                it.title === "Minhas solicitações" || it.title === "Dashboard"
            );
            console.log(menus);
            break;
        }
        if (Object.values(menu).some((it) => it)) {
          const children = [];
          if (menu.usuario) {
            children.push({
              title: "Usuários",
              icon: "person-outline",
              link: "/pages/admin/usuarios",
            });
          }
          if (menu.produtos) {
            children.push({
              title: "Produtos",
              icon: "cube-outline",
              link: "/pages/admin/produto",
            });
          }
          if (menu.solicitacoes) {
            children.push({
              title: "Solicitações",
              icon: "list-outline",
              link: "/pages/admin/solicitacoes",
            });
          }
          if (menu.minhaEquipe) {
            children.push({
              title: "Minha equipe",
              icon: "people-outline",
              link: "/pages/admin/equipe/editar/minha-equipe",
            });
          }
          if (menu.listaEquipe) {
            children.push({
              title: "Equipes",
              icon: "people-outline",
              link: "/pages/admin/equipe/lista",
            });
          }
          if (menu.partilha) {
            children.push({
              title: "Partilha Solidária",
              icon: "gift-outline",
              children: [
                {
                  title: "Gestão",
                  link: "/pages/admin/partilha",
                  icon: "gift-outline",
                },
                {
                  title: "Relatório",
                  link: "/pages/admin/partilha",
                  icon: "gift-outline",
                },
                {
                  title: "Passagens",
                  link: "/pages/admin/partilha/passagem",
                  icon: "gift-outline",
                },
                {
                  title: "Adiantamentos",
                  link: "/pages/admin/partilha/adiantamento/lista",
                  icon: "gift-outline",
                },
              ],
            });
          }
          menus.push({
            title: "Administração",
            icon: "lock-outline",
            children,
          });
          return res.json({
            menu: menus,
          });
        } else {
          return res.json({ menu: menus });
        }
      }
    });
};

module.exports = {
  validaTelaNotUserComum,
  validarTelasDeGestao,
  login,
  signup,
  validateToken,
  usuariosSelect,
  userList,
  findById,
  atualizarUsuario,
  usuarioLogado,
  menuAdmin,
  atualizarUsuarioLogado,
  seminaristasAtivosAutocomplete,
  semPassListagem,
  semPassAlterar,
  atualizarAvatar,
  obterAvatar
};
