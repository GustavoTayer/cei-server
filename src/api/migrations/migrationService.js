const Migration = require("./migration");
const User = require("../user/user");
const Equipe = require("../equipe/equipe");
const Caixa = require("../caixa/caixa");
const PermissoesEquipe = require("../equipe_permissoes/equipe-permissao");
const Count = require("../count/count");

const bcrypt = require("bcrypt");

const atualizarEquipe = () => {
  Migration.find({ nome: "atualizarEquipe" }, (err, mig) => {
    if (!mig || !mig.length) {
      User.updateMany({}, { equipe: null }, (err, up) => {
        const m = new Migration({ nome: "atualizarEquipe" });
        m.save((err) => {
          console.log(err || "Usuario equipe atualizado");
        });
      });
    }
  });
};

const gerarCaixaPartilha = () => {
  const migrat = "PARTILHA_SOLIDARIA_CAIXA"
  Migration.find({ nome: migrat }, (err, mig) => {
    if (!mig || !mig.length) {
      new Caixa({
        nome: "PARTILHA_SOLIDARIA",
        valor: 0,
      }).save((err) => {
        if (err) {
          console.log(err);
        } else {
          new Migration({ nome: migrat }).save((err) => {
            console.log(err || `${migrat} criado`);
          });
        }
      });;
    }
  });
};

const criarEquipeBolo = () => {
  Migration.find({ nome: "criarEquipeBolo" }, (err, mig) => {
    if (!mig || !mig.length) {
      new Equipe({
        nome: "Bolo",
        descricao:
          "Lida com toda a gestão de venda e produção dos produtos do convivium Emaús",
        role: "PRODUTO",
      }).save((err, equipe) => {
        if (err) {
          console.log(err);
        } else {
          const permissoes = [
            {
              nome: "ALTERAR_STATUS_PAGO",
              descricao: "Altera status para Pago",
              equipe: equipe._id,
            },
            {
              nome: "VER_RELATORIO",
              descricao: "Tem acesso à pagina de relatórios",
              equipe: equipe._id,
            },
            {
              nome: "ALTERAR_STATUS_PRODUZINDO",
              descricao: "Altera status para Produzindo",
              equipe: equipe._id,
            },
            {
              nome: "ALTERAR_STATUS_ENTREGUE",
              descricao: "Altera status para Entregue",
              equipe: equipe._id,
            },
            {
              nome: "APROVA_CANCELAMENTO",
              descricao: "Pode aprovar solicitação de cancelamento",
              equipe: equipe._id,
            },
          ];
          PermissoesEquipe.insertMany(permissoes, (err, permissoes) => {
            if (err) {
              console.log(err);
            } else {
              equipe.permissoes = permissoes.map((it) => it._id);
              equipe.save((err, eqp) => {
                if (err) {
                  console.log(err);
                } else {
                  console.log("Equipe Criada");
                  new Migration({ nome: "criarEquipeBolo" }).save((err) => {
                    console.log(err || "Migration criarEquipeBolo criado!");
                  });
                }
              });
            }
          });
        }
      });
    }
  });
};

const criarUsuarioAdmin = () => {
  Migration.find({ nome: "criarUsuarioAdmin" }, (err, mig) => {
    if (!mig || !mig.length) {
      User.find({}, (err, usr) => {
        if (!usr.length) {
          const name = "Admin";
          const email = "admin@admin.com";
          const password = "Aa@123";
          const salt = bcrypt.genSaltSync();
          const passwordHash = bcrypt.hashSync(password, salt);
          new User({ name, email, password: passwordHash }).save((err) => {
            if (err) {
              console.log(err);
            } else {
              new Migration({ nome: "criarUsuarioAdmin" }).save((err) => {
                console.log(err || "Usuário admin criado");
              });
            }
          });
        }
      });
    }
  });
};

const criarCount = (nome) => {
  const migrat = `${nome}_COUNT`
  Migration.find({ nome: migrat }, (err, mig) => {
    if (!mig || !mig.length) {
      new Count({ nome }).save((err) => {
        if (err) {
          console.log(err);
        } else {
          new Migration({ nome: migrat }).save((err) => {
            console.log(err || `${migrat} criado`);
          });
        }
      });
    }
  })

};

module.exports = {
  atualizarEquipe,
  criarUsuarioAdmin,
  criarEquipeBolo,
  gerarCaixaPartilha,
  criarCount
};
