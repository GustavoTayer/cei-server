(window.webpackJsonp=window.webpackJsonp||[]).push([[13],{dLU1:function(t,n,o){"use strict";o.d(n,"a",(function(){return i}));var e=o("/h9T"),r=o("/Tr7"),a=o("jIYg");function c(t){Object(a.a)(1,arguments);var n=Object(r.a)(t),o=n.getFullYear(),e=n.getMonth(),c=new Date(0);return c.setFullYear(o,e+1,0),c.setHours(0,0,0,0),c.getDate()}function i(t,n){Object(a.a)(2,arguments);var o=Object(r.a)(t),i=Object(e.a)(n),b=o.getMonth()+i,s=new Date(0);s.setFullYear(o.getFullYear(),b,1),s.setHours(0,0,0,0);var u=c(s);return o.setMonth(b,Math.min(u,o.getDate())),o}},vI6V:function(t,n,o){"use strict";o.d(n,"d",(function(){return e})),o.d(n,"a",(function(){return r})),o.d(n,"b",(function(){return a})),o.d(n,"c",(function(){return c}));var e=function(t){return t.ABERTO="Aberto",t.PRODUZINDO="Produzindo",t.ENTREGUE="Entregue",t.PAGO="Pago",t.CANCELADO="Cancelado",t.SLC_CANCELAMENTO="Slc. Canc.",t}({}),r=function(t){return t.PROPEDEUTICO="Proped\xeautico",t.FILOSOFIA="Filosofia",t.TEOLOGIA="Teologia",t.TIROCINIO="Tiroc\xednio",t}({}),a=function(t){return t.SEMINARISTA="Seminarista",t.FORMADOR="Formador",t.REITOR="Reitor",t.CONSELHO_GESTOR="Conselho Gestor",t.OUTROS="Outros",t}({}),c=function(t){return t.EM_ANALISE="Em an\xe1lise",t.CORRECAO="Solicitado corre\xe7\xe3o",t.APROVADO="Aprovado",t.DEPOSITADO="Depositado",t}({})},z3YT:function(t,n,o){"use strict";o.r(n),o.d(n,"ListagemModule",(function(){return h}));var e=o("ofXK"),r=o("tyNb"),a=o("zeoc"),c=o("sWYD"),i=o("vI6V"),b=o("lKi6"),s=o("3+or"),u=o("fXoL"),l=o("aceb");function d(t,n){1&t&&(u.Yb(0,"nb-card"),u.Yb(1,"nb-card-header"),u.Jc(2,"Voc\xea ainda n\xe3o enviou comprovante esse ano"),u.Xb(),u.Xb())}const p=function(t){return["/pages/partilha-solidaria/editar/",t]};function f(t,n){if(1&t&&(u.Yb(0,"button",15),u.Tb(1,"nb-icon",16),u.Xb()),2&t){const t=u.kc().$implicit;u.rc("routerLink",u.uc(1,p,t._id))}}function m(t,n){if(1&t){const t=u.Zb();u.Yb(0,"nb-card",5),u.Yb(1,"nb-card-header"),u.Yb(2,"span",6),u.Jc(3),u.Xb(),u.Yb(4,"span",6),u.Jc(5," - "),u.Xb(),u.Yb(6,"span"),u.Jc(7),u.Xb(),u.Xb(),u.Yb(8,"nb-card-body"),u.Yb(9,"div",7),u.Yb(10,"div",8),u.Yb(11,"label",9),u.Jc(12,"Data prevista de deposito:"),u.Xb(),u.Yb(13,"div",10),u.Yb(14,"b"),u.Jc(15),u.Xb(),u.Xb(),u.Xb(),u.Yb(16,"div",8),u.Yb(17,"label",11),u.Jc(18,"Data deposito:"),u.Xb(),u.Yb(19,"div",10),u.Yb(20,"b"),u.Jc(21),u.Xb(),u.Xb(),u.Xb(),u.Yb(22,"div",8),u.Yb(23,"label",11),u.Jc(24,"Valor comprovante:"),u.Xb(),u.Yb(25,"div",10),u.Yb(26,"b"),u.Jc(27),u.lc(28,"currency"),u.Xb(),u.Xb(),u.Xb(),u.Yb(29,"div",8),u.Yb(30,"label",11),u.Jc(31,"Valor depositado: "),u.Xb(),u.Yb(32,"div",10),u.Yb(33,"b"),u.Jc(34),u.lc(35,"currency"),u.Xb(),u.Xb(),u.Xb(),u.Xb(),u.Xb(),u.Yb(36,"nb-card-footer"),u.Yb(37,"button",12),u.gc("click",(function(){u.Bc(t);const o=n.$implicit;return u.kc(2).downloadComprovante(o)})),u.Tb(38,"nb-icon",13),u.Xb(),u.Hc(39,f,2,3,"button",14),u.Xb(),u.Xb()}if(2&t){const t=n.$implicit,o=u.kc(2);u.rc("accent",o.obterStatusCard(t.status)),u.Fb(3),u.Lc(" ",o.mes(t.mes)," "),u.Fb(4),u.Lc(" ",o.obterStatus(t.status)," "),u.Fb(8),u.Kc(o.formataData(t.dataPrevistaRecebimento)),u.Fb(6),u.Kc(t.dataDeposito?o.formataData(t.dataDeposito):"-"),u.Fb(6),u.Kc(u.nc(28,8,t.valorComprovante,"BRL")),u.Fb(7),u.Kc(t.valorDepositado?u.nc(35,11,t.valorDepositado,"BRL"):"-"),u.Fb(5),u.rc("ngIf",o.correcao(t.status))}}function O(t,n){if(1&t&&u.Hc(0,m,40,14,"nb-card",4),2&t){const t=u.kc();u.rc("ngForOf",t.comprovantes)}}const g=[{path:"",component:(()=>{class t extends s.a{constructor(t){super(),this.partilhaService=t}ngOnInit(){this.subs.sink=this.partilhaService.lista().subscribe(t=>this.comprovantes=t||[])}buscar(){this.subs.sink=this.partilhaService.lista().subscribe(t=>this.comprovantes=t||[])}formataData(t){return Object(c.a)(new Date(t),"dd/MM/yyyy")}obterStatus(t){return i.c[t]}mes(t){return Object(b.a)(t).mes}obterStatusCard(t){switch(t){case"APROVADO":case"DEPOSITADO":return"success";case"CORRECAO":return"danger";case"EM_ANALISE":return"warning"}}teste(){this.partilhaService.teste().subscribe(t=>console.log(t))}correcao(t){return i.c[t]===i.c.CORRECAO||i.c[t]===i.c.EM_ANALISE}downloadComprovante(t){this.partilhaService.obterArquivoComprovante(t)}}return t.\u0275fac=function(n){return new(n||t)(u.Sb(a.a))},t.\u0275cmp=u.Mb({type:t,selectors:[["ngx-listagem"]],features:[u.Cb],decls:8,vars:2,consts:[["nbButton","","status","primary","routerLink","/pages/partilha-solidaria/editar/novo","nbTooltip","Enviar comprovante","nbTooltipStatus","success",2,"margin-left","10px"],["icon","plus-outline"],[4,"ngIf","ngIfElse"],["list",""],[3,"accent",4,"ngFor","ngForOf"],[3,"accent"],[2,"margin-right","5px"],[1,"form-group","row"],[1,"form-group","col-md-3","col-6"],[1,"label",2,"margin-right","5px"],[2,"width","100%"],[1,"label"],["nbButton","","status","info","hero","","nbTooltip","Ver documento","nbTooltipStatus","info",2,"margin-right","5px",3,"click"],["icon","eye-outline"],["nbButton","","status","danger","hero","","nbTooltip","Corrigir comprovante","nbTooltipStatus","primary",3,"routerLink",4,"ngIf"],["nbButton","","status","danger","hero","","nbTooltip","Corrigir comprovante","nbTooltipStatus","primary",3,"routerLink"],["icon","edit-2-outline"]],template:function(t,n){if(1&t&&(u.Yb(0,"nb-card"),u.Yb(1,"nb-card-header"),u.Jc(2,"Partilha solid\xe1ria "),u.Yb(3,"button",0),u.Tb(4,"nb-icon",1),u.Xb(),u.Xb(),u.Xb(),u.Hc(5,d,3,0,"nb-card",2),u.Hc(6,O,1,1,"ng-template",null,3,u.Ic)),2&t){const t=u.yc(7);u.Fb(5),u.rc("ngIf",!n.comprovantes||!n.comprovantes.length)("ngIfElse",t)}},directives:[l.x,l.A,l.t,r.d,l.Bb,l.P,e.n,e.m,l.w,l.y],pipes:[e.d],styles:[".item[_ngcontent-%COMP%]{display:-webkit-box;display:flex;-webkit-box-pack:justify;justify-content:space-between}.item[_ngcontent-%COMP%] > *[_ngcontent-%COMP%]{-webkit-box-flex:1;flex:1}.item[_ngcontent-%COMP%]:first-child{border-top:none}"]}),t})()}];let v=(()=>{class t{}return t.\u0275mod=u.Qb({type:t}),t.\u0275inj=u.Pb({factory:function(n){return new(n||t)},imports:[[r.g.forChild(g)],r.g]}),t})(),h=(()=>{class t{}return t.\u0275mod=u.Qb({type:t}),t.\u0275inj=u.Pb({factory:function(n){return new(n||t)},imports:[[e.c,v,l.db,l.B,l.u,l.R,l.Cb]]}),t})()}}]);