import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { UnidadEducativaBackendSharedModule } from '../../shared';
import {
    ColegioService,
    ColegioPopupService,
    ColegioComponent,
    ColegioDetailComponent,
    ColegioDialogComponent,
    ColegioPopupComponent,
    ColegioDeletePopupComponent,
    ColegioDeleteDialogComponent,
    colegioRoute,
    colegioPopupRoute,
} from './';

const ENTITY_STATES = [
    ...colegioRoute,
    ...colegioPopupRoute,
];

@NgModule({
    imports: [
        UnidadEducativaBackendSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        ColegioComponent,
        ColegioDetailComponent,
        ColegioDialogComponent,
        ColegioDeleteDialogComponent,
        ColegioPopupComponent,
        ColegioDeletePopupComponent,
    ],
    entryComponents: [
        ColegioComponent,
        ColegioDialogComponent,
        ColegioPopupComponent,
        ColegioDeleteDialogComponent,
        ColegioDeletePopupComponent,
    ],
    providers: [
        ColegioService,
        ColegioPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class UnidadEducativaBackendColegioModule {}
