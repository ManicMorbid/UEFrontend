/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { UnidadEducativaBackendTestModule } from '../../../test.module';
import { CalificacionComponent } from '../../../../../../main/webapp/app/entities/calificacion/calificacion.component';
import { CalificacionService } from '../../../../../../main/webapp/app/entities/calificacion/calificacion.service';
import { Calificacion } from '../../../../../../main/webapp/app/entities/calificacion/calificacion.model';

describe('Component Tests', () => {

    describe('Calificacion Management Component', () => {
        let comp: CalificacionComponent;
        let fixture: ComponentFixture<CalificacionComponent>;
        let service: CalificacionService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [UnidadEducativaBackendTestModule],
                declarations: [CalificacionComponent],
                providers: [
                    CalificacionService
                ]
            })
            .overrideTemplate(CalificacionComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CalificacionComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CalificacionService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new Calificacion(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.calificacions[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
