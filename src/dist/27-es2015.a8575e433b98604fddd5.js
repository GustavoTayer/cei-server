(window.webpackJsonp=window.webpackJsonp||[]).push([[27],{"914F":function(t,o,i){"use strict";i.r(o),i.d(o,"PartilhaListaModule",(function(){return M}));var a=i("ofXK"),c=i("tyNb"),e=i("lKi6"),n=i("cnyc"),r=i("cHAT"),b=i("sWYD"),s=i("vI6V"),l=i("v8Ly"),d=i("JX91"),u=i("lJxs"),p=i("zeoc"),v=i("3Pt+"),h=i("fXoL"),f=i("aceb"),m=i("TT0I");function X(t,o){if(1&t&&h.Tb(0,"textarea",5),2&t){const t=h.kc(2);h.rc("formControl",t.justificativa)}}function Y(t,o){if(1&t&&(h.Yb(0,"div"),h.Yb(1,"nb-checkbox",3),h.Jc(2,"Aprovar comprovante(s)"),h.Xb(),h.Hc(3,X,1,1,"textarea",4),h.Xb()),2&t){const t=h.kc();h.Fb(1),h.rc("formControl",t.aprovado),h.Fb(2),h.rc("ngIf",!t.aprovado.value)}}function g(t,o){if(1&t&&(h.Yb(0,"div"),h.Yb(1,"div",6),h.Yb(2,"div",7),h.Yb(3,"label",8),h.Jc(4,"Valor depositado"),h.Xb(),h.Tb(5,"input",9),h.Xb(),h.Yb(6,"div",7),h.Yb(7,"label",10),h.Jc(8,"Data do dep\xf3sito"),h.Xb(),h.Tb(9,"input",11),h.Tb(10,"nb-datepicker",null,12),h.Xb(),h.Xb(),h.Xb()),2&t){const t=h.yc(11),o=h.kc();h.Fb(5),h.rc("formControl",o.valorDepositado),h.Fb(4),h.rc("formControl",o.dataDeposito)("nbDatepicker",t)}}let k=(()=>{class t{constructor(t){this.ref=t,this.aprovado=new v.d(!1),this.justificativa=new v.d(""),this.valorDepositado=new v.d(0),this.dataDeposito=new v.d(new Date)}ngOnInit(){this.aprovar=this.status===s.c.EM_ANALISE,this.deposito=this.status===s.c.APROVADO}cancel(){this.ref.close({submit:!1})}submit(){this.ref.close({submit:!0,aprovacao:{aprovado:this.aprovado.value,justificativa:this.justificativa.value},deposito:{valorDepositado:this.valorDepositado.value,dataDeposito:this.dataDeposito.value}})}}return t.\u0275fac=function(o){return new(o||t)(h.Sb(f.M))},t.\u0275cmp=h.Mb({type:t,selectors:[["ngx-dialog-showcase"]],inputs:{status:"status"},decls:11,vars:2,consts:[[4,"ngIf"],["nbButton","","status","danger",1,"cancel",3,"click"],["nbButton","","status","success",3,"click"],["fullWidth","",3,"formControl"],["fullWidth","","nbInput","","placeholder","Justificativa",3,"formControl",4,"ngIf"],["fullWidth","","nbInput","","placeholder","Justificativa",3,"formControl"],[1,"row"],[1,"col"],["for","valor",1,"label"],["shape","round","type","tel","nbInput","","currencyMask","","placeholder","Valor depositado","id","valor","maxlength","15",3,"formControl"],[1,"label"],["nbInput","",3,"formControl","nbDatepicker"],["dp",""]],template:function(t,o){1&t&&(h.Yb(0,"nb-card"),h.Yb(1,"nb-card-header"),h.Jc(2,"Confirme a altera\xe7\xe3o de status"),h.Xb(),h.Yb(3,"nb-card-body"),h.Hc(4,Y,4,2,"div",0),h.Hc(5,g,12,3,"div",0),h.Xb(),h.Yb(6,"nb-card-footer"),h.Yb(7,"button",1),h.gc("click",(function(){return o.cancel()})),h.Jc(8," Cancelar "),h.Xb(),h.Yb(9,"button",2),h.gc("click",(function(){return o.submit()})),h.Jc(10,"Alterar"),h.Xb(),h.Xb(),h.Xb()),2&t&&(h.Fb(4),h.rc("ngIf",o.aprovar),h.Fb(1),h.rc("ngIf",o.deposito))},directives:[f.x,f.A,f.w,a.n,f.y,f.t,f.D,v.n,v.e,f.S,v.b,m.a,v.i,f.J,f.I],styles:["input[_ngcontent-%COMP%]{width:100%}.cancel[_ngcontent-%COMP%]{margin-right:2rem}"]}),t})();var F=i("wHSu"),y=i("6NWb");function S(t,o){if(1&t&&(h.Yb(0,"nb-option",10),h.Jc(1),h.Xb()),2&t){const t=o.$implicit;h.rc("value",t.k),h.Fb(1),h.Kc(t.v)}}function w(t,o){if(1&t&&(h.Yb(0,"nb-option",10),h.Jc(1),h.Xb()),2&t){const t=o.$implicit;h.rc("value",t.n),h.Fb(1),h.Kc(t.mes)}}function A(t,o){if(1&t&&(h.Yb(0,"nb-option",10),h.Jc(1),h.Xb()),2&t){const t=o.$implicit;h.rc("value",t),h.Fb(1),h.Lc(" ",t.name," ")}}function J(t,o){if(1&t){const t=h.Zb();h.Yb(0,"div",21),h.Yb(1,"nb-checkbox",33),h.gc("checkedChange",(function(o){h.Bc(t);const i=h.kc().$implicit;return h.kc().toggle(o,i._id)})),h.Xb(),h.Xb()}if(2&t){const t=h.kc().$implicit,o=h.kc();h.Fb(1),h.rc("checked",o.isChecked(t._id))}}function C(t,o){if(1&t){const t=h.Zb();h.Yb(0,"nb-list-item"),h.Hc(1,J,2,1,"div",28),h.Yb(2,"div",21),h.Jc(3),h.Xb(),h.Yb(4,"div",21),h.Jc(5),h.Xb(),h.Yb(6,"div",21),h.Jc(7),h.Xb(),h.Yb(8,"div",21),h.Jc(9),h.lc(10,"currency"),h.Xb(),h.Yb(11,"div",21),h.Jc(12),h.lc(13,"currency"),h.Xb(),h.Yb(14,"div",21),h.Yb(15,"button",29),h.gc("click",(function(){h.Bc(t);const i=o.$implicit;return h.kc().downloadComprovante(i)})),h.Tb(16,"nb-icon",30),h.Xb(),h.Yb(17,"button",31),h.gc("click",(function(){h.Bc(t);const i=o.$implicit;return h.kc().mostrarAtividade(i)})),h.Tb(18,"nb-icon",32),h.Xb(),h.Xb(),h.Xb()}if(2&t){const t=o.$implicit,i=h.kc();h.Fb(1),h.rc("ngIf",i.podeAlterar()),h.Fb(2),h.Kc(t.usuario.name),h.Fb(2),h.Kc(i.mes(t.mes).abv),h.Fb(2),h.Kc(i.obterStatus(t.status)),h.Fb(2),h.Lc(" ",h.nc(10,7,t.valorComprovante,"R$")," "),h.Fb(3),h.Lc(" ",h.nc(13,10,t.valorDepositado,"R$")||"-"," "),h.Fb(3),h.rc("nbSpinner",i.loadingDownloading[t._id])}}function D(t,o){1&t&&(h.Yb(0,"div"),h.Jc(1," N\xe3o ha nenhuma atividade para este comprovante. "),h.Xb())}function I(t,o){if(1&t&&(h.Yb(0,"nb-list-item"),h.Yb(1,"div",21),h.Jc(2),h.Xb(),h.Yb(3,"div",21),h.Jc(4),h.Xb(),h.Yb(5,"div",21),h.Jc(6),h.Xb(),h.Xb()),2&t){const t=o.$implicit,i=h.kc();h.Fb(2),h.Kc(i.formataData(t.criadoEm)),h.Fb(2),h.Kc(t.atividade),h.Fb(2),h.Kc(t.descricao)}}const O=[{path:"",component:(()=>{class t{constructor(t,o,i,a,c){this.fb=t,this.usuarioService=o,this.partilhaService=i,this.dialogService=a,this.toastrservice=c,this.meses=e.b,this.faExchangeAlt=F.f,this.anoAtual=Object(n.a)(new Date),this.filtroStatus="EM_ANALISE",this.statuss=Object.keys(s.c).map(t=>({k:t,v:s.c[t]})),this.verAtividade=!1,this.checkeds=new Set,this.loadingLista=!1,this.loadingInfo=!1,this.loadingAlterarStatus=!1,this.loadingDownloading={},this.form=this.fb.group({ano:this.anoAtual,mes:Object(r.a)(new Date),usuario:null,status:"EM_ANALISE",dataPrevistaRecebimento:null}),this.caixa=0,this.enviaram=0,this.faltam=0,this.doado=0,this.depositado=0}ngOnInit(){this.loadingLista=!0,this.loadingInfo=!0,this.partilhaService.buscar(this.form.value).subscribe(t=>{this.comprovantes=t,this.comprovantes.forEach(t=>this.downloadComprovante[t._id]=!1)},t=>t,()=>this.loadingLista=!1),this.partilhaService.valoresGestao(this.form.value).subscribe(t=>{this.caixa=t.caixa,this.enviaram=t.enviaram,this.faltam=t.faltam,this.doado=t.doado,this.depositado=t.depositado},t=>t,()=>this.loadingInfo=!1),this.form.controls.usuario.valueChanges.subscribe(t=>this.usuarios=this.usuarioService.seminaristasAtivosAutocomplete(t).pipe(Object(d.a)(""),Object(u.a)(t=>t||[])))}alterarStatus(){this.loadingAlterarStatus=!0;const t=Array.from(this.checkeds);this.dialogService.open(k,{context:{status:s.c[this.filtroStatus]}}).onClose.subscribe(o=>{o.submit&&this.partilhaService.alterarStatus({ids:t,status:this.filtroStatus,justificativa:o.aprovacao.justificativa,aprovado:o.aprovacao.aprovado,valorDepositado:o.deposito.valorDepositado,dataDeposito:o.deposito.dataDeposito}).subscribe(t=>{this.toastrservice.success("","Status das solicita\xe7\xf5es foram alterados com sucesso"),this.buscar()},t=>{this.toastrservice.danger(t.error.errors,"Erro!")},()=>this.loadingAlterarStatus=!1)})}viewHandle(t){return t&&t.name?t.name:t}buscar(){this.loadingLista=!0,this.partilhaService.buscar(this.form.value).subscribe(t=>{this.comprovantes=t,this.filtroStatus=this.form.value.status,this.checkeds.clear(),this.comprovantes.forEach(t=>this.downloadComprovante[t._id]=!1)},t=>t,()=>this.loadingLista=!1)}mes(t){return Object(e.a)(t)}obterStatus(t){return s.c[t]}mostrarAtividade(t){this.comprovanteEscolhido=t,this.verAtividade=!0}ocultarAtividade(){this.comprovanteEscolhido=null,this.verAtividade=!1}toggle(t,o){t?this.checkeds.add(o):this.checkeds.delete(o)}isChecked(t){return this.checkeds.has(t)}formataData(t){return Object(b.a)(new Date(t),"dd/MM/yyyy")}podeAlterar(){return"EM_ANALISE"===this.filtroStatus||"APROVADO"===this.filtroStatus}downloadComprovante(t){this.downloadComprovante[t._id]=!0,this.partilhaService.obterArquivoComprovante(t).subscribe(t=>t,t=>t,()=>this.downloadComprovante[t._id]=!1)}}return t.\u0275fac=function(o){return new(o||t)(h.Sb(v.c),h.Sb(l.a),h.Sb(p.a),h.Sb(f.N),h.Sb(f.Ab))},t.\u0275cmp=h.Mb({type:t,selectors:[["ngx-partilha-lista"]],decls:93,vars:38,consts:[[1,"row"],[1,"col-md-8"],[3,"formGroup"],[1,"form-group","row"],[1,"form-group","col-md-4"],[1,"label"],["formControlName","status","fullWidth",""],[3,"value",4,"ngFor","ngForOf"],["formControlName","mes","fullWidth",""],["formControlName","ano","fullWidth",""],[3,"value"],[1,"col-md-4"],["formControlName","usuario","nbInput","","type","text","placeholder","Usu\xe1rio","fullWidth","",3,"nbAutocomplete"],[3,"handleDisplayFn"],["auto",""],["fullWidth","","nbInput","","formControlName","dataPrevistaRecebimento",3,"nbDatepicker"],["dp",""],["nbButton","",3,"click"],["nbSpinnerStatus","primary",3,"nbSpinner"],[1,"col-md-7"],[1,"col-md-5"],[1,"col"],[1,"own-scroll",3,"showToggleButton","flipped"],["nbTooltip","Alterar status dos envios de comprovantes selecionados","nbTooltipStatus","primary","nbButton","","status","basic","size","tiny",3,"disabled","click"],[3,"icon"],[4,"ngFor","ngForOf"],["icon","arrow-left-outline",3,"click"],[4,"ngIf"],["class","col",4,"ngIf"],["nbButton","","ghost","","status","info",3,"nbSpinner","click"],["icon","download-outline"],["nbButton","","ghost","","status","primary",3,"click"],["icon","arrow-forward-outline"],[3,"checked","checkedChange"]],template:function(t,o){if(1&t&&(h.Yb(0,"div",0),h.Yb(1,"div",1),h.Yb(2,"nb-card"),h.Yb(3,"nb-card-header"),h.Jc(4,"Gest\xe3o Partilha solid\xe1ria"),h.Xb(),h.Yb(5,"nb-card-body"),h.Yb(6,"form",2),h.Yb(7,"div",3),h.Yb(8,"div",4),h.Yb(9,"label",5),h.Jc(10,"Status"),h.Xb(),h.Yb(11,"nb-select",6),h.Hc(12,S,2,2,"nb-option",7),h.Xb(),h.Xb(),h.Yb(13,"div",4),h.Yb(14,"label",5),h.Jc(15,"M\xeas"),h.Xb(),h.Yb(16,"nb-select",8),h.Hc(17,w,2,2,"nb-option",7),h.Xb(),h.Xb(),h.Yb(18,"div",4),h.Yb(19,"label",5),h.Jc(20,"Ano"),h.Xb(),h.Yb(21,"nb-select",9),h.Yb(22,"nb-option",10),h.Jc(23),h.Xb(),h.Yb(24,"nb-option",10),h.Jc(25),h.Xb(),h.Xb(),h.Xb(),h.Xb(),h.Yb(26,"div",0),h.Yb(27,"div",11),h.Yb(28,"label",5),h.Jc(29,"Seminarista"),h.Xb(),h.Tb(30,"input",12),h.Yb(31,"nb-autocomplete",13,14),h.Hc(33,A,2,2,"nb-option",7),h.lc(34,"async"),h.Xb(),h.Xb(),h.Yb(35,"div",11),h.Yb(36,"label",5),h.Jc(37,"Data Prevista Recebimento"),h.Xb(),h.Tb(38,"input",15),h.Tb(39,"nb-datepicker",null,16),h.Xb(),h.Xb(),h.Xb(),h.Xb(),h.Yb(41,"nb-card-footer"),h.Yb(42,"button",17),h.gc("click",(function(){return o.buscar()})),h.Jc(43,"Buscar"),h.Xb(),h.Xb(),h.Xb(),h.Xb(),h.Yb(44,"div",11),h.Yb(45,"nb-card",18),h.Yb(46,"nb-card-header"),h.Jc(47),h.lc(48,"currency"),h.Xb(),h.Yb(49,"nb-card-body"),h.Yb(50,"nb-list"),h.Yb(51,"nb-list-item"),h.Yb(52,"div",19),h.Jc(53," Valor total doado: "),h.Xb(),h.Yb(54,"div",20),h.Jc(55),h.lc(56,"currency"),h.Xb(),h.Xb(),h.Yb(57,"nb-list-item"),h.Yb(58,"div",19),h.Jc(59," Valor total depositado: "),h.Xb(),h.Yb(60,"div",20),h.Jc(61),h.lc(62,"currency"),h.Xb(),h.Xb(),h.Yb(63,"nb-list-item"),h.Yb(64,"div",19),h.Jc(65," Quantidade seminaristas: "),h.Xb(),h.Yb(66,"div",20),h.Jc(67),h.Xb(),h.Xb(),h.Yb(68,"nb-list-item"),h.Yb(69,"div",19),h.Jc(70," faltam enviar: "),h.Xb(),h.Yb(71,"div",20),h.Jc(72),h.Xb(),h.Xb(),h.Xb(),h.Xb(),h.Xb(),h.Xb(),h.Xb(),h.Yb(73,"div",0),h.Yb(74,"div",21),h.Yb(75,"nb-flip-card",22),h.Yb(76,"nb-card-front",18),h.Yb(77,"nb-card"),h.Yb(78,"nb-card-header"),h.Jc(79,"Lista "),h.Yb(80,"button",23),h.gc("click",(function(){return o.alterarStatus()})),h.Tb(81,"fa-icon",24),h.Xb(),h.Xb(),h.Yb(82,"nb-card-body"),h.Hc(83,C,19,13,"nb-list-item",25),h.Xb(),h.Xb(),h.Xb(),h.Yb(84,"nb-card-back"),h.Yb(85,"nb-card"),h.Yb(86,"nb-card-header"),h.Yb(87,"nb-icon",26),h.gc("click",(function(){return o.verAtividade=!1})),h.Xb(),h.Jc(88),h.Xb(),h.Yb(89,"nb-card-body"),h.Hc(90,D,2,0,"div",27),h.Yb(91,"nb-list"),h.Hc(92,I,7,3,"nb-list-item",25),h.Xb(),h.Xb(),h.Xb(),h.Xb(),h.Xb(),h.Xb(),h.Xb()),2&t){const t=h.yc(32),i=h.yc(40);h.Fb(6),h.rc("formGroup",o.form),h.Fb(6),h.rc("ngForOf",o.statuss),h.Fb(5),h.rc("ngForOf",o.meses),h.Fb(5),h.rc("value",o.anoAtual-1),h.Fb(1),h.Kc(o.anoAtual-1),h.Fb(1),h.rc("value",o.anoAtual),h.Fb(1),h.Kc(o.anoAtual),h.Fb(5),h.rc("nbAutocomplete",t),h.Fb(1),h.rc("handleDisplayFn",o.viewHandle),h.Fb(2),h.rc("ngForOf",h.mc(34,27,o.usuarios)),h.Fb(5),h.rc("nbDatepicker",i),h.Fb(7),h.rc("nbSpinner",o.loadingInfo),h.Fb(2),h.Lc("Valor em caixa: ",h.nc(48,29,o.caixa,"R$"),""),h.Fb(8),h.Lc(" ",h.nc(56,32,o.doado,"R$")," "),h.Fb(6),h.Lc(" ",h.nc(62,35,o.depositado,"R$")," "),h.Fb(6),h.Lc(" ",o.enviaram," "),h.Fb(5),h.Lc(" ",o.faltam," "),h.Fb(3),h.rc("showToggleButton",!1)("flipped",o.verAtividade),h.Fb(1),h.rc("nbSpinner",o.loadingLista),h.Fb(4),h.rc("disabled",!o.podeAlterar()),h.Fb(1),h.rc("icon",o.faExchangeAlt),h.Fb(2),h.rc("ngForOf",o.comprovantes),h.Fb(5),h.Mc("",o.comprovanteEscolhido&&o.comprovanteEscolhido.usuario.name," - ",o.comprovanteEscolhido&&o.mes(o.comprovanteEscolhido.mes).mes," "),h.Fb(2),h.rc("ngIf",!o.comprovanteEscolhido||!o.comprovanteEscolhido.atividades||!o.comprovanteEscolhido.atividades.length),h.Fb(2),h.rc("ngForOf",o.comprovanteEscolhido&&o.comprovanteEscolhido.atividades)}},directives:[f.x,f.A,f.w,v.z,v.o,v.g,f.mb,v.n,v.f,a.m,f.jb,v.b,f.S,f.r,f.q,f.J,f.I,f.y,f.t,f.ub,f.bb,f.cb,f.O,f.z,f.Db,y.a,f.v,f.P,a.n,f.D],pipes:[a.b,a.d],styles:[".item[_ngcontent-%COMP%]{display:-webkit-box;display:flex;-webkit-box-pack:justify;justify-content:space-between}.item[_ngcontent-%COMP%] > *[_ngcontent-%COMP%]{-webkit-box-flex:1;flex:1}.item[_ngcontent-%COMP%]:first-child{border-top:none}"]}),t})()}];let E=(()=>{class t{}return t.\u0275mod=h.Qb({type:t}),t.\u0275inj=h.Pb({factory:function(o){return new(o||t)},imports:[[c.g.forChild(O)],c.g]}),t})();var x=i("oG2T"),L=i("O+SD");let M=(()=>{class t{}return t.\u0275mod=h.Qb({type:t}),t.\u0275inj=h.Pb({factory:function(o){return new(o||t)},imports:[[a.c,E,f.B,f.db,f.R,f.T,f.u,v.u,v.h,f.nb,f.s,f.E,f.K,f.L.forChild(),x.a.forChild({format:"dd/MM/yyyy"}),m.b.forRoot(L.customCurrencyMaskConfig),y.b,f.Eb,f.vb]]}),t})()}}]);