/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { UnidadEducativaBackendTestModule } from '../../../test.module';
import { CursoDetailComponent } from '../../../../../../main/webapp/app/entities/curso/curso-detail.component';
import { CursoService } from '../../../../../../main/webapp/app/entities/curso/curso.service';
import { Curso } from '../../../../../../main/webapp/app/entities/curso/curso.model';

describe('Component Tests', () => {

    describe('Curso Management Detail Component', () => {
        let comp: CursoDetailComponent;
        let fixture: ComponentFixture<CursoDetailComponent>;
        let service: CursoService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [UnidadEducativaBackendTestModule],
                declarations: [CursoDetailComponent],
                providers: [
                    CursoService
                ]
            })
            .overrideTemplate(CursoDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CursoDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CursoService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new Curso(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.curso).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
