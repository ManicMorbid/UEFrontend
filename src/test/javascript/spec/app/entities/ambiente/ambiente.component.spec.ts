/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { UnidadEducativaBackendTestModule } from '../../../test.module';
import { AmbienteComponent } from '../../../../../../main/webapp/app/entities/ambiente/ambiente.component';
import { AmbienteService } from '../../../../../../main/webapp/app/entities/ambiente/ambiente.service';
import { Ambiente } from '../../../../../../main/webapp/app/entities/ambiente/ambiente.model';

describe('Component Tests', () => {

    describe('Ambiente Management Component', () => {
        let comp: AmbienteComponent;
        let fixture: ComponentFixture<AmbienteComponent>;
        let service: AmbienteService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [UnidadEducativaBackendTestModule],
                declarations: [AmbienteComponent],
                providers: [
                    AmbienteService
                ]
            })
            .overrideTemplate(AmbienteComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AmbienteComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AmbienteService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new Ambiente(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.ambientes[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
