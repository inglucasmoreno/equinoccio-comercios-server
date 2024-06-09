import{a as O}from"./chunk-22XSY4EJ.js";import{a as W}from"./chunk-55FSNNZ2.js";import{d as Q}from"./chunk-6M6LJACB.js";import{a as R,c as B,e as H,j as P,k as G,l as q,o as J}from"./chunk-B2HCO65P.js";import{e as z,g as U,h as V,t as L,u as $,v as K}from"./chunk-BJBUZF5B.js";import{$a as s,Bb as D,Gb as j,Hb as N,Ra as c,Sa as h,V as y,Va as C,_ as E,a as g,b,ba as A,cb as x,ga as _,gb as o,ha as S,hb as n,ia as k,ib as T,ja as I,lb as M,pb as p,qb as v,ub as r,wb as w,xb as F}from"./chunk-GQGQXF3A.js";var f=$.base_url+"/clientes",X=(()=>{let l=class l{get getToken(){return{Authorization:localStorage.getItem("token")}}constructor(i){this.http=i,this.showModalAbm=!1,this.estadoAbm="crear",this.clientes=[],this.clienteSeleccionado=null,this.abmForm={descripcion:"",tipo_identificacion:"DNI",identificacion:"",telefono:"",domicilio:""}}getCliente(i){return this.http.get(`${f}/${i}`,{headers:this.getToken})}getIdentificacion(i){return this.http.get(`${f}/identificacion/${i}`,{headers:this.getToken})}listarClientes({direccion:i="desc",columna:e="descripcion",parametro:t=""}){return this.http.get(f,{params:{direccion:String(i),columna:e,parametro:t},headers:this.getToken})}nuevoCliente(i){return this.http.post(f,i,{headers:this.getToken})}actualizarCliente(i,e){return this.http.patch(`${f}/${i}`,e,{headers:this.getToken})}abrirAbm(i,e=null){this.estadoAbm=i,this.clienteSeleccionado=e,this.showModalAbm=!0,i==="editar"?this.abmForm={descripcion:e.descripcion,tipo_identificacion:e.tipo_identificacion,identificacion:e.identificacion,telefono:e.telefono,domicilio:e.domicilio}:this.abmForm={descripcion:"",tipo_identificacion:"DNI",identificacion:"",telefono:"",domicilio:""}}};l.\u0275fac=function(e){return new(e||l)(E(V))},l.\u0275prov=y({token:l,factory:l.\u0275fac,providedIn:"root"});let a=l;return a})();function ee(a,l){if(a&1&&(o(0,"div",25)(1,"div",26)(2,"p",27),r(3," Fecha de alta "),n(),o(4,"div",28),r(5),j(6,"fecha"),n()(),o(7,"div",29)(8,"p",27),r(9," Usuario creador "),n(),o(10,"div",30),r(11),n()()()),a&2){let u=v();c(5),w(" ",N(6,3,u.clientesService.clienteSeleccionado.createdAt)," "),c(6),F(" ",u.clientesService.clienteSeleccionado.creatorUser.apellido.toLowerCase()," ",u.clientesService.clienteSeleccionado.creatorUser.nombre.toLowerCase()," ")}}function te(a,l){if(a&1){let u=M();o(0,"button",31),p("click",function(){_(u);let e=v();return S(e.nuevoCliente())}),r(1," Crear cliente "),n()}}function ie(a,l){if(a&1){let u=M();o(0,"button",32),p("click",function(){_(u);let e=v();return S(e.actualizarCliente())}),r(1," Actualizar cliente "),n()}}var ge=(()=>{let l=class l{constructor(i,e,t){this.authService=i,this.alertService=e,this.clientesService=t,this.insertEvent=new C,this.updateEvent=new C}ngOnInit(){}nuevoCliente(){if(this.verificacionDatos()!=="")return this.alertService.info(this.verificacionDatos());this.alertService.loading();let i=b(g({},this.clientesService.abmForm),{creatorUserId:this.authService.usuario.userId});this.clientesService.nuevoCliente(i).subscribe({next:({cliente:e})=>{this.insertEvent.emit(e),this.clientesService.showModalAbm=!1},error:({error:e})=>this.alertService.errorApi(e.message)})}actualizarCliente(){if(this.verificacionDatos()!=="")return this.alertService.info(this.verificacionDatos());this.alertService.loading();let i=b(g({},this.clientesService.abmForm),{creatorUserId:this.authService.usuario.userId});this.clientesService.actualizarCliente(this.clientesService.clienteSeleccionado.id,i).subscribe({next:({cliente:e})=>{this.updateEvent.emit(e),this.clientesService.showModalAbm=!1},error:({error:e})=>this.alertService.errorApi(e.message)})}verificacionDatos(){let{descripcion:i,identificacion:e}=this.clientesService.abmForm,t="";return i.trim()===""?t="Debe colocar un Nombre o Razon Social":e.trim()===""&&(t="Debe colocar una identificaci\xF3n"),t}submit(){this.clientesService.estadoAbm==="crear"?this.nuevoCliente():this.actualizarCliente()}};l.\u0275fac=function(e){return new(e||l)(h(O),h(K),h(X))},l.\u0275cmp=A({type:l,selectors:[["app-abm-cliente"]],outputs:{insertEvent:"insertEvent",updateEvent:"updateEvent"},standalone:!0,features:[D],decls:47,vars:10,consts:[[3,"showModal"],[1,"flex","items-center","justify-between","bg-gray-800","rounded-t","p-2"],[1,"text-white","px-2","py-1","rounded-t","text-lg"],["width","20","height","20","viewBox","0 0 24 24","fill","none","stroke","currentColor","stroke-width","2","stroke-linecap","round","stroke-linejoin","round",1,"cursor-pointer","feather","feather-x","text-white","mr-2",3,"click"],["x1","18","y1","6","x2","6","y2","18"],["x1","6","y1","6","x2","18","y2","18"],[1,"px-4","pt-2","max-h-96","overflow-y-auto","text-sm"],[1,"font-semibold"],[1,"text-red-500"],["placeholder","Ej. Moreno Lucas Omar","type","text",1,"input-generico","w-full","mt-2",3,"ngModel","keyup.enter","ngModelChange"],[1,"w-full","md:flex","md:items-center","mt-3","pb-2"],[1,"md:w-1/2"],[1,"input-generico","w-full","mt-2",3,"ngModel","ngModelChange"],["value","DNI"],["value","CUIL"],["value","CUIT"],[1,"md:w-1/2","md:ml-2","mt-3","md:mt-0"],["placeholder","Ej. 34060398","type","text",1,"input-generico","w-full","mt-2",3,"ngModel","keyup.enter","ngModelChange"],[1,"md:w-full","md:flex","md:items-center","mt-1","pb-2"],["placeholder","Ej. 2664869642","type","text",1,"input-generico","w-full","mt-2",3,"ngModel","keyup.enter","ngModelChange"],["placeholder","Ej. Portugal 1030","type","text",1,"input-generico","w-full","mt-2",3,"ngModel","keyup.enter","ngModelChange"],["class","xl:flex items-center mt-2",4,"ngIf"],[1,"px-4","pb-2"],["class","boton-crear w-full mt-1",3,"click",4,"ngIf"],["class","boton-editar w-full mt-4",3,"click",4,"ngIf"],[1,"xl:flex","items-center","mt-2"],[1,"xl:w-1/2"],[1,"font-semibold","text-sm"],[1,"border","text-sm","mt-2","border-gray-400","rounded","p-2","bg-gray-100"],[1,"xl:ml-4","xl:w-1/2","mt-4","xl:mt-0"],[1,"border","text-sm","capitalize","mt-2","border-gray-400","rounded","p-2","bg-gray-100"],[1,"boton-crear","w-full","mt-1",3,"click"],[1,"boton-editar","w-full","mt-4",3,"click"]],template:function(e,t){e&1&&(o(0,"app-modal",0)(1,"div")(2,"div",1)(3,"h1",2),r(4),n(),k(),o(5,"svg",3),p("click",function(){return t.clientesService.showModalAbm=!1}),T(6,"line",4)(7,"line",5),n()(),I(),o(8,"div",6)(9,"div")(10,"p",7)(11,"span",8),r(12," * "),n(),r(13," Nombre o Razon social "),n(),o(14,"input",9),p("keyup.enter",function(){return t.submit()})("ngModelChange",function(d){return t.clientesService.abmForm.descripcion=d}),n()(),o(15,"div",10)(16,"div",11)(17,"p",7)(18,"span",8),r(19," * "),n(),r(20," Tipo de identificaci\xF3n "),n(),o(21,"select",12),p("ngModelChange",function(d){return t.clientesService.abmForm.tipo_identificacion=d}),o(22,"option",13),r(23," DNI "),n(),o(24,"option",14),r(25," CUIL "),n(),o(26,"option",15),r(27," CUIT "),n()()(),o(28,"div",16)(29,"p",7)(30,"span",8),r(31," * "),n(),r(32," Identificaci\xF3n "),n(),o(33,"input",17),p("keyup.enter",function(){return t.submit()})("ngModelChange",function(d){return t.clientesService.abmForm.identificacion=d}),n()()(),o(34,"div",18)(35,"div",11)(36,"p",7),r(37," Tel\xE9fono "),n(),o(38,"input",19),p("keyup.enter",function(){return t.submit()})("ngModelChange",function(d){return t.clientesService.abmForm.telefono=d}),n()(),o(39,"div",16)(40,"p",7),r(41," Domicilio "),n(),o(42,"input",20),p("keyup.enter",function(){return t.submit()})("ngModelChange",function(d){return t.clientesService.abmForm.domicilio=d}),n()()(),x(43,ee,12,5,"div",21),n(),o(44,"div",22),x(45,te,2,0,"button",23)(46,ie,2,0,"button",24),n()()()),e&2&&(s("showModal",t.clientesService.showModalAbm),c(4),w(" ",t.clientesService.estadoAbm=="crear"?"Creando cliente":"Editando cliente"," "),c(10),s("ngModel",t.clientesService.abmForm.descripcion),c(7),s("ngModel",t.clientesService.abmForm.tipo_identificacion),c(12),s("ngModel",t.clientesService.abmForm.identificacion),c(5),s("ngModel",t.clientesService.abmForm.telefono),c(4),s("ngModel",t.clientesService.abmForm.domicilio),c(),s("ngIf",t.clientesService.clienteSeleccionado&&t.clientesService.estadoAbm==="editar"),c(2),s("ngIf",t.clientesService.estadoAbm=="crear"),c(),s("ngIf",t.clientesService.estadoAbm=="editar"))},dependencies:[U,z,J,G,q,R,P,B,H,Q,W,L],encapsulation:2});let a=l;return a})();export{X as a,ge as b};