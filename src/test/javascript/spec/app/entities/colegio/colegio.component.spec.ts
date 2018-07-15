/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { UnidadEducativaBackendTestModule } from '../../../test.module';
import { ColegioComponent } from '../../../../../../main/webapp/app/entities/colegio/colegio.component';
import { ColegioService } from '../../../../../../main/webapp/app/entities/colegio/colegio.service';
import { Colegio } from '../../../../../../main/webapp/app/entities/colegio/colegio.model';

describe('Component Tests', () => {

    describe('Colegio Management Component', () => {
        let comp: ColegioComponent;
        let fixture: ComponentFixture<ColegioComponent>;
        let service: ColegioService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [UnidadEducativaBackendTestModule],
                declarations: [ColegioComponent],
                providers: [
                    ColegioService
                ]
            })
            .overrideTemplate(ColegioComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ColegioComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ColegioService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new Colegio(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.colegios[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
