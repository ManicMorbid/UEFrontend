/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { UnidadEducativaBackendTestModule } from '../../../test.module';
import { ColegioDetailComponent } from '../../../../../../main/webapp/app/entities/colegio/colegio-detail.component';
import { ColegioService } from '../../../../../../main/webapp/app/entities/colegio/colegio.service';
import { Colegio } from '../../../../../../main/webapp/app/entities/colegio/colegio.model';

describe('Component Tests', () => {

    describe('Colegio Management Detail Component', () => {
        let comp: ColegioDetailComponent;
        let fixture: ComponentFixture<ColegioDetailComponent>;
        let service: ColegioService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [UnidadEducativaBackendTestModule],
                declarations: [ColegioDetailComponent],
                providers: [
                    ColegioService
                ]
            })
            .overrideTemplate(ColegioDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ColegioDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ColegioService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new Colegio(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.colegio).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
