import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'currency-converter',
    loadChildren: () => import('./currency-converter/currency-converter.module').then(mod => mod.CurrencyConverterModule)
  },
  {
    path: '',
    redirectTo: 'currency-converter',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
