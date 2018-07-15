import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { UnidadEducativaBackendSharedModule } from '../../shared';
import { UnidadEducativaBackendAdminModule } from '../../admin/admin.module';
import {
    FaltaService,
    FaltaPopupService,
    FaltaComponent,
    FaltaDetailComponent,
    FaltaDialogComponent,
    FaltaPopupComponent,
    FaltaDeletePopupComponent,
    FaltaDeleteDialogComponent,
    faltaRoute,
    faltaPopupRoute,
} from './';

const ENTITY_STATES = [
    ...faltaRoute,
    ...faltaPopupRoute,
];

@NgModule({
    imports: [
        UnidadEducativaBackendSharedModule,
        UnidadEducativaBackendAdminModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        FaltaComponent,
        FaltaDetailComponent,
        FaltaDialogComponent,
        FaltaDeleteDialogComponent,
        FaltaPopupComponent,
        FaltaDeletePopupComponent,
    ],
    entryComponents: [
        FaltaComponent,
        FaltaDialogComponent,
        FaltaPopupComponent,
        FaltaDeleteDialogComponent,
        FaltaDeletePopupComponent,
    ],
    providers: [
        FaltaService,
        FaltaPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class UnidadEducativaBackendFaltaModule {}
