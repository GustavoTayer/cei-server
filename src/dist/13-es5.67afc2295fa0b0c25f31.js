function _classCallCheck(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function _defineProperties(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function _createClass(t,e,n){return e&&_defineProperties(t.prototype,e),n&&_defineProperties(t,n),t}function _inherits(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&_setPrototypeOf(t,e)}function _setPrototypeOf(t,e){return(_setPrototypeOf=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function _createSuper(t){return function(){var e,n=_getPrototypeOf(t);if(_isNativeReflectConstruct()){var r=_getPrototypeOf(this).constructor;e=Reflect.construct(n,arguments,r)}else e=n.apply(this,arguments);return _possibleConstructorReturn(this,e)}}function _possibleConstructorReturn(t,e){return!e||"object"!=typeof e&&"function"!=typeof e?_assertThisInitialized(t):e}function _assertThisInitialized(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function _isNativeReflectConstruct(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}function _getPrototypeOf(t){return(_getPrototypeOf=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}(window.webpackJsonp=window.webpackJsonp||[]).push([[13],{dLU1:function(t,e,n){"use strict";n.d(e,"a",(function(){return a}));var r=n("/h9T"),o=n("/Tr7"),i=n("jIYg");function c(t){Object(i.a)(1,arguments);var e=Object(o.a)(t),n=e.getFullYear(),r=e.getMonth(),c=new Date(0);return c.setFullYear(n,r+1,0),c.setHours(0,0,0,0),c.getDate()}function a(t,e){Object(i.a)(2,arguments);var n=Object(o.a)(t),a=Object(r.a)(e),u=n.getMonth()+a,s=new Date(0);s.setFullYear(n.getFullYear(),u,1),s.setHours(0,0,0,0);var b=c(s);return n.setMonth(u,Math.min(b,n.getDate())),n}},vI6V:function(t,e,n){"use strict";n.d(e,"d",(function(){return r})),n.d(e,"a",(function(){return o})),n.d(e,"b",(function(){return i})),n.d(e,"c",(function(){return c}));var r=function(t){return t.ABERTO="Aberto",t.PRODUZINDO="Produzindo",t.ENTREGUE="Entregue",t.PAGO="Pago",t.CANCELADO="Cancelado",t.SLC_CANCELAMENTO="Slc. Canc.",t}({}),o=function(t){return t.PROPEDEUTICO="Proped\xeautico",t.FILOSOFIA="Filosofia",t.TEOLOGIA="Teologia",t.TIROCINIO="Tiroc\xednio",t}({}),i=function(t){return t.SEMINARISTA="Seminarista",t.FORMADOR="Formador",t.REITOR="Reitor",t.CONSELHO_GESTOR="Conselho Gestor",t.OUTROS="Outros",t}({}),c=function(t){return t.EM_ANALISE="Em an\xe1lise",t.CORRECAO="Solicitado corre\xe7\xe3o",t.APROVADO="Aprovado",t.DEPOSITADO="Depositado",t}({})},z3YT:function(t,e,n){"use strict";n.r(e),n.d(e,"ListagemModule",(function(){return _}));var r=n("ofXK"),o=n("tyNb"),i=n("zeoc"),c=n("sWYD"),a=n("vI6V"),u=n("lKi6"),s=n("3+or"),b=n("fXoL"),l=n("aceb");function f(t,e){1&t&&(b.Yb(0,"nb-card"),b.Yb(1,"nb-card-header"),b.Jc(2,"Voc\xea ainda n\xe3o enviou comprovante esse ano"),b.Xb(),b.Xb())}var p=function(t){return["/pages/partilha-solidaria/editar/",t]};function d(t,e){if(1&t&&(b.Yb(0,"button",16),b.Tb(1,"nb-icon",17),b.Xb()),2&t){var n=b.kc().$implicit;b.rc("routerLink",b.uc(1,p,n._id))}}function v(t,e){if(1&t){var n=b.Zb();b.Yb(0,"nb-card",6),b.Yb(1,"nb-card-header"),b.Yb(2,"span",7),b.Jc(3),b.Xb(),b.Yb(4,"span",7),b.Jc(5," - "),b.Xb(),b.Yb(6,"span"),b.Jc(7),b.Xb(),b.Xb(),b.Yb(8,"nb-card-body"),b.Yb(9,"div",8),b.Yb(10,"div",9),b.Yb(11,"label",10),b.Jc(12,"Data prevista de deposito:"),b.Xb(),b.Yb(13,"div",11),b.Yb(14,"b"),b.Jc(15),b.Xb(),b.Xb(),b.Xb(),b.Yb(16,"div",9),b.Yb(17,"label",12),b.Jc(18,"Data deposito:"),b.Xb(),b.Yb(19,"div",11),b.Yb(20,"b"),b.Jc(21),b.Xb(),b.Xb(),b.Xb(),b.Yb(22,"div",9),b.Yb(23,"label",12),b.Jc(24,"Valor comprovante:"),b.Xb(),b.Yb(25,"div",11),b.Yb(26,"b"),b.Jc(27),b.lc(28,"currency"),b.Xb(),b.Xb(),b.Xb(),b.Yb(29,"div",9),b.Yb(30,"label",12),b.Jc(31,"Valor depositado: "),b.Xb(),b.Yb(32,"div",11),b.Yb(33,"b"),b.Jc(34),b.lc(35,"currency"),b.Xb(),b.Xb(),b.Xb(),b.Xb(),b.Xb(),b.Yb(36,"nb-card-footer"),b.Yb(37,"button",13),b.gc("click",(function(){b.Bc(n);var t=e.$implicit;return b.kc(2).downloadComprovante(t)})),b.Tb(38,"nb-icon",14),b.Xb(),b.Hc(39,d,2,3,"button",15),b.Xb(),b.Xb()}if(2&t){var r=e.$implicit,o=b.kc(2);b.rc("accent",o.obterStatusCard(r.status)),b.Fb(3),b.Lc(" ",o.mes(r.mes)," "),b.Fb(4),b.Lc(" ",o.obterStatus(r.status)," "),b.Fb(8),b.Kc(o.formataData(r.dataPrevistaRecebimento)),b.Fb(6),b.Kc(r.dataDeposito?o.formataData(r.dataDeposito):"-"),b.Fb(6),b.Kc(b.nc(28,8,r.valorComprovante,"BRL")),b.Fb(7),b.Kc(r.valorDepositado?b.nc(35,11,r.valorDepositado,"BRL"):"-"),b.Fb(5),b.rc("ngIf",o.correcao(r.status))}}function O(t,e){if(1&t&&b.Hc(0,v,40,14,"nb-card",5),2&t){var n=b.kc();b.rc("ngForOf",n.comprovantes)}}var h,g,m,y=[{path:"",component:(h=function(t){_inherits(n,t);var e=_createSuper(n);function n(t){var r;return _classCallCheck(this,n),(r=e.call(this)).partilhaService=t,r}return _createClass(n,[{key:"ngOnInit",value:function(){var t=this;this.subs.sink=this.partilhaService.lista().subscribe((function(e){return t.comprovantes=e||[]}))}},{key:"buscar",value:function(){var t=this;this.subs.sink=this.partilhaService.lista().subscribe((function(e){return t.comprovantes=e||[]}))}},{key:"formataData",value:function(t){return Object(c.a)(new Date(t),"dd/MM/yyyy")}},{key:"obterStatus",value:function(t){return a.c[t]}},{key:"mes",value:function(t){return Object(u.a)(t).mes}},{key:"obterStatusCard",value:function(t){switch(t){case"APROVADO":case"DEPOSITADO":return"success";case"CORRECAO":return"danger";case"EM_ANALISE":return"warning"}}},{key:"teste",value:function(){this.partilhaService.teste().subscribe((function(t){return console.log(t)}))}},{key:"correcao",value:function(t){return a.c[t]===a.c.CORRECAO||a.c[t]===a.c.EM_ANALISE}},{key:"downloadComprovante",value:function(t){this.partilhaService.obterArquivoComprovante(t)}}]),n}(s.a),h.\u0275fac=function(t){return new(t||h)(b.Sb(i.a))},h.\u0275cmp=b.Mb({type:h,selectors:[["ngx-listagem"]],features:[b.Cb],decls:10,vars:2,consts:[["nbButton","","status","primary","routerLink","/pages/partilha-solidaria/editar/novo","nbTooltip","Enviar comprovante","nbTooltipStatus","success",2,"margin-left","10px"],["icon","plus-outline"],["nbButton","","status","primary","nbTooltip","Enviar comprovante","nbTooltipStatus","success",2,"margin-left","10px",3,"click"],[4,"ngIf","ngIfElse"],["list",""],[3,"accent",4,"ngFor","ngForOf"],[3,"accent"],[2,"margin-right","5px"],[1,"form-group","row"],[1,"form-group","col-md-3","col-6"],[1,"label",2,"margin-right","5px"],[2,"width","100%"],[1,"label"],["nbButton","","status","info","hero","","nbTooltip","Ver documento","nbTooltipStatus","info",2,"margin-right","5px",3,"click"],["icon","eye-outline"],["nbButton","","status","danger","hero","","nbTooltip","Corrigir comprovante","nbTooltipStatus","primary",3,"routerLink",4,"ngIf"],["nbButton","","status","danger","hero","","nbTooltip","Corrigir comprovante","nbTooltipStatus","primary",3,"routerLink"],["icon","edit-2-outline"]],template:function(t,e){if(1&t&&(b.Yb(0,"nb-card"),b.Yb(1,"nb-card-header"),b.Jc(2,"Partilha solid\xe1ria "),b.Yb(3,"button",0),b.Tb(4,"nb-icon",1),b.Xb(),b.Yb(5,"button",2),b.gc("click",(function(){return e.teste()})),b.Tb(6,"nb-icon",1),b.Xb(),b.Xb(),b.Xb(),b.Hc(7,f,3,0,"nb-card",3),b.Hc(8,O,1,1,"ng-template",null,4,b.Ic)),2&t){var n=b.yc(9);b.Fb(7),b.rc("ngIf",!e.comprovantes||!e.comprovantes.length)("ngIfElse",n)}},directives:[l.x,l.A,l.t,o.d,l.Bb,l.P,r.n,r.m,l.w,l.y],pipes:[r.d],styles:[".item[_ngcontent-%COMP%]{display:-webkit-box;display:flex;-webkit-box-pack:justify;justify-content:space-between}.item[_ngcontent-%COMP%] > *[_ngcontent-%COMP%]{-webkit-box-flex:1;flex:1}.item[_ngcontent-%COMP%]:first-child{border-top:none}"]}),h)}],C=((m=function t(){_classCallCheck(this,t)}).\u0275mod=b.Qb({type:m}),m.\u0275inj=b.Pb({factory:function(t){return new(t||m)},imports:[[o.g.forChild(y)],o.g]}),m),_=((g=function t(){_classCallCheck(this,t)}).\u0275mod=b.Qb({type:g}),g.\u0275inj=b.Pb({factory:function(t){return new(t||g)},imports:[[r.c,C,l.db,l.B,l.u,l.R,l.Cb]]}),g)}}]);