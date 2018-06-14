import { NgModule, LOCALE_ID } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { registerLocaleData } from '@angular/common';
import locale from '@angular/common/locales/en';

import {
    UnidadEducativaBackendSharedLibsModule,
    JhiAlertComponent,
    JhiAlertErrorComponent
} from './';

@NgModule({
    imports: [
        UnidadEducativaBackendSharedLibsModule
    ],
    declarations: [
        JhiAlertComponent,
        JhiAlertErrorComponent
    ],
    providers: [
        Title,
        {
            provide: LOCALE_ID,
            useValue: 'en'
        },
    ],
    exports: [
        UnidadEducativaBackendSharedLibsModule,
        JhiAlertComponent,
        JhiAlertErrorComponent
    ]
})
export class UnidadEducativaBackendSharedCommonModule {
    constructor() {
        registerLocaleData(locale);
    }
}
