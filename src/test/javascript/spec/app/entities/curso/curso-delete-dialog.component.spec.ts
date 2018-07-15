/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { UnidadEducativaBackendTestModule } from '../../../test.module';
import { CursoDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/curso/curso-delete-dialog.component';
import { CursoService } from '../../../../../../main/webapp/app/entities/curso/curso.service';

describe('Component Tests', () => {

    describe('Curso Management Delete Component', () => {
        let comp: CursoDeleteDialogComponent;
        let fixture: ComponentFixture<CursoDeleteDialogComponent>;
        let service: CursoService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [UnidadEducativaBackendTestModule],
                declarations: [CursoDeleteDialogComponent],
                providers: [
                    CursoService
                ]
            })
            .overrideTemplate(CursoDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CursoDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CursoService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        spyOn(service, 'delete').and.returnValue(Observable.of({}));

                        // WHEN
                        comp.confirmDelete(123);
                        tick();

                        // THEN
                        expect(service.delete).toHaveBeenCalledWith(123);
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
