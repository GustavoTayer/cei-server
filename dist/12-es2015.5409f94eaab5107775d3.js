(window.webpackJsonp=window.webpackJsonp||[]).push([[12],{"V+fO":function(e,i,r){"use strict";r.r(i),r.d(i,"EditarEquipeModule",(function(){return A}));var o=r("ofXK"),t=r("tyNb"),n=r("esi0"),c=r("3Pt+"),a=r("JX91"),b=r("lJxs"),s=r("LRne"),u=r("vI6V"),d=r("fXoL"),l=r("aceb");let p=(()=>{class e{constructor(e){this.ref=e}ngOnInit(){}cancel(){this.ref.close(!1)}submit(){this.ref.close(!0)}}return e.\u0275fac=function(i){return new(i||e)(d.Sb(l.M))},e.\u0275cmp=d.Mb({type:e,selectors:[["ngx-dialog-show-component"]],inputs:{header:"header",body:"body"},decls:10,vars:2,consts:[["nbButton","","status","danger",1,"cancel",3,"click"],["nbButton","","status","success",3,"click"]],template:function(e,i){1&e&&(d.Yb(0,"nb-card"),d.Yb(1,"nb-card-header"),d.Jc(2),d.Xb(),d.Yb(3,"nb-card-body"),d.Jc(4),d.Xb(),d.Yb(5,"nb-card-footer"),d.Yb(6,"button",0),d.gc("click",(function(){return i.cancel()})),d.Jc(7,"Cancelar"),d.Xb(),d.Yb(8,"button",1),d.gc("click",(function(){return i.submit()})),d.Jc(9,"Remover"),d.Xb(),d.Xb(),d.Xb()),2&e&&(d.Fb(2),d.Kc(i.header),d.Fb(2),d.Lc(" ",i.body," "))},directives:[l.x,l.A,l.w,l.y,l.t],styles:["input[_ngcontent-%COMP%]{width:100%}.cancel[_ngcontent-%COMP%]{margin-right:2rem}"]}),e})();function m(e,i){if(1&e&&(d.Yb(0,"nb-option",44),d.Jc(1),d.Xb()),2&e){const e=i.$implicit;d.rc("value",e),d.Fb(1),d.Lc(" ",e.name," ")}}function h(e,i){if(1&e){const e=d.Zb();d.Yb(0,"nb-list-item",45),d.Yb(1,"span"),d.Jc(2),d.Xb(),d.Yb(3,"span"),d.Jc(4),d.Xb(),d.Yb(5,"span"),d.Jc(6),d.Xb(),d.Yb(7,"span"),d.Yb(8,"button",46),d.gc("click",(function(){d.Bc(e);const r=i.$implicit;return d.kc(2).editarMembroAct(r)})),d.Tb(9,"nb-icon",4),d.Xb(),d.Yb(10,"button",47),d.gc("click",(function(){d.Bc(e);const r=i.$implicit;return d.kc(2).removerMembro(r._id,r.name)})),d.Tb(11,"nb-icon",48),d.Xb(),d.Xb(),d.Xb()}if(2&e){const e=i.$implicit,r=d.kc(2);d.Fb(2),d.Kc(e.name),d.Fb(2),d.Kc(r.formatarComunidade(e.comunidade)),d.Fb(2),d.Kc(e.cargo&&e.cargo.nome||"N\xe3o definido"),d.Fb(4),d.rc("nbSpinner",r.loadingRM)("disabled",r.loadingRF)}}function f(e,i){if(1&e&&(d.Yb(0,"nb-option",44),d.Jc(1),d.Xb()),2&e){const e=i.$implicit;d.rc("value",e._id),d.Fb(1),d.Kc(e.nome)}}const g=function(){return[]};function v(e,i){if(1&e&&(d.Yb(0,"nb-select",49),d.Hc(1,f,2,2,"nb-option",10),d.Xb()),2&e){const e=d.kc(2);d.rc("formControl",e.cargoMembro),d.Fb(1),d.rc("ngForOf",e.equipe&&e.equipe.cargos||d.tc(2,g))}}function S(e,i){1&e&&(d.Yb(0,"span",41),d.Jc(1,"Defina fun\xe7\xf5es para sua equipe"),d.Xb())}function X(e,i){1&e&&(d.Yb(0,"p",50),d.Jc(1," Campo obrigat\xf3rio! "),d.Xb())}function Y(e,i){if(1&e){const e=d.Zb();d.Yb(0,"nb-list-item",45),d.Yb(1,"span"),d.Jc(2),d.Xb(),d.Yb(3,"span"),d.Jc(4),d.Xb(),d.Yb(5,"span"),d.Yb(6,"button",46),d.gc("click",(function(){d.Bc(e);const r=i.$implicit;return d.kc(2).editarFuncaoAct(r)})),d.Tb(7,"nb-icon",4),d.Xb(),d.Yb(8,"button",51),d.gc("click",(function(){d.Bc(e);const r=i.$implicit;return d.kc(2).removerFuncao(r._id,r.nome)})),d.Tb(9,"nb-icon",48),d.Xb(),d.Xb(),d.Xb()}if(2&e){const e=i.$implicit,r=d.kc(2);d.Fb(2),d.Kc(e.nome),d.Fb(2),d.Kc(e.descricao),d.Fb(4),d.rc("nbSpinner",r.loadingRF)}}function F(e,i){1&e&&(d.Yb(0,"p",50),d.Jc(1," Campo obrigat\xf3rio! "),d.Xb())}function O(e,i){if(1&e&&(d.Yb(0,"nb-option",44),d.Jc(1),d.Xb()),2&e){const e=i.$implicit;d.rc("value",e._id),d.Fb(1),d.Kc(e.descricao)}}function C(e,i){if(1&e&&(d.Yb(0,"nb-select",52),d.Hc(1,O,2,2,"nb-option",10),d.Xb()),2&e){const e=d.kc(2);d.Fb(1),d.rc("ngForOf",e.equipe.permissoes)}}function q(e,i){1&e&&(d.Yb(0,"div"),d.Jc(1," Sua equipe n\xe3o possui permiss\xf5es definidas no sistema. "),d.Xb())}function M(e,i){if(1&e){const e=d.Zb();d.Yb(0,"div"),d.Yb(1,"nb-flip-card",1),d.Yb(2,"nb-card-front"),d.Yb(3,"nb-card",2),d.Yb(4,"nb-card-header"),d.Jc(5),d.Yb(6,"button",3),d.gc("click",(function(){return d.Bc(e),d.kc().editarNomeDesc()})),d.Tb(7,"nb-icon",4),d.Xb(),d.Xb(),d.Yb(8,"nb-card-body"),d.Yb(9,"div",5),d.Yb(10,"div",6),d.Tb(11,"input",7),d.Yb(12,"nb-autocomplete",8,9),d.Hc(14,m,2,2,"nb-option",10),d.lc(15,"async"),d.Xb(),d.Xb(),d.Yb(16,"div",11),d.Yb(17,"button",12),d.gc("click",(function(){return d.Bc(e),d.kc().add()})),d.Tb(18,"nb-icon",13),d.Xb(),d.Xb(),d.Xb(),d.Yb(19,"div",14),d.Yb(20,"div",15),d.Yb(21,"nb-flip-card",16),d.Yb(22,"nb-card-front"),d.Yb(23,"nb-card",17),d.Yb(24,"nb-card-body"),d.Yb(25,"nb-list"),d.Hc(26,h,12,5,"nb-list-item",18),d.Xb(),d.Xb(),d.Xb(),d.Xb(),d.Yb(27,"nb-card-back"),d.Yb(28,"nb-card",17),d.Yb(29,"nb-card-header"),d.Yb(30,"nb-icon",19),d.gc("click",(function(){return d.Bc(e),d.kc().editarMembro=!1})),d.Xb(),d.Jc(31),d.Xb(),d.Yb(32,"nb-card-body"),d.Yb(33,"div",20),d.Yb(34,"div",21),d.Yb(35,"span"),d.Yb(36,"b"),d.Jc(37,"Comunidade:"),d.Xb(),d.Jc(38),d.Xb(),d.Xb(),d.Yb(39,"div",21),d.Yb(40,"span"),d.Yb(41,"b"),d.Jc(42,"Email:"),d.Xb(),d.Jc(43),d.Xb(),d.Xb(),d.Yb(44,"div",21),d.Yb(45,"span"),d.Yb(46,"b"),d.Jc(47,"Anivers\xe1rio:"),d.Xb(),d.Jc(48),d.Xb(),d.Xb(),d.Xb(),d.Yb(49,"div",20),d.Yb(50,"div",22),d.Yb(51,"label",23),d.Jc(52,"Fun\xe7\xe3o"),d.Xb(),d.Hc(53,v,2,3,"nb-select",24),d.Hc(54,S,2,0,"span",25),d.Xb(),d.Xb(),d.Xb(),d.Yb(55,"nb-card-footer"),d.Yb(56,"button",26),d.gc("click",(function(){return d.Bc(e),d.kc().adicionarCargoMembro()})),d.Jc(57," Salvar "),d.Xb(),d.Xb(),d.Xb(),d.Xb(),d.Xb(),d.Xb(),d.Xb(),d.Xb(),d.Xb(),d.Xb(),d.Yb(58,"nb-card-back"),d.Yb(59,"nb-card",2),d.Yb(60,"nb-card-header"),d.Jc(61),d.Xb(),d.Yb(62,"nb-card-body"),d.Yb(63,"form",27),d.Yb(64,"div",5),d.Yb(65,"div",22),d.Yb(66,"label",23),d.Jc(67,"Nome "),d.Xb(),d.Tb(68,"input",28),d.Hc(69,X,2,0,"p",29),d.Xb(),d.Yb(70,"div",30),d.Yb(71,"div",31),d.Yb(72,"label",23),d.Jc(73,"Descri\xe7\xe3o"),d.Xb(),d.Tb(74,"textarea",32),d.Xb(),d.Xb(),d.Xb(),d.Xb(),d.Xb(),d.Yb(75,"nb-card-footer"),d.Yb(76,"button",33),d.gc("click",(function(){return d.Bc(e),d.kc().salvar()})),d.Jc(77," Salvar "),d.Xb(),d.Xb(),d.Xb(),d.Xb(),d.Xb(),d.Yb(78,"nb-flip-card",34),d.Yb(79,"nb-card-front"),d.Yb(80,"nb-card"),d.Yb(81,"nb-card-header"),d.Jc(82," Fun\xe7\xf5es "),d.Yb(83,"button",3),d.gc("click",(function(){return d.Bc(e),d.kc().editarFuncaoAct()})),d.Tb(84,"nb-icon",35),d.Xb(),d.Xb(),d.Yb(85,"nb-card-body"),d.Yb(86,"nb-list"),d.Hc(87,Y,10,3,"nb-list-item",18),d.Xb(),d.Xb(),d.Xb(),d.Xb(),d.Yb(88,"nb-card-back"),d.Yb(89,"nb-card"),d.Yb(90,"nb-card-header"),d.Yb(91,"nb-icon",19),d.gc("click",(function(){return d.Bc(e),d.kc().editarFuncao=!1})),d.Xb(),d.Jc(92),d.Xb(),d.Yb(93,"nb-card-body"),d.Yb(94,"form",27),d.Yb(95,"div",20),d.Yb(96,"div",21),d.Yb(97,"label",23),d.Jc(98,"Nome "),d.Xb(),d.Tb(99,"input",36),d.Hc(100,F,2,0,"p",29),d.Xb(),d.Yb(101,"div",31),d.Yb(102,"label",23),d.Jc(103,"Descri\xe7\xe3o"),d.Xb(),d.Tb(104,"textarea",37),d.Xb(),d.Xb(),d.Yb(105,"div",38),d.Yb(106,"div",39),d.Yb(107,"label",40),d.Jc(108,"Permiss\xf5es"),d.Xb(),d.Yb(109,"div",41),d.Hc(110,C,2,1,"nb-select",42),d.Xb(),d.Hc(111,q,2,0,"div",0),d.Xb(),d.Xb(),d.Xb(),d.Xb(),d.Yb(112,"nb-card-footer"),d.Yb(113,"button",43),d.gc("click",(function(){return d.Bc(e),d.kc().salvarFuncao()})),d.Jc(114," Salvar "),d.Xb(),d.Xb(),d.Xb(),d.Xb(),d.Xb(),d.Xb()}if(2&e){const e=d.yc(13),i=d.kc();d.Fb(1),d.rc("showToggleButton",!1)("flipped",i.editar)("nbSpinner",i.loading),d.Fb(4),d.Lc(" ",i.equipe&&i.equipe.nome," "),d.Fb(6),d.rc("formControl",i.adicionarMembro)("nbAutocomplete",e),d.Fb(1),d.rc("handleDisplayFn",i.viewHandle),d.Fb(2),d.rc("ngForOf",d.mc(15,38,i.usuariosParaAdd)),d.Fb(3),d.rc("disabled",i.loadingAdd)("nbSpinner",i.loadingAdd),d.Fb(4),d.rc("showToggleButton",!1)("flipped",i.editarMembro),d.Fb(5),d.rc("ngForOf",i.equipe&&i.equipe.membros||d.tc(40,g)),d.Fb(5),d.Lc(" ",i.membroSelecionado&&i.membroSelecionado.name," "),d.Fb(7),d.Lc(" ",i.formatarComunidade(i.membroSelecionado&&i.membroSelecionado.comunidade),""),d.Fb(5),d.Lc(" ",i.membroSelecionado&&i.membroSelecionado.email,""),d.Fb(5),d.Lc(" ",i.membroSelecionado&&i.membroSelecionado.db||"n\xe3o definido",""),d.Fb(5),d.rc("ngIf",i.equipe&&i.equipe.cargos&&i.equipe.cargos.length),d.Fb(1),d.rc("ngIf",!i.equipe||!i.equipe.cargos||!i.equipe.cargos.length),d.Fb(2),d.rc("nbSpinner",i.loadingAdicionarCM)("disabled",i.loadingAdicionarCM),d.Fb(5),d.Lc(" Editar ",i.form.value.nome," "),d.Fb(2),d.rc("formGroup",i.form),d.Fb(6),d.rc("ngIf",i.verificaValidacaoCampo("nome","required")),d.Fb(7),d.rc("disabled",i.loadingSC)("nbSpinner",i.loadingSC)("nbSpinnerStatus","primary"),d.Fb(2),d.rc("showToggleButton",!1)("nbSpinner",i.loading)("flipped",i.editarFuncao),d.Fb(9),d.rc("ngForOf",i.equipe&&i.equipe.cargos||d.tc(41,g)),d.Fb(5),d.Lc(" Editar ",i.funcaoForm.value.nome," "),d.Fb(2),d.rc("formGroup",i.funcaoForm),d.Fb(6),d.rc("ngIf",i.verificaValidacaoCampo("nome","required")),d.Fb(10),d.rc("ngIf",i.equipe&&i.equipe.permissoes&&i.equipe.permissoes.length),d.Fb(1),d.rc("ngIf",!i.equipe||!i.equipe.permissoes||!i.equipe.permissoes.length),d.Fb(2),d.rc("disabled",i.loadingSF)("nbSpinner",i.loadingSF)}}const k=[{path:":id",component:(()=>{class e{constructor(e,i,r,o){this.fb=e,this.route=i,this.equipeService=r,this.dialogService=o,this.editarMembro=!1,this.editar=!1,this.headerMessage="",this.loading=!1,this.form=this.fb.group({nome:[null,c.x.required],descricao:null}),this.cargoMembro=new c.d,this.editarFuncao=!1,this.funcaoForm=this.fb.group({_id:null,nome:[null,c.x.required],descricao:null,permissoes:null}),this.loadingSC=!1,this.loadingSF=!1,this.loadingAdd=!1,this.loadingRM=!1,this.loadingRF=!1,this.loadingAdicionarCM=!1}ngOnInit(){this.route.params.subscribe(e=>{this.id=e.id,"novo"===this.id?(this.editar=!0,this.headerMessage="Nova mensagem"):"minha-equipe"===this.id?this.equipeService.buscarMinhaEquipe():(this.loading=!0,this.equipeService.buscarPorId(this.id).subscribe(e=>{this.equipe=e,this.form.patchValue(Object.assign({},e))},e=>e,()=>this.loading=!1))}),this.adicionarMembro=new c.d,this.usuariosParaAdd=Object(s.a)([]),this.adicionarMembro.valueChanges.subscribe(e=>{this.usuariosParaAdd=this.equipeService.usuariosSemEquipeSelect(e).pipe(Object(a.a)(""),Object(b.a)(e=>e||[]))})}viewHandle(e){return e&&e.name?e.name:e}verificaValidacaoCampo(e,i){return this.form.controls[e].dirty&&(i?this.form.controls[e].errors&&this.form.controls[e].errors[i]:this.form.controls[e].invalid)}editarNomeDesc(){this.editar=!0}editarFuncaoAct(e){this.editarFuncao=!0,this.funcaoForm.patchValue(e?Object.assign({},e):{nome:null,descricao:null,permissoes:[]})}salvar(){this.form.valid&&(this.editar=!1,this.equipe=Object.assign(Object.assign({},this.equipe),this.form.value),this.loadingSC=!0,"novo"===this.id&&this.equipeService.criar(this.form.value).subscribe(e=>{},e=>e,()=>this.loadingSC=!1))}formatarComunidade(e){return u.a[e]}salvarFuncao(){this.funcaoForm.valid&&(this.funcaoForm.value._id?this.equipeService.editarCargo(Object.assign({},this.funcaoForm.value)).subscribe(e=>{this.equipe=e,this.editarFuncao=!1,this.funcaoForm.reset()},e=>e,()=>this.loadingSF=!1):(this.loadingSF=!0,this.equipeService.criarCargo(Object.assign(Object.assign({},this.funcaoForm.value),{equipe:this.id})).subscribe(e=>{this.equipe=e,this.editarFuncao=!1,this.funcaoForm.reset()},e=>e,()=>{this.loadingSF=!1})))}add(){this.adicionarMembro.value&&this.adicionarMembro.value._id&&(this.loadingAdd=!0,this.equipeService.adicionarMembro(this.id,this.adicionarMembro.value._id).subscribe(e=>{this.usuariosParaAdd=Object(s.a)([]),this.equipe=e},e=>e,()=>this.loadingAdd=!1),this.adicionarMembro.patchValue(""))}editarMembroAct(e){this.editarMembro=!0,this.membroSelecionado=e}removerMembro(e,i){this.dialogService.open(p,{context:{header:"Remover membro da equipe",body:`Voc\xea tem certeza que deseja remover ${i} da sua equipe?`}}).onClose.subscribe(i=>{this.loadingRM=!0,i&&this.equipeService.removerMembro(this.id,e).subscribe(e=>{this.equipe=e},e=>e,()=>this.loadingRM=!1)})}removerFuncao(e,i){this.dialogService.open(p,{context:{header:"Remover fun\xe7\xe3o "+i,body:"Essa a\xe7\xe3o ir\xe1 remover a fun\xe7\xe3o de todos membro que a possuirem. Remover mesmo assim?"}}).onClose.subscribe(i=>{i&&(this.loadingRM=!0,this.equipeService.removerCargo(this.id,e).subscribe(e=>{e&&(this.equipe=e)},e=>e,()=>this.loadingRM=!1))})}adicionarCargoMembro(){this.cargoMembro.value&&(this.loadingAdicionarCM=!0,this.equipeService.adicionarCargoUsuario(this.id,this.membroSelecionado._id,this.cargoMembro.value).subscribe(e=>{e&&(this.equipe=e,this.editarMembro=!1)},e=>e,()=>this.loadingAdicionarCM=!1))}}return e.\u0275fac=function(i){return new(i||e)(d.Sb(c.c),d.Sb(t.a),d.Sb(n.a),d.Sb(l.N))},e.\u0275cmp=d.Mb({type:e,selectors:[["ngx-editar-equipe"]],decls:1,vars:1,consts:[[4,"ngIf"],["nbSpinnerStatus","primary",1,"own-scroll",3,"showToggleButton","flipped","nbSpinner"],["size","large"],["nbButton","","ghost","",3,"click"],["icon","edit-outline"],[1,"row"],[1,"col-10"],["nbInput","","type","text","placeholder","Usu\xe1rio","fullWidth","",3,"formControl","nbAutocomplete"],[3,"handleDisplayFn"],["auto",""],[3,"value",4,"ngFor","ngForOf"],[1,"col-2"],["type","submit","nbButton","","hero","","nbSnipperStatus","primary","status","danger",3,"disabled","nbSpinner","click"],["icon","plus"],[1,"row",2,"margin-top","10px"],[1,"col-md-12"],[1,"own-scroll",3,"showToggleButton","flipped"],["size","small"],["class","item",4,"ngFor","ngForOf"],["icon","arrow-left-outline",3,"click"],[1,"row","form-group"],[1,"col-md-4","form-group"],[1,"col-md-4"],["for","Nome","required","",1,"label"],["placeholder","Fun\xe7\xe3o","fullWidth","",3,"formControl",4,"ngIf"],["fullWidth","",4,"ngIf"],["nbButton","","nbSpinnerStatus","primary",3,"nbSpinner","disabled","click"],[3,"formGroup"],["type","text","nbInput","","placeholder","Nome","fullWidth","","id","nome","formControlName","nome"],["class","caption status-danger",4,"ngIf"],[1,"col-md-6"],[1,"form-group","col-md-9"],["nbInput","","placeholder","Descri\xe7\xe3o","fullWidth","","id","descricao","formControlName","descricao"],["nbButton","",3,"disabled","nbSpinner","nbSpinnerStatus","click"],["nbSpinnerStatus","primary",1,"own-scroll",3,"showToggleButton","nbSpinner","flipped"],["icon","plus-outline"],["type","text","nbInput","","placeholder","Nome","fullWidth","","formControlName","nome"],["nbInput","","placeholder","Descri\xe7\xe3o","fullWidth","","formControlName","descricao"],[1,"form-group","row"],[1,"form-group","col-md-10"],["required","",1,"label"],["fullWidth",""],["formControlName","permissoes","multiple","",4,"ngIf"],["nbButton","","nbSpinnerStatus","primary",3,"disabled","nbSpinner","click"],[3,"value"],[1,"item"],["nbButton","","ghost","","status","info",3,"click"],["nbButton","","ghost","","status","danger","nbSpinnerStatus","primary",3,"nbSpinner","disabled","click"],["icon","minus-outline"],["placeholder","Fun\xe7\xe3o","fullWidth","",3,"formControl"],[1,"caption","status-danger"],["nbButton","","ghost","","status","danger","nbSpinnerStatus","primary",3,"nbSpinner","click"],["formControlName","permissoes","multiple",""]],template:function(e,i){1&e&&d.Hc(0,M,115,42,"div",0),2&e&&d.rc("ngIf","novo"!==i.id)},directives:[o.n,l.O,l.ub,l.z,l.x,l.A,l.t,l.P,l.w,l.S,c.b,l.r,c.n,c.e,l.q,o.m,l.bb,l.v,l.y,c.z,c.o,c.g,c.f,l.jb,l.cb,l.mb],pipes:[o.b],styles:[".item[_ngcontent-%COMP%]{display:-webkit-box;display:flex;-webkit-box-pack:justify;justify-content:space-between}.item[_ngcontent-%COMP%] > *[_ngcontent-%COMP%]{-webkit-box-flex:1;flex:1}.item[_ngcontent-%COMP%]:first-child{border-top:none}"]}),e})()}];let y=(()=>{class e{}return e.\u0275mod=d.Qb({type:e}),e.\u0275inj=d.Pb({factory:function(i){return new(i||e)},imports:[[t.g.forChild(k)],t.g]}),e})(),A=(()=>{class e{}return e.\u0275mod=d.Qb({type:e}),e.\u0275inj=d.Pb({factory:function(i){return new(i||e)},imports:[[o.c,y,l.B,l.T,l.u,c.u,c.h,l.R,l.nb,l.vb,l.s,l.E,l.db]]}),e})()},esi0:function(e,i,r){"use strict";r.d(i,"a",(function(){return d}));var o=r("MAky"),t=r("lJxs"),n=r("JIr8"),c=r("LRne"),a=r("fXoL"),b=r("tk/3"),s=r("aceb"),u=r("tyNb");let d=(()=>{class e{constructor(e,i,r){this.http=e,this.toastrService=i,this.router=r,this.url=o.b+"/equipe"}lista(){return this.http.get(this.url+"/lista")}criar(e){return this.http.post(this.url+"/criar",e).pipe(Object(t.a)(e=>{this.toastrService.success("Agora voc\xea pode definir membros e criar fun\xe7\xf5es","Equipe criada com sucesso"),this.router.navigate(["/pages/admin/equipe/editar/"+e._id])}),Object(n.a)(e=>(this.toastrService.danger(e,"Erro!"),Object(c.a)(!1))))}adicionarMembro(e,i){return this.http.post(this.url+"/adicionarMembro",{id:e,usuarioId:i})}buscarPorId(e){return this.http.post(this.url+"/buscarPorId",{id:e})}buscarMinhaEquipe(){return this.http.get(this.url+"/buscarMinhaEquipe")}select(){return this.http.get(this.url+"/select")}usuariosSemEquipeSelect(e){return this.http.post(this.url+"/usuariosSemEquipeSelect",{q:e})}criarCargo(e){return this.http.post(this.url+"/criarCargo",e).pipe(Object(t.a)(e=>(this.toastrService.success("","Cargo criado com sucesso"),e)),Object(n.a)(e=>(this.toastrService.danger(e,"Erro!"),Object(c.a)({nome:""}))))}editarCargo(e){return this.http.post(this.url+"/editarCargo",e).pipe(Object(t.a)(e=>(this.toastrService.success("","Cargo editado com sucesso"),e)),Object(n.a)(e=>(this.toastrService.danger(e,"Erro!"),Object(c.a)({nome:""}))))}removerMembro(e,i){return this.http.post(this.url+"/removerMembro",{id:e,usuarioId:i}).pipe(Object(t.a)(e=>(this.toastrService.success("","Membro removido com sucesso"),e)),Object(n.a)(e=>(this.toastrService.danger(e,"Erro!"),Object(c.a)({nome:""}))))}removerCargo(e,i){return this.http.post(this.url+"/removerCargo",{id:e,cargoId:i}).pipe(Object(t.a)(e=>(this.toastrService.success("","Cargo removido com sucesso"),e)),Object(n.a)(e=>(this.toastrService.danger(e,"Erro!"),Object(c.a)(!1))))}adicionarCargoUsuario(e,i,r){return this.http.post(this.url+"/adicionarCargoUsuario",{id:e,usuarioId:i,cargoId:r}).pipe(Object(t.a)(e=>(this.toastrService.success("","Membro removido com sucesso"),e)),Object(n.a)(e=>(this.toastrService.danger(e,"Erro!"),Object(c.a)(!1))))}}return e.\u0275fac=function(i){return new(i||e)(a.cc(b.b),a.cc(s.Ab),a.cc(u.c))},e.\u0275prov=a.Ob({token:e,factory:e.\u0275fac,providedIn:"root"}),e})()},vI6V:function(e,i,r){"use strict";r.d(i,"d",(function(){return o})),r.d(i,"a",(function(){return t})),r.d(i,"b",(function(){return n})),r.d(i,"c",(function(){return c}));var o=function(e){return e.ABERTO="Aberto",e.PRODUZINDO="Produzindo",e.ENTREGUE="Entregue",e.PAGO="Pago",e.CANCELADO="Cancelado",e.SLC_CANCELAMENTO="Slc. Canc.",e}({}),t=function(e){return e.PROPEDEUTICO="Proped\xeautico",e.FILOSOFIA="Filosofia",e.TEOLOGIA="Teologia",e.TIROCINIO="Tiroc\xednio",e}({}),n=function(e){return e.SEMINARISTA="Seminarista",e.FORMADOR="Formador",e.REITOR="Reitor",e.CONSELHO_GESTOR="Conselho Gestor",e.OUTROS="Outros",e}({}),c=function(e){return e.EM_ANALISE="Em an\xe1lise",e.CORRECAO="Solicitado corre\xe7\xe3o",e.APROVADO="Aprovado",e.DEPOSITADO="Depositado",e}({})}}]);