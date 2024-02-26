import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from './modules/auth/auth.module';
import { jwtConstants } from './modules/auth/constants';
import { UsuariosModule } from './modules/usuarios/usuarios.module';
import { InicializacionModule } from './modules/inicializacion/inicializacion.module';
import { UnidadesMedidaModule } from './modules/unidades-medida/unidades-medida.module';
import { ProductosModule } from './modules/productos/productos.module';
import { MarcasModule } from './modules/marcas/marcas.module';
import { IngresosModule } from './modules/ingresos/ingresos.module';
import { IngresosProductosModule } from './modules/ingresos-productos/ingresos-productos.module';
import { VentasModule } from './modules/ventas/ventas.module';
import { VentasProductosModule } from './modules/ventas-productos/ventas-productos.module';
import { VentasFormasPagoModule } from './modules/ventas-formas-pago/ventas-formas-pago.module';
import { VentasFacturacionModule } from './modules/ventas-facturacion/ventas-facturacion.module';
import { TiposIngresosModule } from './modules/tipos-ingresos/tipos-ingresos.module';
import { TiposGastosModule } from './modules/tipos-gastos/tipos-gastos.module';
import { CajasModule } from './modules/cajas/cajas.module';
import { IngresosCajasModule } from './modules/ingresos-cajas/ingresos-cajas.module';
import { GastosCajasModule } from './modules/gastos-cajas/gastos-cajas.module';
import { CajasVentasModule } from './modules/cajas-ventas/cajas-ventas.module';
import { ClientesModule } from './modules/clientes/clientes.module';
import { ProveedoresModule } from './modules/proveedores/proveedores.module';
import { ConfigGeneralesModule } from './modules/config-generales/config-generales.module';
import { ReservasModule } from './modules/reservas/reservas.module';
import { ReservasObservacionesTortasModule } from './modules/reservas-observaciones-tortas/reservas-observaciones-tortas.module';
import { ReservasProductosModule } from './modules/reservas-productos/reservas-productos.module';
import { VentasReservasModule } from './modules/ventas-reservas/ventas-reservas.module';

@Module({
  imports: [

    // Directorio publico
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public')
    }),

    // Variables de entorno
    ConfigModule.forRoot({ 
      // envFilePath: `.${process.env.NODE_ENV}.env`,
      isGlobal: true 
    }),

    // Autenticacion -> JsonWebToken
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '12h' }
    }),

    // Conexion a base de datos
    
    // Custom modules
    AuthModule,
    UsuariosModule,
    InicializacionModule,
    UnidadesMedidaModule,
    ProductosModule,
    MarcasModule,
    IngresosModule,
    IngresosProductosModule,
    VentasModule,
    VentasProductosModule,
    VentasFormasPagoModule,
    VentasFacturacionModule,
    TiposIngresosModule,
    TiposGastosModule,
    CajasModule,
    IngresosCajasModule,
    GastosCajasModule,
    CajasVentasModule,
    ClientesModule,
    ProveedoresModule,
    ConfigGeneralesModule,
    ReservasModule,
    ReservasObservacionesTortasModule,
    ReservasProductosModule,
    VentasReservasModule,

  ],
  controllers: [AppController],
  providers: [AppService ],
})
export class AppModule {
  static port: number;
  constructor(private readonly configService: ConfigService){
    AppModule.port = +this.configService.get('PORT');
  }
}
