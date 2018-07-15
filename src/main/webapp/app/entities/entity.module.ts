import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { UnidadEducativaBackendColegioModule } from './colegio/colegio.module';
import { UnidadEducativaBackendActividadModule } from './actividad/actividad.module';
import { UnidadEducativaBackendImagenModule } from './imagen/imagen.module';
import { UnidadEducativaBackendAmbienteModule } from './ambiente/ambiente.module';
import { UnidadEducativaBackendCursoModule } from './curso/curso.module';
import { UnidadEducativaBackendMateriaModule } from './materia/materia.module';
import { UnidadEducativaBackendFaltaModule } from './falta/falta.module';
import { UnidadEducativaBackendCalificacionModule } from './calificacion/calificacion.module';
import { UnidadEducativaBackendAnuncioModule } from './anuncio/anuncio.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        UnidadEducativaBackendColegioModule,
        UnidadEducativaBackendActividadModule,
        UnidadEducativaBackendImagenModule,
        UnidadEducativaBackendAmbienteModule,
        UnidadEducativaBackendCursoModule,
        UnidadEducativaBackendMateriaModule,
        UnidadEducativaBackendFaltaModule,
        UnidadEducativaBackendCalificacionModule,
        UnidadEducativaBackendAnuncioModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class UnidadEducativaBackendEntityModule {}
