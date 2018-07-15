/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { UnidadEducativaBackendTestModule } from '../../../test.module';
import { AnuncioComponent } from '../../../../../../main/webapp/app/entities/anuncio/anuncio.component';
import { AnuncioService } from '../../../../../../main/webapp/app/entities/anuncio/anuncio.service';
import { Anuncio } from '../../../../../../main/webapp/app/entities/anuncio/anuncio.model';

describe('Component Tests', () => {

    describe('Anuncio Management Component', () => {
        let comp: AnuncioComponent;
        let fixture: ComponentFixture<AnuncioComponent>;
        let service: AnuncioService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [UnidadEducativaBackendTestModule],
                declarations: [AnuncioComponent],
                providers: [
                    AnuncioService
                ]
            })
            .overrideTemplate(AnuncioComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AnuncioComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AnuncioService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new Anuncio(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.anuncios[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
