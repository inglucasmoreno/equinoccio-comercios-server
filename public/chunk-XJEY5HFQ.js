import{a as w}from"./chunk-OGQQ44XV.js";import"./chunk-22XSY4EJ.js";import{a as E}from"./chunk-BPTFILPP.js";import{b as A}from"./chunk-5N72VQB2.js";import{a as L}from"./chunk-VSPTT5AX.js";import{q as x,t as y,v as _}from"./chunk-BJBUZF5B.js";import{$a as d,Bb as S,Cb as u,Ka as g,Ra as o,Sa as h,ba as b,cb as f,gb as e,hb as t,ia as l,ib as s,ja as p,ub as a,wb as v}from"./chunk-GQGQXF3A.js";function R(r,n){r&1&&(e(0,"button",10),l(),e(1,"svg",11),s(2,"path",12),t(),p(),e(3,"h2",13),a(4," Nueva venta "),t()())}function k(r,n){r&1&&(e(0,"button",14),l(),e(1,"svg",11),s(2,"path",15),t(),p(),e(3,"h2",13),a(4," Productos "),t()())}function C(r,n){r&1&&(e(0,"button",16),l(),e(1,"svg",11),s(2,"path",17),t(),p(),e(3,"h2",13),a(4," Reservas "),t()())}function M(r,n){r&1&&(e(0,"button",18),l(),e(1,"svg",11),s(2,"path",19),t(),p(),e(3,"h2",13),a(4," Cierre de caja "),t()())}var T=()=>["GENERAR_VENTA_ALL","GENERAR_VENTA_READ"],D=()=>["LISTADO_PRODUCTOS_ALL","LISTADO_PRODUCTOS_READ"],H=()=>["LISTADO_RESERVAS_ALL","LISTADO_RESERVAS_READ"],G=()=>["CIERRE_CAJA_ALL","CIERRE_CAJA_READ"],U=(()=>{let n=class n{constructor(i,m,c){this.dataService=i,this.alertService=m,this.configGeneralesService=c,this.configGeneral={}}ngOnInit(){this.dataService.ubicacionActual="Dashboard - Inicio",E.from(".gsap-contenido",{y:100,opacity:0,duration:.2}),this.configGeneralesService.listarConfigGenerales({}).subscribe({next:({configGeneral:i})=>{this.configGeneral=i[0]},error:({error:i})=>this.alertService.errorApi(i.message)})}};n.\u0275fac=function(m){return new(m||n)(h(A),h(_),h(L))},n.\u0275cmp=b({type:n,selectors:[["app-home"]],standalone:!0,features:[S],decls:14,vars:11,consts:[[1,"gsap-contenido","flex","flex-col","items-center","mt-5","justify-center"],["alt","LogoEmpresa.png",1,"w-36","md:w-64","mx-auto",3,"src"],[1,"font-semibold","text-xl","md:text-4xl","mt-4"],[1,"font-semibold","text-center","text-md","md:text-xl","text-secondaryColor","mt-2"],[1,"bg-gray-100","p-2","border","font-semibold","border-gray-400","text-sm","md:text-md","text-center","mt-4"],[1,"mt-7","md:flex","text-center","md:items-center","pb-10"],["routerLink","/dashboard/ventas","class","p-2 w-11/12 md:w-44 md:h-32 duration-500 hover:bg-purple-100 transform hover:translate-y-4 border bg-gray-100 rounded border-gray-400 text-center",4,"appPermisos"],["routerLink","/dashboard/productos","class","p-2 w-11/12 md:w-44 md:h-32 duration-500 md:ml-4 mt-2 md:mt-0 hover:bg-purple-100 transform hover:translate-y-4 border bg-gray-100 rounded border-gray-400 text-center",4,"appPermisos"],["routerLink","/dashboard/reservas","class","p-2 md:w-44 md:h-32 mt-2 md:mt-0 duration-500 w-11/12 md:ml-4 hover:bg-purple-100 transform hover:translate-y-4 border bg-gray-100 rounded border-gray-400 text-center",4,"appPermisos"],["routerLink","/dashboard/cajas","class","p-2 md:w-44 md:h-32 mt-2 md:mt-0 duration-500 w-11/12 md:ml-4 hover:bg-purple-100 transform hover:translate-y-4 border bg-gray-100 rounded border-gray-400 text-center",4,"appPermisos"],["routerLink","/dashboard/ventas",1,"p-2","w-11/12","md:w-44","md:h-32","duration-500","hover:bg-purple-100","transform","hover:translate-y-4","border","bg-gray-100","rounded","border-gray-400","text-center"],["xmlns","http://www.w3.org/2000/svg","fill","none","viewBox","0 0 24 24","stroke-width","1.5","stroke","currentColor",1,"w-14","h-14","mx-auto"],["stroke-linecap","round","stroke-linejoin","round","d","M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"],[1,"mt-1"],["routerLink","/dashboard/productos",1,"p-2","w-11/12","md:w-44","md:h-32","duration-500","md:ml-4","mt-2","md:mt-0","hover:bg-purple-100","transform","hover:translate-y-4","border","bg-gray-100","rounded","border-gray-400","text-center"],["stroke-linecap","round","stroke-linejoin","round","d","m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z"],["routerLink","/dashboard/reservas",1,"p-2","md:w-44","md:h-32","mt-2","md:mt-0","duration-500","w-11/12","md:ml-4","hover:bg-purple-100","transform","hover:translate-y-4","border","bg-gray-100","rounded","border-gray-400","text-center"],["stroke-linecap","round","stroke-linejoin","round","d","M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"],["routerLink","/dashboard/cajas",1,"p-2","md:w-44","md:h-32","mt-2","md:mt-0","duration-500","w-11/12","md:ml-4","hover:bg-purple-100","transform","hover:translate-y-4","border","bg-gray-100","rounded","border-gray-400","text-center"],["stroke-linecap","round","stroke-linejoin","round","d","M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z"]],template:function(m,c){m&1&&(e(0,"div",0)(1,"div"),s(2,"img",1),e(3,"h1",2),a(4),t(),e(5,"h1",3),a(6," Equinoccio - Comercios "),t(),e(7,"h2",4),a(8),t()(),e(9,"div",5),f(10,R,5,0,"button",6)(11,k,5,0,"button",7)(12,C,5,0,"button",8)(13,M,5,0,"button",9),t()()),m&2&&(o(2),d("src",c.dataService.urlLogoEmpresa,g),o(2),v(" ",c.configGeneral.nombreEmpresa," "),o(4),v(" ",c.configGeneral.nombreSucursal," "),o(2),d("appPermisos",u(7,T)),o(),d("appPermisos",u(8,D)),o(),d("appPermisos",u(9,H)),o(),d("appPermisos",u(10,G)))},dependencies:[y,x,w],encapsulation:2});let r=n;return r})();export{U as default};