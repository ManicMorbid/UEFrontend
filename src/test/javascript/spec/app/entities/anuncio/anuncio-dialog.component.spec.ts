/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { UnidadEducativaBackendTestModule } from '../../../test.module';
import { AnuncioDialogComponent } from '../../../../../../main/webapp/app/entities/anuncio/anuncio-dialog.component';
import { AnuncioService } from '../../../../../../main/webapp/app/entities/anuncio/anuncio.service';
import { Anuncio } from '../../../../../../main/webapp/app/entities/anuncio/anuncio.model';
import { CursoService } from '../../../../../../main/webapp/app/entities/curso';
import { MateriaService } from '../../../../../../main/webapp/app/entities/materia';

describe('Component Tests', () => {

    describe('Anuncio Management Dialog Component', () => {
        let comp: AnuncioDialogComponent;
        let fixture: ComponentFixture<AnuncioDialogComponent>;
        let service: AnuncioService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [UnidadEducativaBackendTestModule],
                declarations: [AnuncioDialogComponent],
                providers: [
                    CursoService,
                    MateriaService,
                    AnuncioService
                ]
            })
            .overrideTemplate(AnuncioDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AnuncioDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AnuncioService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Anuncio(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.anuncio = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'anuncioListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Anuncio();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.anuncio = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'anuncioListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
