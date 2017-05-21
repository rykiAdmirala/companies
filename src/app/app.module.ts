import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { CompaniesPage } from '../pages/companies/companies';
import { CompanyDetails } from '../modals/index';
import { ApiService, CompaniesService } from './services/index';
import { SearchFilter } from './pipes';

@NgModule({
  declarations: [
    MyApp,
    CompaniesPage,
    CompanyDetails,
    SearchFilter
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    CompaniesPage,
    CompanyDetails
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ApiService,
    CompaniesService
  ]
})
export class AppModule {}
