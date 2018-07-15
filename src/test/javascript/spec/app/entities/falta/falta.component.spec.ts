/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { UnidadEducativaBackendTestModule } from '../../../test.module';
import { FaltaComponent } from '../../../../../../main/webapp/app/entities/falta/falta.component';
import { FaltaService } from '../../../../../../main/webapp/app/entities/falta/falta.service';
import { Falta } from '../../../../../../main/webapp/app/entities/falta/falta.model';

describe('Component Tests', () => {

    describe('Falta Management Component', () => {
        let comp: FaltaComponent;
        let fixture: ComponentFixture<FaltaComponent>;
        let service: FaltaService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [UnidadEducativaBackendTestModule],
                declarations: [FaltaComponent],
                providers: [
                    FaltaService
                ]
            })
            .overrideTemplate(FaltaComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(FaltaComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FaltaService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new Falta(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.faltas[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
