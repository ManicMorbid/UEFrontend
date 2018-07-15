import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Anuncio } from './anuncio.model';
import { AnuncioPopupService } from './anuncio-popup.service';
import { AnuncioService } from './anuncio.service';
import { Curso, CursoService } from '../curso';
import { Materia, MateriaService } from '../materia';

@Component({
    selector: 'jhi-anuncio-dialog',
    templateUrl: './anuncio-dialog.component.html'
})
export class AnuncioDialogComponent implements OnInit {

    anuncio: Anuncio;
    isSaving: boolean;

    cursos: Curso[];

    materias: Materia[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private anuncioService: AnuncioService,
        private cursoService: CursoService,
        private materiaService: MateriaService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.cursoService.query()
            .subscribe((res: HttpResponse<Curso[]>) => { this.cursos = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.materiaService.query()
            .subscribe((res: HttpResponse<Materia[]>) => { this.materias = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.anuncio.id !== undefined) {
            this.subscribeToSaveResponse(
                this.anuncioService.update(this.anuncio));
        } else {
            this.subscribeToSaveResponse(
                this.anuncioService.create(this.anuncio));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Anuncio>>) {
        result.subscribe((res: HttpResponse<Anuncio>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Anuncio) {
        this.eventManager.broadcast({ name: 'anuncioListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackCursoById(index: number, item: Curso) {
        return item.id;
    }

    trackMateriaById(index: number, item: Materia) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-anuncio-popup',
    template: ''
})
export class AnuncioPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private anuncioPopupService: AnuncioPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.anuncioPopupService
                    .open(AnuncioDialogComponent as Component, params['id']);
            } else {
                this.anuncioPopupService
                    .open(AnuncioDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
