import { NgModule, LOCALE_ID } from '@angular/core';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { reducers, metaReducers } from './reducers';

import { CalenderViewModule } from './calender-view/calender-view.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'

import { registerLocaleData } from '@angular/common';
import localeDe from '@angular/common/locales/de';

registerLocaleData(localeDe);

@NgModule({ declarations: [
        AppComponent
    ],
    bootstrap: [AppComponent], imports: [BrowserModule,
        BrowserAnimationsModule,
        StoreModule.forRoot({}, {}),
        StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production , connectInZone: true}),
        EffectsModule.forRoot([]),
        StoreModule.forRoot(reducers, { metaReducers }),
        !environment.production ? StoreDevtoolsModule.instrument({connectInZone: true}) : [],
        CalenderViewModule,
        NgbModule], providers: [{ provide: LOCALE_ID, useValue: 'de' }, provideHttpClient(withInterceptorsFromDi())] })
export class AppModule { }
