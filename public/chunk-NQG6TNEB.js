import{a as H}from"./chunk-SN5MITE4.js";import{c as U,e as y,j as b,k as G,l as k,o as j}from"./chunk-B2HCO65P.js";import{a as z}from"./chunk-BPTFILPP.js";import{b as Z}from"./chunk-5N72VQB2.js";import"./chunk-VSPTT5AX.js";import{e as R,g as O,h as I,n as w,q as D,t as L,u as M,v as B}from"./chunk-BJBUZF5B.js";import{$a as p,Bb as P,Ra as _,Sa as h,V,_ as T,ba as N,cb as v,ga as m,gb as e,ha as c,hb as t,ia as u,ib as E,ja as g,lb as C,pb as S,qb as l,ub as n,xb as f}from"./chunk-GQGQXF3A.js";var x=M.base_url+"/usuarios-permisos",J=(()=>{let d=class d{get getToken(){return{Authorization:localStorage.getItem("token")}}constructor(o){this.http=o}getPermiso(o){return this.http.get(`${x}/${o}`,{headers:this.getToken})}listarPermisos({direccion:o="desc",columna:i="createdAt"}){return this.http.get(x,{params:{direccion:String(o),columna:i},headers:this.getToken})}nuevoPermiso(o){return this.http.post(x,o,{headers:this.getToken})}actualizarPermiso(o,i){return this.http.patch(`${x}/${o}`,i,{headers:this.getToken})}};d.\u0275fac=function(i){return new(i||d)(T(I))},d.\u0275prov=V({token:d,factory:d.\u0275fac,providedIn:"root"});let a=d;return a})();function q(a,d){a&1&&(u(),e(0,"svg",5),E(1,"path",25),t())}function K(a,d){a&1&&(u(),e(0,"svg",5),E(1,"path",26),t())}function W(a,d){if(a&1){let s=C();e(0,"div",27)(1,"div",28)(2,"p",29),n(3," Generar ventas "),t(),e(4,"select",30),S("change",function(){m(s);let i=l();return c(i.actualizarPermiso("GENERAR_VENTA"))})("ngModelChange",function(i){m(s);let r=l();return c(r.permisos.GENERAR_VENTA=i)}),e(5,"option",31),n(6," Sin permisos "),t(),e(7,"option",32),n(8," Permisos totales "),t()()(),e(9,"div",28)(10,"p",29),n(11," Ventas activas "),t(),e(12,"select",30),S("change",function(){m(s);let i=l();return c(i.actualizarPermiso("VENTAS_ACTIVAS"))})("ngModelChange",function(i){m(s);let r=l();return c(r.permisos.VENTAS_ACTIVAS=i)}),e(13,"option",33),n(14," Sin permisos "),t(),e(15,"option",34),n(16," Solo lectura "),t(),e(17,"option",35),n(18," Permisos totales "),t()()(),e(19,"div",28)(20,"p",29),n(21," Busqueda ventas "),t(),e(22,"select",30),S("change",function(){m(s);let i=l();return c(i.actualizarPermiso("BUSQUEDA_VENTAS"))})("ngModelChange",function(i){m(s);let r=l();return c(r.permisos.BUSQUEDA_VENTAS=i)}),e(23,"option",36),n(24," Sin permisos "),t(),e(25,"option",37),n(26," Permisos totales "),t()()(),e(27,"div",28)(28,"p",29),n(29," Clientes "),t(),e(30,"select",30),S("change",function(){m(s);let i=l();return c(i.actualizarPermiso("CLIENTES"))})("ngModelChange",function(i){m(s);let r=l();return c(r.permisos.CLIENTES=i)}),e(31,"option",38),n(32," Sin permisos "),t(),e(33,"option",39),n(34," Solo lectura "),t(),e(35,"option",40),n(36," Permisos totales "),t()()()()}if(a&2){let s=l();_(4),p("ngModel",s.permisos.GENERAR_VENTA),_(8),p("ngModel",s.permisos.VENTAS_ACTIVAS),_(10),p("ngModel",s.permisos.BUSQUEDA_VENTAS),_(8),p("ngModel",s.permisos.CLIENTES)}}function X(a,d){a&1&&(u(),e(0,"svg",5),E(1,"path",25),t())}function Y(a,d){a&1&&(u(),e(0,"svg",5),E(1,"path",26),t())}function ee(a,d){if(a&1){let s=C();e(0,"div",27)(1,"div",28)(2,"p",29),n(3," Listado de productos "),t(),e(4,"select",30),S("change",function(){m(s);let i=l();return c(i.actualizarPermiso("LISTADO_PRODUCTOS"))})("ngModelChange",function(i){m(s);let r=l();return c(r.permisos.LISTADO_PRODUCTOS=i)}),e(5,"option",41),n(6," Sin permisos "),t(),e(7,"option",42),n(8," Solo lectura "),t(),e(9,"option",43),n(10," Permisos totales "),t()()(),e(11,"div",28)(12,"p",29),n(13," Ingresos "),t(),e(14,"select",30),S("change",function(){m(s);let i=l();return c(i.actualizarPermiso("INGRESOS"))})("ngModelChange",function(i){m(s);let r=l();return c(r.permisos.INGRESOS=i)}),e(15,"option",44),n(16," Sin permisos "),t(),e(17,"option",45),n(18," Solo lectura "),t(),e(19,"option",46),n(20," Permisos totales "),t()()(),e(21,"div",28)(22,"p",29),n(23," Proveedores "),t(),e(24,"select",30),S("change",function(){m(s);let i=l();return c(i.actualizarPermiso("PROVEEDORES"))})("ngModelChange",function(i){m(s);let r=l();return c(r.permisos.PROVEEDORES=i)}),e(25,"option",47),n(26," Sin permisos "),t(),e(27,"option",48),n(28," Solo lectura "),t(),e(29,"option",49),n(30," Permisos totales "),t()()()()}if(a&2){let s=l();_(4),p("ngModel",s.permisos.LISTADO_PRODUCTOS),_(10),p("ngModel",s.permisos.INGRESOS),_(10),p("ngModel",s.permisos.PROVEEDORES)}}function te(a,d){a&1&&(u(),e(0,"svg",5),E(1,"path",25),t())}function ie(a,d){a&1&&(u(),e(0,"svg",5),E(1,"path",26),t())}function ne(a,d){if(a&1){let s=C();e(0,"div",27)(1,"div",28)(2,"p",29),n(3," Nueva reserva "),t(),e(4,"select",30),S("change",function(){m(s);let i=l();return c(i.actualizarPermiso("NUEVA_RESERVA"))})("ngModelChange",function(i){m(s);let r=l();return c(r.permisos.NUEVA_RESERVA=i)}),e(5,"option",50),n(6," Sin permisos "),t(),e(7,"option",51),n(8," Permisos totales "),t()()(),e(9,"div",28)(10,"p",29),n(11," Listado de reservas "),t(),e(12,"select",30),S("change",function(){m(s);let i=l();return c(i.actualizarPermiso("LISTADO_RESERVAS"))})("ngModelChange",function(i){m(s);let r=l();return c(r.permisos.LISTADO_RESERVAS=i)}),e(13,"option",52),n(14," Sin permisos "),t(),e(15,"option",53),n(16," Solo lectura "),t(),e(17,"option",54),n(18," Permisos totales "),t()()()()}if(a&2){let s=l();_(4),p("ngModel",s.permisos.NUEVA_RESERVA),_(8),p("ngModel",s.permisos.LISTADO_RESERVAS)}}function re(a,d){a&1&&(u(),e(0,"svg",5),E(1,"path",25),t())}function oe(a,d){a&1&&(u(),e(0,"svg",5),E(1,"path",26),t())}function se(a,d){if(a&1){let s=C();e(0,"div",27)(1,"div",28)(2,"p",29),n(3," Cierre de cajas "),t(),e(4,"select",30),S("change",function(){m(s);let i=l();return c(i.actualizarPermiso("CIERRE_CAJA"))})("ngModelChange",function(i){m(s);let r=l();return c(r.permisos.CIERRE_CAJA=i)}),e(5,"option",55),n(6," Sin permisos "),t(),e(7,"option",56),n(8," Solo lectura "),t(),e(9,"option",57),n(10," Permisos totales "),t()()(),e(11,"div",28)(12,"p",29),n(13," Listado de cajas "),t(),e(14,"select",30),S("change",function(){m(s);let i=l();return c(i.actualizarPermiso("LISTADO_CAJAS"))})("ngModelChange",function(i){m(s);let r=l();return c(r.permisos.LISTADO_CAJAS=i)}),e(15,"option",58),n(16," Sin permisos "),t(),e(17,"option",59),n(18," Permisos totales "),t()()()()}if(a&2){let s=l();_(4),p("ngModel",s.permisos.CIERRE_CAJA),_(10),p("ngModel",s.permisos.LISTADO_CAJAS)}}function ae(a,d){a&1&&(u(),e(0,"svg",5),E(1,"path",25),t())}function le(a,d){a&1&&(u(),e(0,"svg",5),E(1,"path",26),t())}function me(a,d){if(a&1){let s=C();e(0,"div",27)(1,"div",28)(2,"p",29),n(3," Balanza "),t(),e(4,"select",30),S("change",function(){m(s);let i=l();return c(i.actualizarPermiso("BALANZA"))})("ngModelChange",function(i){m(s);let r=l();return c(r.permisos.BALANZA=i)}),e(5,"option",60),n(6," Sin permisos "),t(),e(7,"option",61),n(8," Solo lectura "),t(),e(9,"option",62),n(10," Permisos totales "),t()()(),e(11,"div",28)(12,"p",29),n(13," Sucursal "),t(),e(14,"select",30),S("change",function(){m(s);let i=l();return c(i.actualizarPermiso("SUCURSAL"))})("ngModelChange",function(i){m(s);let r=l();return c(r.permisos.SUCURSAL=i)}),e(15,"option",63),n(16," Sin permisos "),t(),e(17,"option",64),n(18," Solo lectura "),t(),e(19,"option",65),n(20," Permisos totales "),t()()(),e(21,"div",28)(22,"p",29),n(23," Tipos de ingresos "),t(),e(24,"select",30),S("change",function(){m(s);let i=l();return c(i.actualizarPermiso("TIPOS_INGRESOS"))})("ngModelChange",function(i){m(s);let r=l();return c(r.permisos.TIPOS_INGRESOS=i)}),e(25,"option",66),n(26," Sin permisos "),t(),e(27,"option",67),n(28," Solo lectura "),t(),e(29,"option",68),n(30," Permisos totales "),t()()(),e(31,"div",28)(32,"p",29),n(33," Tipos de gastos "),t(),e(34,"select",30),S("change",function(){m(s);let i=l();return c(i.actualizarPermiso("TIPOS_GASTOS"))})("ngModelChange",function(i){m(s);let r=l();return c(r.permisos.TIPOS_GASTOS=i)}),e(35,"option",69),n(36," Sin permisos "),t(),e(37,"option",70),n(38," Solo lectura "),t(),e(39,"option",71),n(40," Permisos totales "),t()()(),e(41,"div",28)(42,"p",29),n(43," Unidades de medida "),t(),e(44,"select",30),S("change",function(){m(s);let i=l();return c(i.actualizarPermiso("UNIDADES_MEDIDA"))})("ngModelChange",function(i){m(s);let r=l();return c(r.permisos.UNIDADES_MEDIDA=i)}),e(45,"option",72),n(46," Sin permisos "),t(),e(47,"option",73),n(48," Solo lectura "),t(),e(49,"option",74),n(50," Permisos totales "),t()()(),e(51,"div",28)(52,"p",29),n(53," Usuarios "),t(),e(54,"select",30),S("change",function(){m(s);let i=l();return c(i.actualizarPermiso("USUARIOS"))})("ngModelChange",function(i){m(s);let r=l();return c(r.permisos.USUARIOS=i)}),e(55,"option",75),n(56," Sin permisos "),t(),e(57,"option",76),n(58," Solo lectura "),t(),e(59,"option",77),n(60," Permisos totales "),t()()()()}if(a&2){let s=l();_(4),p("ngModel",s.permisos.BALANZA),_(10),p("ngModel",s.permisos.SUCURSAL),_(10),p("ngModel",s.permisos.TIPOS_INGRESOS),_(10),p("ngModel",s.permisos.TIPOS_GASTOS),_(10),p("ngModel",s.permisos.UNIDADES_MEDIDA),_(10),p("ngModel",s.permisos.USUARIOS)}}var xe=(()=>{let d=class d{constructor(o,i,r,A,Q){this.dataService=o,this.alertService=i,this.usuariosService=r,this.activatedRoute=A,this.usuariosPermisosService=Q,this.usuario=null,this.permisos={GENERAR_VENTA:"GENERAR_VENTA_NONE",VENTAS_ACTIVAS:"VENTAS_ACTIVAS_NONE",BUSQUEDA_VENTAS:"BUSQUEDA_VENTAS_NONE",CLIENTES:"CLIENTES_NONE",LISTADO_PRODUCTOS:"LISTADO_PRODUCTOS_NONE",INGRESOS:"INGRESOS_NONE",PROVEEDORES:"PROVEEDORES_NONE",NUEVA_RESERVA:"NUEVA_RESERVA_NONE",LISTADO_RESERVAS:"LISTADO_RESERVAS_NONE",CIERRE_CAJA:"CIERRE_CAJA_NONE",LISTADO_CAJAS:"LISTADO_CAJAS_NONE",USUARIOS:"USUARIOS_NONE",UNIDADES_MEDIDA:"UNIDADES_MEDIDA_NONE",TIPOS_INGRESOS:"TIPOS_INGRESOS_NONE",TIPOS_GASTOS:"TIPOS_GASTOS_NONE",BALANZA:"BALANZA_NONE",SUCURSAL:"SUCURSAL_NONE"},this.showVentas=!1,this.showProductos=!1,this.showReservas=!1,this.showCajas=!1,this.showConfiguraciones=!1}ngOnInit(){this.dataService.ubicacionActual="Permisos de usuario",z.from(".gsap-contenido",{y:100,opacity:0,duration:.2}),this.activatedRoute.params.subscribe(({id:o})=>{this.getUsuario(o)})}getUsuario(o){this.alertService.loading(),this.usuariosService.getUsuario(o).subscribe({next:i=>{this.usuario=i,this.adaptarPermisosEntrada(),this.alertService.close()},error:({error:i})=>this.alertService.errorApi(i.message)})}cambiarEstadoSeccion(o){switch(o){case"ventas":this.showVentas=!this.showVentas;break;case"productos":this.showProductos=!this.showProductos;break;case"reservas":this.showReservas=!this.showReservas;break;case"cajas":this.showCajas=!this.showCajas;break;case"configuraciones":this.showConfiguraciones=!this.showConfiguraciones;break}}actualizarPermiso(o){this.alertService.loading();let i=this.usuario.usuariosPermisos.find(r=>r.seccion===o);i?this.usuariosPermisosService.actualizarPermiso(i.id,{permiso:this.permisos[o]}).subscribe({next:()=>{this.alertService.close()},error:({error:r})=>this.alertService.errorApi(r.message)}):this.usuariosPermisosService.nuevoPermiso({usuarioId:this.usuario.id,permiso:this.permisos[o],seccion:o}).subscribe({next:({permiso:r})=>{this.usuario.usuariosPermisos.push(r),this.alertService.close()},error:({error:r})=>this.alertService.errorApi(r.message)})}adaptarPermisosEntrada(){this.usuario.usuariosPermisos.map(o=>{this.permisos[o.seccion]=o.permiso})}};d.\u0275fac=function(i){return new(i||d)(h(Z),h(B),h(H),h(w),h(J))},d.\u0275cmp=N({type:d,selectors:[["app-permisos"]],standalone:!0,features:[P],decls:77,vars:17,consts:[[1,"gsap-contenido"],[1,"border","border-gray-400","md:w-1/2","mt-4","mx-auto"],[1,"p-2","border","border-gray-900","bg-gray-900","text-white","flex","items-center","justify-between"],[1,"flex","items-center"],["routerLink","/dashboard/usuarios","title","Regresar",1,"hover:text-secondaryColor"],["xmlns","http://www.w3.org/2000/svg","fill","none","viewBox","0 0 24 24","stroke-width","1.5","stroke","currentColor",1,"w-5","h-5"],["stroke-linecap","round","stroke-linejoin","round","d","M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"],[1,"ml-2"],[1,"ml-1","text-xl"],["xmlns","http://www.w3.org/2000/svg","viewBox","0 0 20 20","fill","currentColor",1,"w-5","h-5","mr-1"],["d","M10 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM3.465 14.493a1.23 1.23 0 0 0 .41 1.412A9.957 9.957 0 0 0 10 18c2.31 0 4.438-.784 6.131-2.1.43-.333.604-.903.408-1.41a7.002 7.002 0 0 0-13.074.003Z"],[1,"text-xs"],[1,"p-2","text-sm"],[1,"border","cursor-pointer","p-2","flex","items-center","justify-between","border-gray-400","bg-gray-50","w-full",3,"click"],[1,"bg-secondaryColor","text-white","rounded-full","p-2"],["stroke-linecap","round","stroke-linejoin","round","d","M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"],[1,"font-semibold","ml-2"],["xmlns","http://www.w3.org/2000/svg","fill","none","viewBox","0 0 24 24","stroke-width","1.5","stroke","currentColor","class","w-5 h-5",4,"ngIf"],["class","border border-gray-400 border-t-0",4,"ngIf"],[1,"mt-2"],["stroke-linecap","round","stroke-linejoin","round","d","m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z"],["stroke-linecap","round","stroke-linejoin","round","d","M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"],["stroke-linecap","round","stroke-linejoin","round","d","M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z"],["stroke-linecap","round","stroke-linejoin","round","d","M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 0 1 1.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.559.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.894.149c-.424.07-.764.383-.929.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 0 1-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.398.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 0 1-.12-1.45l.527-.737c.25-.35.272-.806.108-1.204-.165-.397-.506-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.108-1.204l-.526-.738a1.125 1.125 0 0 1 .12-1.45l.773-.773a1.125 1.125 0 0 1 1.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894Z"],["stroke-linecap","round","stroke-linejoin","round","d","M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"],["stroke-linecap","round","stroke-linejoin","round","d","m4.5 15.75 7.5-7.5 7.5 7.5"],["stroke-linecap","round","stroke-linejoin","round","d","m19.5 8.25-7.5 7.5-7.5-7.5"],[1,"border","border-gray-400","border-t-0"],[1,"border-b","flex","items-center","justify-between","border-gray-300","p-2"],[1,"font-semibold"],[1,"input-generico",3,"ngModel","change","ngModelChange"],["value","GENERAR_VENTA_NONE"],["value","GENERAR_VENTA_ALL"],["value","VENTAS_ACTIVAS_NONE"],["value","VENTAS_ACTIVAS_READ"],["value","VENTAS_ACTIVAS_ALL"],["value","BUSQUEDA_VENTAS_NONE"],["value","BUSQUEDA_VENTAS_ALL"],["value","CLIENTES_NONE"],["value","CLIENTES_READ"],["value","CLIENTES_ALL"],["value","LISTADO_PRODUCTOS_NONE"],["value","LISTADO_PRODUCTOS_READ"],["value","LISTADO_PRODUCTOS_ALL"],["value","INGRESOS_NONE"],["value","INGRESOS_READ"],["value","INGRESOS_ALL"],["value","PROVEEDORES_NONE"],["value","PROVEEDORES_READ"],["value","PROVEEDORES_ALL"],["value","NUEVA_RESERVA_NONE"],["value","NUEVA_RESERVA_ALL"],["value","LISTADO_RESERVAS_NONE"],["value","LISTADO_RESERVAS_READ"],["value","LISTADO_RESERVAS_ALL"],["value","CIERRE_CAJA_NONE"],["value","CIERRE_CAJA_READ"],["value","CIERRE_CAJA_ALL"],["value","LISTADO_CAJAS_NONE"],["value","LISTADO_CAJAS_ALL"],["value","BALANZA_NONE"],["value","BALANZA_READ"],["value","BALANZA_ALL"],["value","SUCURSAL_NONE"],["value","SUCURSAL_READ"],["value","SUCURSAL_ALL"],["value","TIPOS_INGRESOS_NONE"],["value","TIPOS_INGRESOS_READ"],["value","TIPOS_INGRESOS_ALL"],["value","TIPOS_GASTOS_NONE"],["value","TIPOS_GASTOS_READ"],["value","TIPOS_GASTOS_ALL"],["value","UNIDADES_MEDIDA_NONE"],["value","UNIDADES_MEDIDA_READ"],["value","UNIDADES_MEDIDA_ALL"],["value","USUARIOS_NONE"],["value","USUARIOS_READ"],["value","USUARIOS_ALL"]],template:function(i,r){i&1&&(e(0,"div",0)(1,"div",1)(2,"div",2)(3,"div",3)(4,"button",4),u(),e(5,"svg",5),E(6,"path",6),t()(),g(),e(7,"div",7)(8,"h1",8),n(9," Permisos de usuario "),t(),e(10,"div",3),u(),e(11,"svg",9),E(12,"path",10),t(),g(),e(13,"h2",11),n(14),t()()()()(),e(15,"div",12)(16,"div")(17,"div",13),S("click",function(){return r.cambiarEstadoSeccion("ventas")}),e(18,"div",3)(19,"div",14),u(),e(20,"svg",5),E(21,"path",15),t()(),g(),e(22,"h1",16),n(23," Ventas "),t()(),e(24,"div"),v(25,q,2,0,"svg",17)(26,K,2,0,"svg",17),t()(),v(27,W,37,4,"div",18),t(),e(28,"div",19)(29,"div",13),S("click",function(){return r.cambiarEstadoSeccion("productos")}),e(30,"div",3)(31,"div",14),u(),e(32,"svg",5),E(33,"path",20),t()(),g(),e(34,"h1",16),n(35," Productos "),t()(),e(36,"div"),v(37,X,2,0,"svg",17)(38,Y,2,0,"svg",17),t()(),v(39,ee,31,3,"div",18),t(),e(40,"div",19)(41,"div",13),S("click",function(){return r.cambiarEstadoSeccion("reservas")}),e(42,"div",3)(43,"div",14),u(),e(44,"svg",5),E(45,"path",21),t()(),g(),e(46,"h1",16),n(47," Reservas "),t()(),e(48,"div"),v(49,te,2,0,"svg",17)(50,ie,2,0,"svg",17),t()(),v(51,ne,19,2,"div",18),t(),e(52,"div",19)(53,"div",13),S("click",function(){return r.cambiarEstadoSeccion("cajas")}),e(54,"div",3)(55,"div",14),u(),e(56,"svg",5),E(57,"path",22),t()(),g(),e(58,"h1",16),n(59," Cajas "),t()(),e(60,"div"),v(61,re,2,0,"svg",17)(62,oe,2,0,"svg",17),t()(),v(63,se,19,2,"div",18),t(),e(64,"div",19)(65,"div",13),S("click",function(){return r.cambiarEstadoSeccion("configuraciones")}),e(66,"div",3)(67,"div",14),u(),e(68,"svg",5),E(69,"path",23)(70,"path",24),t()(),g(),e(71,"h1",16),n(72," Configuraciones "),t()(),e(73,"div"),v(74,ae,2,0,"svg",17)(75,le,2,0,"svg",17),t()(),v(76,me,61,6,"div",18),t()()()()),i&2&&(_(14),f(" ",r.usuario==null?null:r.usuario.apellido," ",r.usuario==null?null:r.usuario.nombre," "),_(11),p("ngIf",r.showVentas),_(),p("ngIf",!r.showVentas),_(),p("ngIf",r.showVentas),_(10),p("ngIf",r.showProductos),_(),p("ngIf",!r.showProductos),_(),p("ngIf",r.showProductos),_(10),p("ngIf",r.showReservas),_(),p("ngIf",!r.showReservas),_(),p("ngIf",r.showReservas),_(10),p("ngIf",r.showCajas),_(),p("ngIf",!r.showCajas),_(),p("ngIf",r.showCajas),_(11),p("ngIf",r.showConfiguraciones),_(),p("ngIf",!r.showConfiguraciones),_(),p("ngIf",r.showConfiguraciones))},dependencies:[O,R,j,G,k,b,U,y,L,D],encapsulation:2});let a=d;return a})();export{xe as default};