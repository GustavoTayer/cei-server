(window.webpackJsonp=window.webpackJsonp||[]).push([[32],{v04h:function(t,e,a){"use strict";a.r(e),a.d(e,"SolicitacoesModule",(function(){return p}));var o=a("ofXK"),i=a("3Pt+"),c=a("tyNb"),r=a("LRne"),n=a("lJxs"),s=a("JIr8"),l=a("8/IB"),u=a("fXoL");let d=(()=>{class t{constructor(t,e){this.solicitacaoService=t,this.router=e}canActivate(){return this.solicitacaoService.validarTelaAdmin().pipe(Object(n.a)(t=>!!t.autorizado||(this.router.navigate(["/pages/403"]),!1)),Object(s.a)(t=>(this.router.navigate(["/pages/403"]),Object(r.a)(!1))))}}return t.\u0275fac=function(e){return new(e||t)(u.cc(l.a),u.cc(c.c))},t.\u0275prov=u.Ob({token:t,factory:t.\u0275fac,providedIn:"root"}),t})(),h=(()=>{class t{constructor(t,e){this.solicitacaoService=t,this.router=e}canActivate(){return this.solicitacaoService.validarTelaRelatorio().pipe(Object(n.a)(t=>!!t.autorizado||(this.router.navigate(["/pages/403"]),!1)),Object(s.a)(t=>(this.router.navigate(["/pages/403"]),Object(r.a)(!1))))}}return t.\u0275fac=function(e){return new(e||t)(u.cc(l.a),u.cc(c.c))},t.\u0275prov=u.Ob({token:t,factory:t.\u0275fac,providedIn:"root"}),t})(),p=(()=>{class t{}return t.\u0275mod=u.Qb({type:t}),t.\u0275inj=u.Pb({factory:function(e){return new(e||t)},imports:[[o.c,i.h,c.g.forChild([{path:"",children:[{path:"",canActivate:[d],loadChildren:()=>Promise.all([a.e(3),a.e(4),a.e(31)]).then(a.bind(null,"THZu")).then(t=>t.SolicitacoesListaModule)},{path:"relatorio",canActivate:[h],loadChildren:()=>Promise.all([a.e(4),a.e(0),a.e(11)]).then(a.bind(null,"S7sw")).then(t=>t.SolicitacoesRelatorioModule)}]}])]]}),t})()}}]);