/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { UnidadEducativaBackendTestModule } from '../../../test.module';
import { CalificacionDetailComponent } from '../../../../../../main/webapp/app/entities/calificacion/calificacion-detail.component';
import { CalificacionService } from '../../../../../../main/webapp/app/entities/calificacion/calificacion.service';
import { Calificacion } from '../../../../../../main/webapp/app/entities/calificacion/calificacion.model';

describe('Component Tests', () => {

    describe('Calificacion Management Detail Component', () => {
        let comp: CalificacionDetailComponent;
        let fixture: ComponentFixture<CalificacionDetailComponent>;
        let service: CalificacionService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [UnidadEducativaBackendTestModule],
                declarations: [CalificacionDetailComponent],
                providers: [
                    CalificacionService
                ]
            })
            .overrideTemplate(CalificacionDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CalificacionDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CalificacionService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new Calificacion(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.calificacion).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
