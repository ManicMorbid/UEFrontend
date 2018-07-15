/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { UnidadEducativaBackendTestModule } from '../../../test.module';
import { CursoComponent } from '../../../../../../main/webapp/app/entities/curso/curso.component';
import { CursoService } from '../../../../../../main/webapp/app/entities/curso/curso.service';
import { Curso } from '../../../../../../main/webapp/app/entities/curso/curso.model';

describe('Component Tests', () => {

    describe('Curso Management Component', () => {
        let comp: CursoComponent;
        let fixture: ComponentFixture<CursoComponent>;
        let service: CursoService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [UnidadEducativaBackendTestModule],
                declarations: [CursoComponent],
                providers: [
                    CursoService
                ]
            })
            .overrideTemplate(CursoComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CursoComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CursoService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new Curso(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.cursos[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
