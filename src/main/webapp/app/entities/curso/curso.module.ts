import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { UnidadEducativaBackendSharedModule } from '../../shared';
import { UnidadEducativaBackendAdminModule } from '../../admin/admin.module';
import {
    CursoService,
    CursoPopupService,
    CursoComponent,
    CursoDetailComponent,
    CursoDialogComponent,
    CursoPopupComponent,
    CursoDeletePopupComponent,
    CursoDeleteDialogComponent,
    cursoRoute,
    cursoPopupRoute,
} from './';

const ENTITY_STATES = [
    ...cursoRoute,
    ...cursoPopupRoute,
];

@NgModule({
    imports: [
        UnidadEducativaBackendSharedModule,
        UnidadEducativaBackendAdminModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        CursoComponent,
        CursoDetailComponent,
        CursoDialogComponent,
        CursoDeleteDialogComponent,
        CursoPopupComponent,
        CursoDeletePopupComponent,
    ],
    entryComponents: [
        CursoComponent,
        CursoDialogComponent,
        CursoPopupComponent,
        CursoDeleteDialogComponent,
        CursoDeletePopupComponent,
    ],
    providers: [
        CursoService,
        CursoPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class UnidadEducativaBackendCursoModule {}
