import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { UnidadEducativaBackendSharedModule } from '../../shared';
import { UnidadEducativaBackendAdminModule } from '../../admin/admin.module';
import {
    CalificacionService,
    CalificacionPopupService,
    CalificacionComponent,
    CalificacionDetailComponent,
    CalificacionDialogComponent,
    CalificacionPopupComponent,
    CalificacionDeletePopupComponent,
    CalificacionDeleteDialogComponent,
    calificacionRoute,
    calificacionPopupRoute,
} from './';

const ENTITY_STATES = [
    ...calificacionRoute,
    ...calificacionPopupRoute,
];

@NgModule({
    imports: [
        UnidadEducativaBackendSharedModule,
        UnidadEducativaBackendAdminModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        CalificacionComponent,
        CalificacionDetailComponent,
        CalificacionDialogComponent,
        CalificacionDeleteDialogComponent,
        CalificacionPopupComponent,
        CalificacionDeletePopupComponent,
    ],
    entryComponents: [
        CalificacionComponent,
        CalificacionDialogComponent,
        CalificacionPopupComponent,
        CalificacionDeleteDialogComponent,
        CalificacionDeletePopupComponent,
    ],
    providers: [
        CalificacionService,
        CalificacionPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class UnidadEducativaBackendCalificacionModule {}
