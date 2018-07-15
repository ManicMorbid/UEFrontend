import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { UnidadEducativaBackendSharedModule } from '../../shared';
import {
    AmbienteService,
    AmbientePopupService,
    AmbienteComponent,
    AmbienteDetailComponent,
    AmbienteDialogComponent,
    AmbientePopupComponent,
    AmbienteDeletePopupComponent,
    AmbienteDeleteDialogComponent,
    ambienteRoute,
    ambientePopupRoute,
} from './';

const ENTITY_STATES = [
    ...ambienteRoute,
    ...ambientePopupRoute,
];

@NgModule({
    imports: [
        UnidadEducativaBackendSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        AmbienteComponent,
        AmbienteDetailComponent,
        AmbienteDialogComponent,
        AmbienteDeleteDialogComponent,
        AmbientePopupComponent,
        AmbienteDeletePopupComponent,
    ],
    entryComponents: [
        AmbienteComponent,
        AmbienteDialogComponent,
        AmbientePopupComponent,
        AmbienteDeleteDialogComponent,
        AmbienteDeletePopupComponent,
    ],
    providers: [
        AmbienteService,
        AmbientePopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class UnidadEducativaBackendAmbienteModule {}
