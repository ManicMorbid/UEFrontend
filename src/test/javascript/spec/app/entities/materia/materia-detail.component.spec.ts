/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { UnidadEducativaBackendTestModule } from '../../../test.module';
import { MateriaDetailComponent } from '../../../../../../main/webapp/app/entities/materia/materia-detail.component';
import { MateriaService } from '../../../../../../main/webapp/app/entities/materia/materia.service';
import { Materia } from '../../../../../../main/webapp/app/entities/materia/materia.model';

describe('Component Tests', () => {

    describe('Materia Management Detail Component', () => {
        let comp: MateriaDetailComponent;
        let fixture: ComponentFixture<MateriaDetailComponent>;
        let service: MateriaService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [UnidadEducativaBackendTestModule],
                declarations: [MateriaDetailComponent],
                providers: [
                    MateriaService
                ]
            })
            .overrideTemplate(MateriaDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(MateriaDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MateriaService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new Materia(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.materia).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
