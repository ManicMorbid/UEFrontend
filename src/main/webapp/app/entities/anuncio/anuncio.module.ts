import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { UnidadEducativaBackendSharedModule } from '../../shared';
import {
    AnuncioService,
    AnuncioPopupService,
    AnuncioComponent,
    AnuncioDetailComponent,
    AnuncioDialogComponent,
    AnuncioPopupComponent,
    AnuncioDeletePopupComponent,
    AnuncioDeleteDialogComponent,
    anuncioRoute,
    anuncioPopupRoute,
} from './';

const ENTITY_STATES = [
    ...anuncioRoute,
    ...anuncioPopupRoute,
];

@NgModule({
    imports: [
        UnidadEducativaBackendSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        AnuncioComponent,
        AnuncioDetailComponent,
        AnuncioDialogComponent,
        AnuncioDeleteDialogComponent,
        AnuncioPopupComponent,
        AnuncioDeletePopupComponent,
    ],
    entryComponents: [
        AnuncioComponent,
        AnuncioDialogComponent,
        AnuncioPopupComponent,
        AnuncioDeleteDialogComponent,
        AnuncioDeletePopupComponent,
    ],
    providers: [
        AnuncioService,
        AnuncioPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class UnidadEducativaBackendAnuncioModule {}
