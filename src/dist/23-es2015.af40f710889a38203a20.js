(window.webpackJsonp=window.webpackJsonp||[]).push([[23],{lu3c:function(r,o,e){"use strict";e.r(o),e.d(o,"LoginModule",(function(){return h}));var t=e("ofXK"),n=e("3Pt+"),s=e("qXBG"),a=e("fXoL"),i=e("tyNb"),l=e("aceb");function c(r,o){if(1&r&&(a.Yb(0,"li",18),a.Jc(1),a.Xb()),2&r){const r=o.$implicit;a.Fb(1),a.Kc(r)}}function u(r,o){if(1&r&&(a.Yb(0,"nb-alert",14),a.Yb(1,"p",15),a.Yb(2,"b"),a.Jc(3,"Ah n\xe3o!"),a.Xb(),a.Xb(),a.Yb(4,"ul",16),a.Hc(5,c,2,1,"li",17),a.Xb(),a.Xb()),2&r){const r=a.kc();a.Fb(5),a.rc("ngForOf",r.errors)}}function b(r,o){1&r&&(a.Yb(0,"p",20),a.Jc(1," Favor digitar o email! "),a.Xb())}function f(r,o){1&r&&(a.Yb(0,"p",20),a.Jc(1," Favor digitar um email v\xe1lido! "),a.Xb())}function m(r,o){if(1&r&&(a.Wb(0),a.Hc(1,b,2,0,"p",19),a.Hc(2,f,2,0,"p",19),a.Vb()),2&r){const r=a.kc();a.Fb(1),a.rc("ngIf",null==r.form.controls.email.errors?null:r.form.controls.email.errors.required),a.Fb(1),a.rc("ngIf",null==r.form.controls.email.errors?null:r.form.controls.email.errors.email)}}function d(r,o){1&r&&(a.Yb(0,"p",20),a.Jc(1," Favor, digitar a senha! "),a.Xb())}function p(r,o){if(1&r&&(a.Wb(0),a.Hc(1,d,2,0,"p",19),a.Vb()),2&r){const r=a.kc();a.Fb(1),a.rc("ngIf",null==r.form.controls.password.errors?null:r.form.controls.password.errors.required)}}let g=(()=>{class r{constructor(r,o,e){this.fb=r,this.auth=o,this.router=e,this.form=this.fb.group({email:[null,[n.x.required,n.x.email]],password:[null,n.x.required]})}ngOnInit(){}login(){this.form.valid&&this.auth.loginUser({email:this.form.value.email,password:this.form.value.password}).subscribe(r=>{localStorage.setItem("usuarioNome",r.name),localStorage.setItem("token",r.token),this.router.navigate(["pages/dashboard"])},r=>{this.errors=r.error&&r.error.errors?r.error.errors:["Erro desconhecido."]})}}return r.\u0275fac=function(o){return new(o||r)(a.Sb(n.c),a.Sb(s.a),a.Sb(i.c))},r.\u0275cmp=a.Mb({type:r,selectors:[["ngx-login"]],decls:23,vars:6,consts:[["id","title",1,"title"],[1,"sub-title"],["outline","danger","role","alert",4,"ngIf"],[3,"formGroup"],[1,"form-control-group"],["for","input-email",1,"label"],["nbInput","","fullWidth","","name","email","id","input-email","placeholder","Email","fieldSize","large","formControlName","email","autofocus","",3,"status"],[4,"ngIf"],[1,"label-with-link"],["for","input-password",1,"label"],["routerLink","../request-password",1,"forgot-password","caption-2"],["nbInput","","fullWidth","","name","password","type","password","id","input-password","placeholder","Senha","fieldSize","large","formControlName","password",3,"status"],["nbButton","","fullWidth","","status","primary","size","large",3,"click"],["aria-label","Register",1,"another-action"],["outline","danger","role","alert"],[1,"alert-title"],[1,"alert-message-list"],["class","alert-message",4,"ngFor","ngForOf"],[1,"alert-message"],["class","caption status-danger",4,"ngIf"],[1,"caption","status-danger"]],template:function(r,o){1&r&&(a.Yb(0,"h1",0),a.Jc(1,"Convivum Interno"),a.Xb(),a.Yb(2,"p",1),a.Jc(3,"Ol\xe1! Bem vindo ao nosso sistema interno para seminaristas e formadores"),a.Xb(),a.Hc(4,u,6,1,"nb-alert",2),a.Yb(5,"form",3),a.Yb(6,"div",4),a.Yb(7,"label",5),a.Jc(8,"Email:"),a.Xb(),a.Tb(9,"input",6),a.Hc(10,m,3,2,"ng-container",7),a.Xb(),a.Yb(11,"div",4),a.Yb(12,"span",8),a.Yb(13,"label",9),a.Jc(14,"Senha:"),a.Xb(),a.Yb(15,"a",10),a.Jc(16,"Forgot Password?"),a.Xb(),a.Xb(),a.Tb(17,"input",11),a.Hc(18,p,2,1,"ng-container",7),a.Xb(),a.Yb(19,"button",12),a.gc("click",(function(){return o.login()})),a.Jc(20," Entrar "),a.Xb(),a.Xb(),a.Yb(21,"section",13),a.Jc(22," N\xe3o possui uma conta? Solicite um convite ao respons\xe1vel.\n"),a.Xb()),2&r&&(a.Fb(4),a.rc("ngIf",o.errors&&o.errors.length),a.Fb(1),a.rc("formGroup",o.form),a.Fb(4),a.rc("status",o.form.controls.email.invalid?"danger":"success"),a.Fb(1),a.rc("ngIf",o.form.controls.email.invalid&&o.form.controls.email.touched),a.Fb(7),a.rc("status",o.form.controls.password.invalid?"danger":"success"),a.Fb(1),a.rc("ngIf",o.form.controls.password.invalid&&o.form.controls.password.touched))},directives:[t.n,n.z,n.o,n.g,l.S,n.b,n.n,n.f,i.f,l.t,l.o,t.m],styles:[""]}),r})(),h=(()=>{class r{}return r.\u0275mod=a.Qb({type:r}),r.\u0275inj=a.Pb({factory:function(o){return new(o||r)},imports:[[t.c,l.R,i.g,n.u,l.p,l.T,l.u,n.h,i.g.forChild([{path:"",component:g}])]]}),r})()}}]);