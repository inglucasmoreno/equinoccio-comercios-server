import{h as a,u as c}from"./chunk-BJBUZF5B.js";import{V as s,_ as n}from"./chunk-GQGQXF3A.js";var o=c.base_url+"/tipos-ingresos",d=(()=>{let e=class e{get getToken(){return{Authorization:localStorage.getItem("token")}}constructor(t){this.http=t,this.estadoAbm="crear",this.showModalAbm=!1,this.tipos=[],this.tipoSeleccionado=null,this.abmForm={descripcion:""}}getTipo(t){return this.http.get(`${o}/${t}`,{headers:this.getToken})}listarTipos({direccion:t="desc",columna:i="descripcion",activo:h=""}){return this.http.get(o,{params:{direccion:String(t),columna:i,activo:h},headers:this.getToken})}nuevoTipo(t){return this.http.post(o,t,{headers:this.getToken})}actualizarTipo(t,i){return this.http.patch(`${o}/${t}`,i,{headers:this.getToken})}abrirAbm(t,i=null){this.estadoAbm=t,this.tipoSeleccionado=i,this.showModalAbm=!0,t==="editar"?this.abmForm={descripcion:i.descripcion}:this.abmForm={descripcion:""}}};e.\u0275fac=function(i){return new(i||e)(n(a))},e.\u0275prov=s({token:e,factory:e.\u0275fac,providedIn:"root"});let r=e;return r})();export{d as a};