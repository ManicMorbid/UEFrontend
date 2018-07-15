import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { UnidadEducativaBackendSharedModule } from '../../shared';
import { UnidadEducativaBackendAdminModule } from '../../admin/admin.module';
import {
    MateriaService,
    MateriaPopupService,
    MateriaComponent,
    MateriaDetailComponent,
    MateriaDialogComponent,
    MateriaPopupComponent,
    MateriaDeletePopupComponent,
    MateriaDeleteDialogComponent,
    materiaRoute,
    materiaPopupRoute,
} from './';

const ENTITY_STATES = [
    ...materiaRoute,
    ...materiaPopupRoute,
];

@NgModule({
    imports: [
        UnidadEducativaBackendSharedModule,
        UnidadEducativaBackendAdminModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        MateriaComponent,
        MateriaDetailComponent,
        MateriaDialogComponent,
        MateriaDeleteDialogComponent,
        MateriaPopupComponent,
        MateriaDeletePopupComponent,
    ],
    entryComponents: [
        MateriaComponent,
        MateriaDialogComponent,
        MateriaPopupComponent,
        MateriaDeleteDialogComponent,
        MateriaDeletePopupComponent,
    ],
    providers: [
        MateriaService,
        MateriaPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class UnidadEducativaBackendMateriaModule {}
