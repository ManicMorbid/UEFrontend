/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { UnidadEducativaBackendTestModule } from '../../../test.module';
import { ActividadComponent } from '../../../../../../main/webapp/app/entities/actividad/actividad.component';
import { ActividadService } from '../../../../../../main/webapp/app/entities/actividad/actividad.service';
import { Actividad } from '../../../../../../main/webapp/app/entities/actividad/actividad.model';

describe('Component Tests', () => {

    describe('Actividad Management Component', () => {
        let comp: ActividadComponent;
        let fixture: ComponentFixture<ActividadComponent>;
        let service: ActividadService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [UnidadEducativaBackendTestModule],
                declarations: [ActividadComponent],
                providers: [
                    ActividadService
                ]
            })
            .overrideTemplate(ActividadComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ActividadComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ActividadService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new Actividad(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.actividads[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
