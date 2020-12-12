import { CartComponent } from './pages/shoppingCart/shoppingcart/cart.component';
import { ProductDetailComponent } from './pages/detail/product-detail/product-detail.component';
import { ProductoComponent } from './pages/productos/producto/producto.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CantacComponent } from './pages/contacto/cantac/cantac.component';
import { RegisterComponent } from './pages/registeruser/register/register.component';
import { LoginComponent } from './pages/login/login/login.component';
import { UserPanelComponent } from './pages/user-panel/user-panel.component';
import { NosotrosComponent } from './pages/nosotros/nosotros/nosotros.component';
import { EnviosDevComponent } from './pages/envios/envios-dev/envios-dev.component';
import { AuthGuard } from './auth.guard';
import { PoliticasDatosComponent } from './pages/politica/politicas-datos/politicas-datos.component';
import { BlogsComponent } from './pages/blog/blogs/blogs.component';
import { PromocionesComponent } from './pages/promocion/promociones/promociones.component';
import { OrdenesdecompraComponent } from './pages/ordenesdecompra/ordenesdecompra.component';
import { PreloadAllModules } from '@angular/router';
import { UserformComponent } from './pages/components/userform/userform.component';
import { SuccesPaymentComponent } from './pages/succes-payment/succes-payment.component';
import { ErrorPaymentComponent } from './pages/error-payment/error-payment.component';
import { RestoreComponent } from './pages/restorepass/restore/restore.component';
import { NuevopassComponent } from './pages/nuevopass/nuevopass.component';
import { DetailBlogComponent } from './pages/detail-blog/detail-blog.component';
import { ComoComprarComponent } from './pages/como-comprar/como-comprar.component';
import { TerminosComponent } from './pages/terminos/terminos.component';


const routes: Routes = [
  { path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  { path: 'home', component: HomeComponent },
  { path: 'productos', component: ProductoComponent },
  { path: 'productos/:id', component: ProductDetailComponent },
  { path: 'carrito', component: CartComponent },
  { path: 'contacto', component: CantacComponent },
  { path: 'registeruser', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'restore', component: RestoreComponent },
  { path: 'nuevopass', component: NuevopassComponent },
  { path: 'terminos', component: TerminosComponent },
  { path: 'user-panel', component: UserPanelComponent, canActivate: [AuthGuard], children: [
    {
      path: '',
      component: UserformComponent
    },
    {
      path: 'menu/:page',
      component: OrdenesdecompraComponent
    }]
  },
  { path: 'nosotros', component: NosotrosComponent },
  { path: 'envios', component: EnviosDevComponent },
  { path: 'politica', component: PoliticasDatosComponent },
  { path: 'como-comprar', component: ComoComprarComponent },
  { path: 'blog', component: BlogsComponent },
  { path: 'blog/:detail', component: DetailBlogComponent },
  { path: 'promocion', component: PromocionesComponent },
  { path: 'response', component: SuccesPaymentComponent, canActivate: [AuthGuard]},
  { path: 'transaccion-rechazada', component: ErrorPaymentComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled',
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
