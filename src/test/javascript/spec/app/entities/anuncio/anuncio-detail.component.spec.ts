/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { UnidadEducativaBackendTestModule } from '../../../test.module';
import { AnuncioDetailComponent } from '../../../../../../main/webapp/app/entities/anuncio/anuncio-detail.component';
import { AnuncioService } from '../../../../../../main/webapp/app/entities/anuncio/anuncio.service';
import { Anuncio } from '../../../../../../main/webapp/app/entities/anuncio/anuncio.model';

describe('Component Tests', () => {

    describe('Anuncio Management Detail Component', () => {
        let comp: AnuncioDetailComponent;
        let fixture: ComponentFixture<AnuncioDetailComponent>;
        let service: AnuncioService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [UnidadEducativaBackendTestModule],
                declarations: [AnuncioDetailComponent],
                providers: [
                    AnuncioService
                ]
            })
            .overrideTemplate(AnuncioDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AnuncioDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AnuncioService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new Anuncio(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.anuncio).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
