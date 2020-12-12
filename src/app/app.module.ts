//import { fakeBackendProvider } from './fake-backend';
import { MatIconModule } from '@angular/material/icon';
import { DemoMaterialModule } from './pages/material-module';
import { BrowserModule, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './pages/home/home.component';
import { HttpClientJsonpModule, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SlidercarruselComponent } from './pages/components/slidercarrusel/slidercarrusel.component';
import { NguCarouselModule } from '@ngu/carousel';
import { ProductomesComponent } from './pages/components/mes/productomes/productomes.component';
import { LosmasvendidosComponent } from './pages/components/topventas/losmasvendidos/losmasvendidos.component';
import { NuestrosclientesComponent } from './pages/components/clientes/nuestrosclientes/nuestrosclientes.component';
import { FooterComponent } from './pages/components/footer/footer/footer.component';
import { ProductoComponent } from './pages/productos/producto/producto.component';
import { AgmCoreModule } from '@agm/core';
import { MapComponent } from './pages/maps/map/map.component';
import { ProductDetailComponent } from './pages/detail/product-detail/product-detail.component';
import { NgxGalleryModule, CustomHammerConfig } from 'ngx-gallery';
import { BasicAuthInterceptor, BASIC_AUTH_EXCLUDES } from './basic-auth-interceptor';
import { ErrorInterceptor } from './error-interceptor';
import { CantacComponent } from './pages/contacto/cantac/cantac.component';
import { CartComponent } from './pages/shoppingCart/shoppingcart/cart.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './pages/registeruser/register/register.component';
import { LoginComponent } from './pages/login/login/login.component';
import { ProductminComponent } from './pages/components/productmin/productmin.component';
import { UserPanelComponent } from './pages/user-panel/user-panel.component';
import { NosotrosComponent } from './pages/nosotros/nosotros/nosotros.component';
import { EnviosDevComponent } from './pages/envios/envios-dev/envios-dev.component';
import { NuestrasMarcasComponent } from './pages/components/marca/nuestras-marcas/nuestras-marcas.component';
import { PoliticasDatosComponent } from './pages/politica/politicas-datos/politicas-datos.component';
import { BlogsComponent } from './pages/blog/blogs/blogs.component';
import { OrderModalComponent } from './pages/components/order-modal/order-modal.component';
import { OrdenesdecompraComponent } from './pages/ordenesdecompra/ordenesdecompra.component';
import { PromocionesComponent } from './pages/promocion/promociones/promociones.component';
import { UserformComponent } from './pages/components/userform/userform.component';
import { SuccesPaymentComponent } from './pages/succes-payment/succes-payment.component';
import { ErrorPaymentComponent } from './pages/error-payment/error-payment.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { RestoreComponent } from './pages/restorepass/restore/restore.component';
import { NuevopassComponent } from './pages/nuevopass/nuevopass.component';
//import { APP_BASE_HREF, LocationStrategy, HashLocationStrategy } from '@angular/common';
//import { statusInterceptor } from './status.interceptor';
import { HttpBackendClientService } from './services/http-backend-client.service';
import { DetailBlogComponent } from './pages/detail-blog/detail-blog.component';
import { ComoComprarComponent } from './pages/como-comprar/como-comprar.component';
import { PipeHtmlPipe } from './pipes/pipe-html.pipe';
import { TerminosComponent } from './pages/terminos/terminos.component';
import { ModalterminoComponent } from './pages/modaltermino/modaltermino.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SlidercarruselComponent,
    ProductomesComponent,
    LosmasvendidosComponent,
    NuestrosclientesComponent,
    FooterComponent,
    ProductoComponent,
    MapComponent,
    ProductDetailComponent,
    CantacComponent,
    CartComponent,
    RegisterComponent,
    LoginComponent,
    ProductminComponent,
    UserPanelComponent,
    NosotrosComponent,
    EnviosDevComponent,
    NuestrasMarcasComponent,
    PoliticasDatosComponent,
    BlogsComponent,
    OrderModalComponent,
    OrdenesdecompraComponent,
    PromocionesComponent,
    UserformComponent,
    SuccesPaymentComponent,
    ErrorPaymentComponent,
    RestoreComponent,
    NuevopassComponent,
    DetailBlogComponent,
    ComoComprarComponent,
    PipeHtmlPipe,
    TerminosComponent,
    ModalterminoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    DemoMaterialModule,
    HttpClientJsonpModule,
    HttpClientModule,
    MatIconModule,
    FlexLayoutModule,
    NguCarouselModule,
    NgxGalleryModule,
    FormsModule,
    ReactiveFormsModule,
    InfiniteScrollModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDFJ0cpwr1wHdktxm9lzKBAp7AcYdy8Yag'
    })
  ],
  providers: [
    {
      provide: HAMMER_GESTURE_CONFIG, useClass: CustomHammerConfig
    },
    { provide: HTTP_INTERCEPTORS, useClass: BasicAuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    {
      provide: BASIC_AUTH_EXCLUDES,
      useValue: /^https:\/\/sandbox.wompi.co.v1.transactions/,
      multi: true
    },
    //{ provide: HTTP_INTERCEPTORS, useClass: statusInterceptor, multi: true },
    HttpBackendClientService,
    // provider used to create fake backend
    //fakeBackendProvider
    /*{provide: APP_BASE_HREF, useValue: '/'},
    {provide: LocationStrategy, useClass: HashLocationStrategy}*/
  ],
  bootstrap: [AppComponent],
  exports: [ OrderModalComponent ],
  entryComponents: [OrderModalComponent, ModalterminoComponent],
})
export class AppModule { }
