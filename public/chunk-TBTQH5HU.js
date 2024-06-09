import{a as X}from"./chunk-VZ6DWDHM.js";import{a as L}from"./chunk-22XSY4EJ.js";import{a as W}from"./chunk-AZJWBWL5.js";import"./chunk-55FSNNZ2.js";import{d as z}from"./chunk-6M6LJACB.js";import{a as Q}from"./chunk-ZOJYGP6Z.js";import{a as q,b as J,c as K}from"./chunk-U34JSWL2.js";import{a as B,c as D,e as N,j as H,k as U,l as Z,o as O}from"./chunk-B2HCO65P.js";import"./chunk-BPTFILPP.js";import{b as R}from"./chunk-5N72VQB2.js";import"./chunk-VSPTT5AX.js";import{c as V,e as P,g as G,q as A,t as F,v as $}from"./chunk-BJBUZF5B.js";import{$a as l,Bb as I,Db as C,Eb as x,Fb as T,Gb as S,Hb as j,Ib as M,Ra as r,Sa as h,ba as b,cb as v,eb as w,fb as k,gb as e,hb as n,ia as c,ib as m,ja as y,pb as g,qb as E,ub as s,wb as _}from"./chunk-GQGQXF3A.js";function ee(t,a){t&1&&(c(),e(0,"svg",42),m(1,"polyline",43),n())}function te(t,a){t&1&&(c(),e(0,"svg",44),m(1,"polyline",45),n())}function ne(t,a){t&1&&(c(),e(0,"svg",46),m(1,"line",47),n())}function ie(t,a){t&1&&(c(),e(0,"svg",42),m(1,"polyline",43),n())}function ae(t,a){t&1&&(c(),e(0,"svg",44),m(1,"polyline",45),n())}function re(t,a){t&1&&(c(),e(0,"svg",46),m(1,"line",47),n())}function oe(t,a){t&1&&(c(),e(0,"svg",42),m(1,"polyline",43),n())}function le(t,a){t&1&&(c(),e(0,"svg",44),m(1,"polyline",45),n())}function se(t,a){t&1&&(c(),e(0,"svg",46),m(1,"line",47),n())}function me(t,a){t&1&&(c(),e(0,"svg",42),m(1,"polyline",43),n())}function ce(t,a){t&1&&(c(),e(0,"svg",44),m(1,"polyline",45),n())}function de(t,a){t&1&&(c(),e(0,"svg",46),m(1,"line",47),n())}function pe(t,a){t&1&&(c(),e(0,"svg",42),m(1,"polyline",43),n())}function ge(t,a){t&1&&(c(),e(0,"svg",44),m(1,"polyline",45),n())}function ue(t,a){t&1&&(c(),e(0,"svg",46),m(1,"line",47),n())}function fe(t,a){t&1&&(c(),e(0,"svg",42),m(1,"polyline",43),n())}function ve(t,a){t&1&&(c(),e(0,"svg",44),m(1,"polyline",45),n())}function _e(t,a){t&1&&(c(),e(0,"svg",46),m(1,"line",47),n())}var he=(t,a)=>a.id,Ce=t=>({"bg-pink-100":t}),Se=t=>["/dashboard/cajas-detalles",t],Y=(t,a)=>({"bg-pink-700":t,"bg-secondaryColor":a}),ye=t=>["/dashboard/ventas-caja",t];function xe(t,a){if(t&1&&(e(0,"tr",48)(1,"td",49)(2,"p",50),s(3),n()(),e(4,"td",49)(5,"p",51),s(6),S(7,"fecha"),n()(),e(8,"td",49)(9,"p",50),s(10),n()(),e(11,"td",49)(12,"p",50),s(13),S(14,"moneda"),n()(),e(15,"td",49)(16,"p",51),s(17),n()(),e(18,"td",49)(19,"p",51),s(20),n()(),e(21,"td",52)(22,"span",53)(23,"button",54),c(),e(24,"svg",55),m(25,"path",56)(26,"path",57),n()(),y(),e(27,"button",58),c(),e(28,"svg",55),m(29,"path",59),n()()()()()),t&2){let o=a.$implicit;l("ngClass",C(15,Ce,o.activo)),r(3),_(" ",o.id," "),r(3),_(" ",o.activo?"En proceso":j(7,11,o.fechaCaja)," "),r(4),_(" ",o.activo?"En proceso":o.cantidadVentas," "),r(3),_(" ",o.activo?"En proceso":"$"+j(14,13,o.totalVentas)," "),r(4),_(" ",o.activo?"Abierta":"Cerrada"," "),r(3),_(" ",o.activo?"En proceso":o.creatorUser.apellido+" "+o.creatorUser.nombre," "),r(3),l("routerLink",o.activo?"/dashboard/cajas":C(17,Se,o.id))("ngClass",x(19,Y,o.activo,!o.activo)),r(4),l("routerLink",o.activo?"/dashboard/ventas-activas":C(22,ye,o.id))("ngClass",x(24,Y,o.activo,!o.activo))}}function je(t,a){t&1&&(e(0,"tr",60),s(1," a "),n(),e(2,"tr",61)(3,"td",62),s(4," No se encontraron cajas "),n()())}var be=(t,a,o)=>({itemsPerPage:t,currentPage:a,totalItems:o});function we(t,a){if(t&1&&(e(0,"tbody"),w(1,xe,30,27,"tr",63,he,!1,je,5,0),S(4,"paginate"),n()),t&2){let o=E();r(),k(M(4,1,o.cajas,T(4,be,o.cantidadItems,o.paginaActual,o.totalItems)))}}var $e=(()=>{let a=class a{constructor(p,u,i,d){this.cajasService=p,this.authService=u,this.alertService=i,this.dataService=d,this.showModalCaja=!1,this.estadoFormulario="crear",this.idCaja="",this.cajas=[],this.descripcion="",this.paginaActual=1,this.cantidadItems=10,this.filtro={activo:"",parametro:"",fechaDesde:"",fechaHasta:""},this.ordenar={direccion:"desc",columna:"id"}}ngOnInit(){this.dataService.ubicacionActual="Dashboard - Listado de cajas",this.alertService.loading(),this.listarCajas()}listarCajas(){let p={direccion:this.ordenar.direccion,columna:this.ordenar.columna,activo:this.filtro.activo,fechaDesde:this.filtro.fechaDesde,fechaHasta:this.filtro.fechaHasta};this.cajasService.listarCajas(p).subscribe({next:({cajas:u,totalItems:i})=>{this.totalItems=i,this.cajas=u,this.showModalCaja=!1,this.alertService.close()},error:({error:u})=>this.alertService.errorApi(u.message)})}filtrarActivos(p){this.paginaActual=1,this.filtro.activo=p}filtrarParametro(p){this.paginaActual=1,this.filtro.parametro=p}ordenarPorColumna(p){this.ordenar.columna=p,this.ordenar.direccion=this.ordenar.direccion=="asc"?"desc":"asc",this.alertService.loading(),this.listarCajas()}cambiarPagina(p){this.alertService.loading(),this.paginaActual=p,this.listarCajas()}};a.\u0275fac=function(u){return new(u||a)(h(X),h(L),h($),h(R))},a.\u0275cmp=b({type:a,selectors:[["app-cajas"]],standalone:!0,features:[I],decls:95,vars:24,consts:[[1,"md:max-w-7xl","mx-auto"],[1,"container","mx-auto"],[1,"flex","items-center","justify-between","bg-gray-800","px-4","py-3","rounded-t"],[1,"ml-2","text-white"],[1,"text-xl","md:text-2xl","leading-tight"],[1,"md:flex","md:items-center","md:justify-between","px-4","py-2"],[1,"my-2","flex","sm:flex-row","flex-col"],[1,"flex","flex-row","mb-1","sm:mb-0"],[1,"relative","w-full","md:w-auto"],[1,"h-full","text-sm","rounded-r","border-t","border-l","rounded-l","border-r","border-b","block","appearance-none","w-full","bg-white","border-gray-400","text-gray-700","py-2","px-4","pr-8","leading-tight","focus:outline-none","focus:border-l","focus:border-r","focus:bg-white","focus:border-gray-500",3,"ngModel","ngModelChange","change"],["value","true"],["value","false"],["value",""],[1,"pointer-events-none","absolute","inset-y-0","right-0","flex","items-center","px-2","text-gray-700"],["viewBox","0 0 20 20",1,"fill-current","h-4","w-4"],["d","M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"],[1,"block","relative"],[1,"bg-white","text-sm","focus:outline-none","w-full","md:w-max","px-2","py-2","md:py-0","md:ml-2","mt-2","md:mt-0","border","text-gray-600","border-gray-400","rounded",3,"ngModel","ngModelChange","change"],["value","10"],["value","20"],["value","50"],["value","100"],["onkeydown","return false","type","date",1,"bg-white","text-sm","focus:outline-none","w-full","md:w-max","px-2","py-2","md:py-0","md:ml-2","mt-2","md:mt-0","border","text-gray-600","border-gray-400","rounded",3,"ngModel","change","ngModelChange"],[1,"px-4","py-2","overflow-x-auto"],[1,"inline-block","max-h-96","overflow-y-auto","min-w-full","pb-5"],[1,"min-w-full","leading-normal"],[1,"border"],[1,"px-5","py-2","border-b-2","border-gray-200","bg-gray-100","text-left","text-sm","font-semibold","text-gray-900","tracking-wider"],[1,"cursor-pointer","flex","items-center","focus:outline-none",3,"click"],[1,"ml-2","text-gray-600"],["width","15","height","15","viewBox","0 0 24 24","fill","none","stroke","currentColor","stroke-width","2","stroke-linecap","round","stroke-linejoin","round","class","feather feather-chevron-down",4,"ngIf"],["width","15","height","15","viewBox","0 0 24 24","fill","none","stroke","currentColor","stroke-width","2","stroke-linecap","round","stroke-linejoin","round","class","feather feather-chevron-up",4,"ngIf"],["width","15","height","15","viewBox","0 0 24 24","fill","none","stroke","currentColor","stroke-width","2","stroke-linecap","round","stroke-linejoin","round","class","feather feather-minus",4,"ngIf"],[1,"px-5","border-b-2","border-gray-200","bg-gray-100","text-center","text-sm","font-semibold","text-gray-900","tracking-wider"],[1,"cursor-pointer","w-max","flex","items-center","focus:outline-none",3,"click"],[1,"ml-2"],[1,"cursor-pointer","flex","w-max","items-center","focus:outline-none",3,"click"],[1,"px-5","border-b-2","border-gray-200","bg-gray-100","text-sm","font-semibold","text-gray-900","tracking-wider"],[1,"cursor-pointer","w-max","flex","items-center","justify-center","focus:outline-none",3,"click"],[4,"ngIf"],[1,"px-5","py-5","mt-4","text-sm","bg-white","border-t","flex","shadow","flex-col","xs:flex-row","items-center","xs:justify-between"],["nextLabel","Siguiente","previousLabel","Anterior",3,"pageChange"],["width","15","height","15","viewBox","0 0 24 24","fill","none","stroke","currentColor","stroke-width","2","stroke-linecap","round","stroke-linejoin","round",1,"feather","feather-chevron-down"],["points","6 9 12 15 18 9"],["width","15","height","15","viewBox","0 0 24 24","fill","none","stroke","currentColor","stroke-width","2","stroke-linecap","round","stroke-linejoin","round",1,"feather","feather-chevron-up"],["points","18 15 12 9 6 15"],["width","15","height","15","viewBox","0 0 24 24","fill","none","stroke","currentColor","stroke-width","2","stroke-linecap","round","stroke-linejoin","round",1,"feather","feather-minus"],["x1","5","y1","12","x2","19","y2","12"],[1,"animate__animated","animate__fadeIn",3,"ngClass"],[1,"px-5","py-2","border-b","border-gray-200","text-xs"],[1,"text-gray-900","w-max","whitespace-no-wrap"],[1,"text-gray-900","whitespace-no-wrap"],[1,"px-5","py-2","border-b","border-gray-200","text-xs","text-center"],[1,"flex","items-center","justify-center","text-gray-900","whitespace-no-wrap"],["title","Detalles",1,"p-2","hover:opacity-90","text-white","rounded","ml-2",3,"routerLink","ngClass"],["xmlns","http://www.w3.org/2000/svg","fill","none","viewBox","0 0 24 24","stroke-width","1.5","stroke","currentColor",1,"w-5","h-5"],["stroke-linecap","round","stroke-linejoin","round","d","M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"],["stroke-linecap","round","stroke-linejoin","round","d","M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"],["title","Ventas en caja",1,"p-2","hover:opacity-90","text-white","rounded","ml-2",3,"routerLink","ngClass"],["stroke-linecap","round","stroke-linejoin","round","d","M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"],[1,"p-4","text-white"],[1,"w-full"],["colspan","7",1,"text-gray-500","text-sm","p-2","border","border-gray-300","text-center","bg-gray-50","mt-4"],["class","animate__animated animate__fadeIn",3,"ngClass"]],template:function(u,i){u&1&&(e(0,"div",0)(1,"app-tarjeta-lista")(2,"div",1)(3,"div")(4,"div",2)(5,"div",3)(6,"h2",4),s(7," Listado de cajas "),n(),e(8,"p"),s(9),n()(),m(10,"div"),n(),e(11,"div",5)(12,"div",6)(13,"div",7)(14,"div",8)(15,"select",9),g("ngModelChange",function(f){return i.filtro.activo=f})("change",function(){return i.cambiarPagina(1)}),e(16,"option",10),s(17," Abierta "),n(),e(18,"option",11),s(19," Cerradas "),n(),e(20,"option",12),s(21," Todas "),n()(),e(22,"div",13),c(),e(23,"svg",14),m(24,"path",15),n()()()(),y(),m(25,"div",16),e(26,"select",17),g("ngModelChange",function(f){return i.cantidadItems=f})("change",function(){return i.cambiarPagina(1)}),e(27,"option",18),s(28," 10 elementos "),n(),e(29,"option",19),s(30," 20 elementos "),n(),e(31,"option",20),s(32," 50 elementos "),n(),e(33,"option",21),s(34," 100 elementos "),n()(),e(35,"input",22),g("change",function(){return i.cambiarPagina(1)})("ngModelChange",function(f){return i.filtro.fechaDesde=f}),n(),e(36,"input",22),g("change",function(){return i.cambiarPagina(1)})("ngModelChange",function(f){return i.filtro.fechaHasta=f}),n()()(),e(37,"div",23)(38,"div",24)(39,"table",25)(40,"thead")(41,"tr",26)(42,"th",27)(43,"div",28),g("click",function(){return i.ordenarPorColumna("id")}),e(44,"span"),s(45," Numero "),n(),e(46,"span",29),v(47,ee,2,0,"svg",30)(48,te,2,0,"svg",31)(49,ne,2,0,"svg",32),n()()(),e(50,"th",33)(51,"div",34),g("click",function(){return i.ordenarPorColumna("fechaCaja")}),e(52,"span"),s(53," Fecha de caja "),n(),e(54,"span",35),v(55,ie,2,0,"svg",30)(56,ae,2,0,"svg",31)(57,re,2,0,"svg",32),n()()(),e(58,"th",27)(59,"div",28),g("click",function(){return i.ordenarPorColumna("cantidadVentas")}),e(60,"span"),s(61," Ventas "),n(),e(62,"span",29),v(63,oe,2,0,"svg",30)(64,le,2,0,"svg",31)(65,se,2,0,"svg",32),n()()(),e(66,"th",27)(67,"div",36),g("click",function(){return i.ordenarPorColumna("totalVentas")}),e(68,"span"),s(69," Monto total "),n(),e(70,"span",29),v(71,me,2,0,"svg",30)(72,ce,2,0,"svg",31)(73,de,2,0,"svg",32),n()()(),e(74,"th",37)(75,"div",38),g("click",function(){return i.ordenarPorColumna("activo")}),e(76,"span"),s(77," Estado "),n(),e(78,"span",35),v(79,pe,2,0,"svg",30)(80,ge,2,0,"svg",31)(81,ue,2,0,"svg",32),n()()(),e(82,"th",33)(83,"div",28),g("click",function(){return i.ordenarPorColumna("creatorUser.apellido")}),e(84,"span"),s(85," Creador "),n(),e(86,"span",35),v(87,fe,2,0,"svg",30)(88,ve,2,0,"svg",31)(89,_e,2,0,"svg",32),n()()(),e(90,"th",33),s(91," Acci\xF3n "),n()()(),v(92,we,5,8,"tbody",39),n()()()(),e(93,"div",40)(94,"pagination-controls",41),g("pageChange",function(f){return i.cambiarPagina(f)}),n()()()()()),u&2&&(r(9),_(" Total de cajas: ",i.totalItems," "),r(6),l("ngModel",i.filtro.activo),r(11),l("ngModel",i.cantidadItems),r(9),l("ngModel",i.filtro.fechaDesde),r(),l("ngModel",i.filtro.fechaHasta),r(11),l("ngIf",i.ordenar.columna=="id"&&i.ordenar.direccion=="asc"),r(),l("ngIf",i.ordenar.columna=="id"&&i.ordenar.direccion=="desc"),r(),l("ngIf",i.ordenar.columna!="id"),r(6),l("ngIf",i.ordenar.columna=="fechaCaja"&&i.ordenar.direccion=="asc"),r(),l("ngIf",i.ordenar.columna=="fechaCaja"&&i.ordenar.direccion=="desc"),r(),l("ngIf",i.ordenar.columna!="fechaCaja"),r(6),l("ngIf",i.ordenar.columna=="cantidadVentas"&&i.ordenar.direccion=="asc"),r(),l("ngIf",i.ordenar.columna=="cantidadVentas"&&i.ordenar.direccion=="desc"),r(),l("ngIf",i.ordenar.columna!="cantidadVentas"),r(6),l("ngIf",i.ordenar.columna=="totalVentas"&&i.ordenar.direccion=="asc"),r(),l("ngIf",i.ordenar.columna=="totalVentas"&&i.ordenar.direccion=="desc"),r(),l("ngIf",i.ordenar.columna!="totalVentas"),r(6),l("ngIf",i.ordenar.columna=="activo"&&i.ordenar.direccion=="asc"),r(),l("ngIf",i.ordenar.columna=="activo"&&i.ordenar.direccion=="desc"),r(),l("ngIf",i.ordenar.columna!="activo"),r(6),l("ngIf",i.ordenar.columna=="creatorUser.apellido"&&i.ordenar.direccion=="asc"),r(),l("ngIf",i.ordenar.columna=="creatorUser.apellido"&&i.ordenar.direccion=="desc"),r(),l("ngIf",i.ordenar.columna!="creatorUser.apellido"),r(3),l("ngIf",i.cajas))},dependencies:[G,V,P,O,U,Z,B,H,D,N,z,K,q,J,F,A,W,Q],encapsulation:2});let t=a;return t})();export{$e as default};