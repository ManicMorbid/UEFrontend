/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { UnidadEducativaBackendTestModule } from '../../../test.module';
import { CalificacionDialogComponent } from '../../../../../../main/webapp/app/entities/calificacion/calificacion-dialog.component';
import { CalificacionService } from '../../../../../../main/webapp/app/entities/calificacion/calificacion.service';
import { Calificacion } from '../../../../../../main/webapp/app/entities/calificacion/calificacion.model';
import { MateriaService } from '../../../../../../main/webapp/app/entities/materia';
import { UserService } from '../../../../../../main/webapp/app/shared';
import { CursoService } from '../../../../../../main/webapp/app/entities/curso';

describe('Component Tests', () => {

    describe('Calificacion Management Dialog Component', () => {
        let comp: CalificacionDialogComponent;
        let fixture: ComponentFixture<CalificacionDialogComponent>;
        let service: CalificacionService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [UnidadEducativaBackendTestModule],
                declarations: [CalificacionDialogComponent],
                providers: [
                    MateriaService,
                    UserService,
                    CursoService,
                    CalificacionService
                ]
            })
            .overrideTemplate(CalificacionDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CalificacionDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CalificacionService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Calificacion(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.calificacion = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'calificacionListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Calificacion();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.calificacion = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'calificacionListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
