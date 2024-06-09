import{a as z}from"./chunk-4KXO33M5.js";import{a as te}from"./chunk-OGQQ44XV.js";import{a as K}from"./chunk-22XSY4EJ.js";import{a as ie}from"./chunk-55FSNNZ2.js";import{d as L}from"./chunk-6M6LJACB.js";import{a as ae}from"./chunk-UQYYX3ZV.js";import{a as se}from"./chunk-ZOJYGP6Z.js";import{a as oe,b as ne,c as re}from"./chunk-U34JSWL2.js";import{a as W,c as M,e as P,j as X,k as Y,l as Z,o as F}from"./chunk-B2HCO65P.js";import"./chunk-BPTFILPP.js";import{b as ee}from"./chunk-5N72VQB2.js";import"./chunk-VSPTT5AX.js";import{e as A,g as I,t as V,v as j}from"./chunk-BJBUZF5B.js";import{$a as c,Bb as E,Eb as q,Gb as T,Hb as k,Ib as Q,Jb as J,Ra as l,Sa as w,Va as D,a as B,b as N,ba as G,cb as h,ea as U,eb as $,fb as H,ga as x,gb as t,ha as b,hb as i,ia as u,ib as f,ja as C,lb as S,pb as m,qb as v,tb as O,ub as p,wb as y,xb as R}from"./chunk-GQGQXF3A.js";var pe=(()=>{let r=class r{transform(a,n,o){let _,d;return o==="true"?_=!0:o==="false"?_=!1:_=null,_!==null?d=a.filter(g=>g.activo==_):_===null&&(d=a),n=n.toLocaleLowerCase(),n.length!==0?d.filter(g=>g.descripcion.toLocaleLowerCase().includes(n)):d}};r.\u0275fac=function(n){return new(n||r)},r.\u0275pipe=U({name:"filtroTiposGastos",type:r,pure:!0,standalone:!0});let e=r;return e})();function ve(e,r){if(e&1&&(t(0,"div",14)(1,"div",15)(2,"p",16),p(3," Fecha de alta "),i(),t(4,"div",17),p(5),T(6,"fecha"),i()(),t(7,"div",18)(8,"p",16),p(9," Usuario creador "),i(),t(10,"div",19),p(11),i()()()),e&2){let s=v();l(5),y(" ",k(6,3,s.tiposGastosService.tipoSeleccionado.createdAt)," "),l(6),R(" ",s.tiposGastosService.tipoSeleccionado.creatorUser.apellido.toLowerCase()," ",s.tiposGastosService.tipoSeleccionado.creatorUser.nombre.toLowerCase()," ")}}function _e(e,r){if(e&1){let s=S();t(0,"button",20),m("click",function(){x(s);let n=v();return b(n.nuevoTipo())}),p(1," Crear tipo "),i()}}function ge(e,r){if(e&1){let s=S();t(0,"button",21),m("click",function(){x(s);let n=v();return b(n.actualizarTipo())}),p(1," Actualizar tipo "),i()}}var ce=(()=>{let r=class r{constructor(a,n,o){this.authService=a,this.alertService=n,this.tiposGastosService=o,this.insertEvent=new D,this.updateEvent=new D}ngOnInit(){}nuevoTipo(){if(this.tiposGastosService.abmForm.descripcion==="")return this.alertService.info("La descripci\xF3n es obligatoria");this.alertService.loading();let a=N(B({},this.tiposGastosService.abmForm),{creatorUserId:this.authService.usuario.userId});this.tiposGastosService.nuevoTipo(a).subscribe({next:({tipo:n})=>{this.insertEvent.emit(n),this.tiposGastosService.showModalAbm=!1},error:({error:n})=>this.alertService.errorApi(n.message)})}actualizarTipo(){if(this.tiposGastosService.abmForm.descripcion==="")return this.alertService.info("La descripci\xF3n es obligatoria");this.alertService.loading();let a=N(B({},this.tiposGastosService.abmForm),{creatorUserId:this.authService.usuario.userId});this.tiposGastosService.actualizarTipo(this.tiposGastosService.tipoSeleccionado.id,a).subscribe({next:({tipo:n})=>{this.updateEvent.emit(n),this.tiposGastosService.showModalAbm=!1},error:({error:n})=>this.alertService.errorApi(n.message)})}submit(){this.tiposGastosService.estadoAbm==="crear"?this.nuevoTipo():this.actualizarTipo()}};r.\u0275fac=function(n){return new(n||r)(w(K),w(j),w(z))},r.\u0275cmp=G({type:r,selectors:[["app-abm-tipo-gasto"]],outputs:{insertEvent:"insertEvent",updateEvent:"updateEvent"},standalone:!0,features:[E],decls:18,vars:6,consts:[[3,"showModal"],[1,"flex","items-center","justify-between","bg-gray-800","rounded-t","p-2"],[1,"text-white","px-2","py-1","rounded-t","text-lg"],["width","20","height","20","viewBox","0 0 24 24","fill","none","stroke","currentColor","stroke-width","2","stroke-linecap","round","stroke-linejoin","round",1,"cursor-pointer","feather","feather-x","text-white","mr-2",3,"click"],["x1","18","y1","6","x2","6","y2","18"],["x1","6","y1","6","x2","18","y2","18"],[1,"px-4","pt-2","max-h-96","overflow-y-auto","text-sm"],[1,"font-semibold"],[1,"text-red-500"],["placeholder","Ej. Pago de sueldo","type","text",1,"input-generico","w-full","mt-2","mb-2",3,"ngModel","keyup.enter","ngModelChange"],["class","xl:flex items-center",4,"ngIf"],[1,"px-4","pb-2"],["class","boton-crear w-full mt-1",3,"click",4,"ngIf"],["class","boton-editar w-full mt-4",3,"click",4,"ngIf"],[1,"xl:flex","items-center"],[1,"xl:w-1/2"],[1,"font-semibold","text-sm"],[1,"border","text-sm","mt-2","border-gray-400","rounded","p-2","bg-gray-100"],[1,"xl:ml-4","xl:w-1/2","xl:mt-0"],[1,"border","text-sm","capitalize","mt-2","border-gray-400","rounded","p-2","bg-gray-100"],[1,"boton-crear","w-full","mt-1",3,"click"],[1,"boton-editar","w-full","mt-4",3,"click"]],template:function(n,o){n&1&&(t(0,"app-modal",0)(1,"div")(2,"div",1)(3,"h1",2),p(4),i(),u(),t(5,"svg",3),m("click",function(){return o.tiposGastosService.showModalAbm=!1}),f(6,"line",4)(7,"line",5),i()(),C(),t(8,"div",6)(9,"p",7)(10,"span",8),p(11," * "),i(),p(12," Descripci\xF3n "),i(),t(13,"input",9),m("keyup.enter",function(){return o.submit()})("ngModelChange",function(d){return o.tiposGastosService.abmForm.descripcion=d}),i(),h(14,ve,12,5,"div",10),i(),t(15,"div",11),h(16,_e,2,0,"button",12)(17,ge,2,0,"button",13),i()()()),n&2&&(c("showModal",o.tiposGastosService.showModalAbm),l(4),y(" ",o.tiposGastosService.estadoAbm=="crear"?"Creando tipo":"Editando tipo"," "),l(9),c("ngModel",o.tiposGastosService.abmForm.descripcion),l(),c("ngIf",o.tiposGastosService.tipoSeleccionado&&o.tiposGastosService.estadoAbm==="editar"),l(2),c("ngIf",o.tiposGastosService.estadoAbm=="crear"),l(),c("ngIf",o.tiposGastosService.estadoAbm=="editar"))},dependencies:[I,A,F,W,M,P,L,ie,V],encapsulation:2});let e=r;return e})();function he(e,r){if(e&1){let s=S();t(0,"button",46),m("click",function(){x(s);let n=v();return b(n.abrirAbm("crear"))}),u(),t(1,"svg",47),f(2,"path",48),i()()}}function xe(e,r){e&1&&(u(),t(0,"svg",49),f(1,"polyline",50),i())}function be(e,r){e&1&&(u(),t(0,"svg",51),f(1,"polyline",52),i())}function Se(e,r){e&1&&(u(),t(0,"svg",53),f(1,"line",54),i())}function we(e,r){e&1&&(u(),t(0,"svg",49),f(1,"polyline",50),i())}function ye(e,r){e&1&&(u(),t(0,"svg",51),f(1,"polyline",52),i())}function Te(e,r){e&1&&(u(),t(0,"svg",53),f(1,"line",54),i())}function Ce(e,r){e&1&&(u(),t(0,"svg",49),f(1,"polyline",50),i())}function Ge(e,r){e&1&&(u(),t(0,"svg",51),f(1,"polyline",52),i())}function Ee(e,r){e&1&&(u(),t(0,"svg",53),f(1,"line",54),i())}function ke(e,r){if(e&1){let s=S();t(0,"th",55)(1,"div",35),m("click",function(){x(s);let n=v();return b(n.ordenarPorColumna("activo"))}),t(2,"span"),p(3," Estado "),i(),t(4,"span",42),h(5,Ce,2,0,"svg",37)(6,Ge,2,0,"svg",38)(7,Ee,2,0,"svg",39),i()()()}if(e&2){let s=v();l(5),c("ngIf",s.ordenar.columna=="activo"&&s.ordenar.direccion=="asc"),l(),c("ngIf",s.ordenar.columna=="activo"&&s.ordenar.direccion=="desc"),l(),c("ngIf",s.ordenar.columna!="activo")}}function Ae(e,r){e&1&&(t(0,"th",55),p(1," Acci\xF3n "),i())}var Ie=(e,r)=>r.id;function Ve(e,r){if(e&1){let s=S();t(0,"td",57)(1,"app-pastilla-estado",62),m("click",function(){x(s);let n=v().$implicit,o=v(2);return b(o.actualizarEstado(n))}),i()()}if(e&2){let s=v().$implicit;l(),c("activo",s.activo)}}function Me(e,r){if(e&1){let s=S();t(0,"td",63)(1,"span",64)(2,"button",65),m("click",function(){x(s);let n=v().$implicit,o=v(2);return b(o.abrirAbm("editar",n))}),u(),t(3,"svg",47),f(4,"path",66),i()()()()}}function Pe(e,r){if(e&1&&(t(0,"tr",56)(1,"td",57)(2,"p",58),p(3),i()(),t(4,"td",57)(5,"p",59),p(6),T(7,"fecha"),i()(),h(8,Ve,2,1,"td",60)(9,Me,5,0,"td",61),i()),e&2){let s=r.$implicit,a=v(2);l(3),y(" ",s.descripcion," "),l(3),y(" ",k(7,4,s.createdAt)," "),l(2),c("appPermisos",a.permiso_escritura),l(),c("appPermisos",a.permiso_escritura)}}function Fe(e,r){e&1&&(t(0,"tr",67),p(1," a "),i(),t(2,"tr",68)(3,"td",69),p(4," No se encontraron tipos "),i()())}var je=(e,r)=>({itemsPerPage:e,currentPage:r});function Le(e,r){if(e&1&&(t(0,"tbody"),$(1,Pe,10,6,"tr",70,Ie,!1,Fe,5,0),T(4,"paginate"),T(5,"filtroTiposGastos"),i()),e&2){let s=v();l(),H(Q(4,1,J(5,4,s.tiposGastosService.tipos,s.filtro.parametro,s.filtro.activo),q(8,je,s.cantidadItems,s.paginaActual)))}}function ze(e,r){if(e&1){let s=S();t(0,"div",71)(1,"pagination-controls",72),m("pageChange",function(n){x(s);let o=v();return b(o.paginaActual=n)}),i()()}}var ct=(()=>{let r=class r{constructor(a,n,o){this.tiposGastosService=a,this.alertService=n,this.dataService=o,this.permiso_escritura=["TIPOS_GASTOS_ALL"],this.paginaActual=1,this.cantidadItems=10,this.filtro={activo:"true",parametro:""},this.ordenar={direccion:"desc",columna:"descripcion"}}ngOnInit(){this.dataService.ubicacionActual="Dashboard - Tipos de gastos",this.alertService.loading(),this.listarTipos()}abrirAbm(a,n=null){this.tiposGastosService.abrirAbm(a,n)}nuevoTipo(a){this.tiposGastosService.tipos=[a,...this.tiposGastosService.tipos],this.alertService.close()}actualizarTipo(a){let n=this.tiposGastosService.tipos.findIndex(o=>o.id===a.id);this.tiposGastosService.tipos[n]=a,this.tiposGastosService.tipos=[...this.tiposGastosService.tipos],this.alertService.close()}listarTipos(){let a={direccion:this.ordenar.direccion,columna:this.ordenar.columna};this.tiposGastosService.listarTipos(a).subscribe({next:({tipos:n})=>{this.tiposGastosService.tipos=n,this.alertService.close()},error:({error:n})=>this.alertService.errorApi(n.message)})}actualizarEstado(a){let{id:n,activo:o}=a;this.alertService.question({msg:"\xBFQuieres actualizar el estado?",buttonText:"Actualizar"}).then(({isConfirmed:_})=>{_&&(this.alertService.loading(),this.tiposGastosService.actualizarTipo(n,{activo:!o}).subscribe({next:()=>{this.listarTipos()},error:({error:d})=>this.alertService.errorApi(d.message)}))})}filtrarActivos(a){this.paginaActual=1,this.filtro.activo=a}filtrarParametro(a){this.paginaActual=1,this.filtro.parametro=a}ordenarPorColumna(a){this.ordenar.columna=a,this.ordenar.direccion=this.ordenar.direccion=="asc"?"desc":"asc",this.alertService.loading(),this.listarTipos()}};r.\u0275fac=function(n){return new(n||r)(w(z),w(j),w(ee))},r.\u0275cmp=G({type:r,selectors:[["app-tipos-gastos"]],standalone:!0,features:[E],decls:68,vars:13,consts:[[3,"insertEvent","updateEvent"],[1,"md:max-w-7xl","mx-auto"],[1,"container","mx-auto"],[1,"flex","items-center","justify-between","bg-gray-800","px-4","py-3","rounded-t"],[1,"ml-2","text-white"],[1,"text-xl","md:text-2xl","leading-tight"],["title","Nuevo tipo","class","boton-nuevo-header",3,"click",4,"appPermisos"],[1,"md:flex","md:items-center","md:justify-between","px-4","py-2"],[1,"my-2","flex","sm:flex-row","flex-col"],[1,"flex","flex-row","mb-1","sm:mb-0"],[1,"relative","w-full","md:w-auto"],[1,"h-full","text-sm","rounded-r","border-t","border-l","rounded-l","sm:rounded-r-none","sm:border-r-0","border-r","border-b","block","appearance-none","w-full","bg-white","border-gray-400","text-gray-700","py-2","px-4","pr-8","leading-tight","focus:outline-none","focus:border-l","focus:border-r","focus:bg-white","focus:border-gray-500",3,"change"],["txtActivo",""],["value","true"],["value","false"],["value",""],[1,"pointer-events-none","absolute","inset-y-0","right-0","flex","items-center","px-2","text-gray-700"],["viewBox","0 0 20 20",1,"fill-current","h-4","w-4"],["d","M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"],[1,"block","relative"],[1,"h-full","absolute","inset-y-0","left-0","flex","items-center","pl-2"],["viewBox","0 0 24 24",1,"h-4","w-4","fill-current","text-gray-500","cursor-pointer","hover:text-secondary-500"],["d","M10 4a6 6 0 100 12 6 6 0 000-12zm-8 6a8 8 0 1114.32 4.906l5.387 5.387a1 1 0 01-1.414 1.414l-5.387-5.387A8 8 0 012 10z"],["placeholder","Buscar",1,"appearance-none","rounded-r","rounded-l","sm:rounded-l-none","border","border-gray-400","border-b","block","pl-8","pr-6","py-2","w-full","bg-white","text-sm","placeholder-gray-400","text-gray-700","focus:bg-white","focus:placeholder-gray-600","focus:text-gray-700","focus:outline-none",3,"keyup"],["txtParametro",""],[1,"bg-white","text-sm","focus:outline-none","w-full","md:w-max","px-2","py-2","md:py-0","md:ml-2","mt-2","md:mt-0","border","text-gray-600","border-gray-400","rounded",3,"ngModel","change","ngModelChange"],["value","10"],["value","20"],["value","50"],["value","100"],[1,"px-4","py-2","overflow-x-auto"],[1,"inline-block","max-h-96","overflow-y-auto","min-w-full","pb-5"],[1,"min-w-full","leading-normal"],[1,"border"],[1,"px-5","py-2","border-b-2","border-gray-200","bg-gray-100","text-left","text-sm","font-semibold","text-gray-900","tracking-wider"],[1,"cursor-pointer","flex","items-center","focus:outline-none",3,"click"],[1,"ml-2","text-gray-600"],["width","15","height","15","viewBox","0 0 24 24","fill","none","stroke","currentColor","stroke-width","2","stroke-linecap","round","stroke-linejoin","round","class","feather feather-chevron-down",4,"ngIf"],["width","15","height","15","viewBox","0 0 24 24","fill","none","stroke","currentColor","stroke-width","2","stroke-linecap","round","stroke-linejoin","round","class","feather feather-chevron-up",4,"ngIf"],["width","15","height","15","viewBox","0 0 24 24","fill","none","stroke","currentColor","stroke-width","2","stroke-linecap","round","stroke-linejoin","round","class","feather feather-minus",4,"ngIf"],[1,"px-5","border-b-2","border-gray-200","bg-gray-100","text-sm","font-semibold","text-gray-900","tracking-wider"],[1,"cursor-pointer","w-max","flex","items-center","justify-center","focus:outline-none",3,"click"],[1,"ml-2"],["class","px-5 border-b-2 border-gray-200 bg-gray-100 text-center text-sm font-semibold text-gray-900 tracking-wider",4,"appPermisos"],[4,"ngIf"],["class","px-5 text-sm py-5 mt-4 bg-white border-t flex shadow flex-col xs:flex-row items-center xs:justify-between",4,"ngIf"],["title","Nuevo tipo",1,"boton-nuevo-header",3,"click"],["xmlns","http://www.w3.org/2000/svg","fill","none","viewBox","0 0 24 24","stroke-width","1.5","stroke","currentColor",1,"w-5","h-5"],["stroke-linecap","round","stroke-linejoin","round","d","M12 4.5v15m7.5-7.5h-15"],["width","15","height","15","viewBox","0 0 24 24","fill","none","stroke","currentColor","stroke-width","2","stroke-linecap","round","stroke-linejoin","round",1,"feather","feather-chevron-down"],["points","6 9 12 15 18 9"],["width","15","height","15","viewBox","0 0 24 24","fill","none","stroke","currentColor","stroke-width","2","stroke-linecap","round","stroke-linejoin","round",1,"feather","feather-chevron-up"],["points","18 15 12 9 6 15"],["width","15","height","15","viewBox","0 0 24 24","fill","none","stroke","currentColor","stroke-width","2","stroke-linecap","round","stroke-linejoin","round",1,"feather","feather-minus"],["x1","5","y1","12","x2","19","y2","12"],[1,"px-5","border-b-2","border-gray-200","bg-gray-100","text-center","text-sm","font-semibold","text-gray-900","tracking-wider"],[1,"animate__animated","animate__fadeIn"],[1,"px-5","py-2","border-b","border-gray-200","text-xs"],[1,"text-gray-900","w-max","whitespace-no-wrap","p-2"],[1,"text-gray-900","whitespace-no-wrap"],["class","px-5 py-2 border-b border-gray-200 text-xs",4,"appPermisos"],["class","px-5 py-2 border-b border-gray-200 text-xs text-center",4,"appPermisos"],[3,"activo","click"],[1,"px-5","py-2","border-b","border-gray-200","text-xs","text-center"],[1,"flex","items-center","justify-center","text-gray-900","whitespace-no-wrap"],["title","Editar tipo",1,"boton-editar","ml-2",3,"click"],["stroke-linecap","round","stroke-linejoin","round","d","M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"],[1,"p-4","text-white"],[1,"w-full"],["colspan","4",1,"text-gray-500","text-sm","p-2","border","border-gray-300","text-center","bg-gray-50","mt-4"],["class","animate__animated animate__fadeIn"],[1,"px-5","text-sm","py-5","mt-4","bg-white","border-t","flex","shadow","flex-col","xs:flex-row","items-center","xs:justify-between"],["nextLabel","Siguiente","previousLabel","Anterior",3,"pageChange"]],template:function(n,o){if(n&1){let _=S();t(0,"app-abm-tipo-gasto",0),m("insertEvent",function(g){return o.nuevoTipo(g)})("updateEvent",function(g){return o.actualizarTipo(g)}),i(),t(1,"div",1)(2,"app-tarjeta-lista")(3,"div",2)(4,"div")(5,"div",3)(6,"div",4)(7,"h2",5),p(8," Tipos de gastos "),i(),t(9,"p"),p(10),i()(),t(11,"div"),h(12,he,3,0,"button",6),i()(),t(13,"div",7)(14,"div",8)(15,"div",9)(16,"div",10)(17,"select",11,12),m("change",function(){x(_);let g=O(18);return b(o.filtrarActivos(g.value))}),t(19,"option",13),p(20," Activos "),i(),t(21,"option",14),p(22," Inactivos "),i(),t(23,"option",15),p(24," Todos "),i()(),t(25,"div",16),u(),t(26,"svg",17),f(27,"path",18),i()()()(),C(),t(28,"div",19)(29,"span",20),u(),t(30,"svg",21),f(31,"path",22),i()(),C(),t(32,"input",23,24),m("keyup",function(){x(_);let g=O(33);return b(o.filtrarParametro(g.value))}),i()(),t(34,"select",25),m("change",function(){return o.paginaActual=1})("ngModelChange",function(g){return o.cantidadItems=g}),t(35,"option",26),p(36," 10 elementos "),i(),t(37,"option",27),p(38," 20 elementos "),i(),t(39,"option",28),p(40," 50 elementos "),i(),t(41,"option",29),p(42," 100 elementos "),i()()()(),t(43,"div",30)(44,"div",31)(45,"table",32)(46,"thead")(47,"tr",33)(48,"th",34)(49,"div",35),m("click",function(){return o.ordenarPorColumna("descripcion")}),t(50,"span"),p(51," Descripci\xF3n "),i(),t(52,"span",36),h(53,xe,2,0,"svg",37)(54,be,2,0,"svg",38)(55,Se,2,0,"svg",39),i()()(),t(56,"th",40)(57,"div",41),m("click",function(){return o.ordenarPorColumna("createdAt")}),t(58,"span"),p(59," Fecha de creaci\xF3n "),i(),t(60,"span",42),h(61,we,2,0,"svg",37)(62,ye,2,0,"svg",38)(63,Te,2,0,"svg",39),i()()(),h(64,ke,8,3,"th",43)(65,Ae,2,0,"th",43),i()(),h(66,Le,6,11,"tbody",44),i()()()(),h(67,ze,2,0,"div",45),i()()()}n&2&&(l(10),y(" Total de tipos: ",o.tiposGastosService.tipos.length," "),l(2),c("appPermisos",o.permiso_escritura),l(22),c("ngModel",o.cantidadItems),l(19),c("ngIf",o.ordenar.columna=="descripcion"&&o.ordenar.direccion=="asc"),l(),c("ngIf",o.ordenar.columna=="descripcion"&&o.ordenar.direccion=="desc"),l(),c("ngIf",o.ordenar.columna!="descripcion"),l(6),c("ngIf",o.ordenar.columna=="createdAt"&&o.ordenar.direccion=="asc"),l(),c("ngIf",o.ordenar.columna=="createdAt"&&o.ordenar.direccion=="desc"),l(),c("ngIf",o.ordenar.columna!="createdAt"),l(),c("appPermisos",o.permiso_escritura),l(),c("appPermisos",o.permiso_escritura),l(),c("ngIf",o.tiposGastosService.tipos),l(),c("ngIf",o.tiposGastosService.tipos.length>o.cantidadItems))},dependencies:[I,A,F,Y,Z,X,M,P,L,re,oe,ne,V,ae,se,pe,ce,te],encapsulation:2});let e=r;return e})();export{ct as default};