/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { UnidadEducativaBackendTestModule } from '../../../test.module';
import { ActividadDetailComponent } from '../../../../../../main/webapp/app/entities/actividad/actividad-detail.component';
import { ActividadService } from '../../../../../../main/webapp/app/entities/actividad/actividad.service';
import { Actividad } from '../../../../../../main/webapp/app/entities/actividad/actividad.model';

describe('Component Tests', () => {

    describe('Actividad Management Detail Component', () => {
        let comp: ActividadDetailComponent;
        let fixture: ComponentFixture<ActividadDetailComponent>;
        let service: ActividadService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [UnidadEducativaBackendTestModule],
                declarations: [ActividadDetailComponent],
                providers: [
                    ActividadService
                ]
            })
            .overrideTemplate(ActividadDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ActividadDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ActividadService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new Actividad(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.actividad).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
