(window.webpackJsonp=window.webpackJsonp||[]).push([[16],{HYE6:function(i,o,n){"use strict";n.r(o),n.d(o,"UsuarioConvidarModule",(function(){return f}));var r=n("ofXK"),t=n("tyNb"),a=n("3Pt+"),e=n("vI6V"),c=n("v8Ly"),b=n("fXoL"),s=n("aceb");function u(i,o){if(1&i&&(b.Yb(0,"nb-option",19),b.Jc(1),b.Xb()),2&i){const i=o.$implicit;b.rc("value",i.k),b.Fb(1),b.Kc(i.v)}}function l(i,o){if(1&i){const i=b.Zb();b.Yb(0,"nb-list-item"),b.Yb(1,"form",2),b.Yb(2,"div",12),b.Yb(3,"div",13),b.Tb(4,"input",14),b.Xb(),b.Yb(5,"div",13),b.Yb(6,"nb-select",15),b.Hc(7,u,2,2,"nb-option",16),b.Xb(),b.Xb(),b.Yb(8,"div",13),b.Yb(9,"button",17),b.gc("click",(function(){b.Bc(i);const n=o.$implicit;return b.kc().remove(n)})),b.Tb(10,"nb-icon",18),b.Xb(),b.Xb(),b.Xb(),b.Xb(),b.Xb()}if(2&i){const i=o.$implicit,n=b.kc();b.Fb(1),b.rc("formGroup",i),b.Fb(6),b.rc("ngForOf",n.hierarquia)}}const d=[{path:"",component:(()=>{class i{constructor(i,o){this.fb=i,this.usuarioService=o,this.form=this.fb.group({email:[null,a.x.email]}),this.comunidades=Object.keys(e.a).map(i=>({k:i,v:e.a[i]})),this.hierarquia=Object.keys(e.b).filter(i=>"REITOR"!==i).map(i=>({k:i,v:e.b[i]})),this.convidados=[]}ngOnInit(){}remove(i){this.convidados=this.convidados.filter(o=>o.value.email!==i.value.email)}add(){if(this.form.valid){const i=this.fb.group({email:null,hierarquia:null});i.patchValue({email:this.form.value.email,hierarquia:"SEMINARISTA"}),this.convidados.push(i),this.form.patchValue({email:null})}}enviarConvites(){const i=this.convidados.map(i=>({email:i.value.email,hierarquia:i.value.hierarquia}));this.usuarioService.criarConvite(i).subscribe(i=>{this.convidados=[]})}verificaValidacaoCampo(i,o){return this.form.controls[i].dirty&&(o?this.form.controls[i].errors&&this.form.controls[i].errors[o]:this.form.controls[i].invalid)}}return i.\u0275fac=function(o){return new(o||i)(b.Sb(a.c),b.Sb(c.a))},i.\u0275cmp=b.Mb({type:i,selectors:[["ngx-usuario-convidar"]],decls:24,vars:4,consts:[["nbButton","","size","small","ghost","","routerLink","/pages/admin/usuarios"],["icon","arrow-left"],[3,"formGroup"],[1,"row"],[1,"col-10"],["type","email","nbInput","","placeholder","Email","fullWidth","","id","Email","formControlName","email",3,"status"],[1,"col-2"],["type","submit","nbButton","","hero","","status","danger",3,"click"],["icon","plus"],["nbButton","","status","primary",3,"disabled","click"],["icon","email"],[4,"ngFor","ngForOf"],[2,"display","flex","justify-content","space-around"],[1,"form-group","col"],["nbInput","","formControlName","email","fullWidth","",2,"min-width","200px"],["placeholder","Posi\xe7\xe3o","fullWidth","","formControlName","hierarquia"],[3,"value",4,"ngFor","ngForOf"],["nbButton","","hero","","size","small","status","danger",3,"click"],["icon","minus"],[3,"value"]],template:function(i,o){1&i&&(b.Yb(0,"nb-card"),b.Yb(1,"nb-card-header"),b.Yb(2,"button",0),b.Tb(3,"nb-icon",1),b.Xb(),b.Jc(4," Convidar Usu\xe1rios"),b.Xb(),b.Yb(5,"nb-card-body"),b.Yb(6,"form",2),b.Yb(7,"div",3),b.Yb(8,"div",4),b.Tb(9,"input",5),b.Xb(),b.Yb(10,"div",6),b.Yb(11,"button",7),b.gc("click",(function(){return o.add()})),b.Tb(12,"nb-icon",8),b.Xb(),b.Xb(),b.Xb(),b.Xb(),b.Xb(),b.Yb(13,"nb-card-footer"),b.Yb(14,"div",6),b.Yb(15,"button",9),b.gc("click",(function(){return o.enviarConvites()})),b.Tb(16,"nb-icon",10),b.Jc(17," enviar convites"),b.Xb(),b.Xb(),b.Xb(),b.Xb(),b.Yb(18,"nb-card"),b.Yb(19,"nb-card-header"),b.Jc(20," Lista de convidados "),b.Xb(),b.Yb(21,"nb-card-body"),b.Yb(22,"nb-list"),b.Hc(23,l,11,2,"nb-list-item",11),b.Xb(),b.Xb(),b.Xb()),2&i&&(b.Fb(6),b.rc("formGroup",o.form),b.Fb(3),b.rc("status",o.verificaValidacaoCampo("email")?"danger":""),b.Fb(6),b.rc("disabled",!o.convidados||!o.convidados.length),b.Fb(8),b.rc("ngForOf",o.convidados))},directives:[s.x,s.A,s.t,t.d,s.P,s.w,a.z,a.o,a.g,s.S,a.b,a.n,a.f,s.y,s.bb,r.m,s.cb,s.mb,s.jb],styles:[""]}),i})()}];let m=(()=>{class i{}return i.\u0275mod=b.Qb({type:i}),i.\u0275inj=b.Pb({factory:function(o){return new(o||i)},imports:[[t.g.forChild(d)],t.g]}),i})(),f=(()=>{class i{}return i.\u0275mod=b.Qb({type:i}),i.\u0275inj=b.Pb({factory:function(o){return new(o||i)},imports:[[r.c,s.B,s.T,s.db,s.nb,s.u,s.T,s.R,a.u,a.h,m]]}),i})()},vI6V:function(i,o,n){"use strict";n.d(o,"d",(function(){return r})),n.d(o,"a",(function(){return t})),n.d(o,"b",(function(){return a})),n.d(o,"c",(function(){return e}));var r=function(i){return i.ABERTO="Aberto",i.PRODUZINDO="Produzindo",i.ENTREGUE="Entregue",i.PAGO="Pago",i.CANCELADO="Cancelado",i.SLC_CANCELAMENTO="Slc. Canc.",i}({}),t=function(i){return i.PROPEDEUTICO="Proped\xeautico",i.FILOSOFIA="Filosofia",i.TEOLOGIA="Teologia",i.TIROCINIO="Tiroc\xednio",i}({}),a=function(i){return i.SEMINARISTA="Seminarista",i.FORMADOR="Formador",i.REITOR="Reitor",i.CONSELHO_GESTOR="Conselho Gestor",i.OUTROS="Outros",i}({}),e=function(i){return i.EM_ANALISE="Em an\xe1lise",i.CORRECAO="Solicitado corre\xe7\xe3o",i.APROVADO="Aprovado",i.DEPOSITADO="Depositado",i}({})}}]);