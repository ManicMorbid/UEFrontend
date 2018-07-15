/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { UnidadEducativaBackendTestModule } from '../../../test.module';
import { AmbienteDetailComponent } from '../../../../../../main/webapp/app/entities/ambiente/ambiente-detail.component';
import { AmbienteService } from '../../../../../../main/webapp/app/entities/ambiente/ambiente.service';
import { Ambiente } from '../../../../../../main/webapp/app/entities/ambiente/ambiente.model';

describe('Component Tests', () => {

    describe('Ambiente Management Detail Component', () => {
        let comp: AmbienteDetailComponent;
        let fixture: ComponentFixture<AmbienteDetailComponent>;
        let service: AmbienteService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [UnidadEducativaBackendTestModule],
                declarations: [AmbienteDetailComponent],
                providers: [
                    AmbienteService
                ]
            })
            .overrideTemplate(AmbienteDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AmbienteDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AmbienteService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new Ambiente(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.ambiente).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
