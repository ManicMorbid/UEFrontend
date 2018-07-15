/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { UnidadEducativaBackendTestModule } from '../../../test.module';
import { MateriaComponent } from '../../../../../../main/webapp/app/entities/materia/materia.component';
import { MateriaService } from '../../../../../../main/webapp/app/entities/materia/materia.service';
import { Materia } from '../../../../../../main/webapp/app/entities/materia/materia.model';

describe('Component Tests', () => {

    describe('Materia Management Component', () => {
        let comp: MateriaComponent;
        let fixture: ComponentFixture<MateriaComponent>;
        let service: MateriaService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [UnidadEducativaBackendTestModule],
                declarations: [MateriaComponent],
                providers: [
                    MateriaService
                ]
            })
            .overrideTemplate(MateriaComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(MateriaComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MateriaService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new Materia(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.materias[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
