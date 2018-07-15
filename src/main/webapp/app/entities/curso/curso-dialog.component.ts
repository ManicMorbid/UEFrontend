import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Curso } from './curso.model';
import { CursoPopupService } from './curso-popup.service';
import { CursoService } from './curso.service';
import { Ambiente, AmbienteService } from '../ambiente';
import { Materia, MateriaService } from '../materia';
import { User, UserService } from '../../shared';

@Component({
    selector: 'jhi-curso-dialog',
    templateUrl: './curso-dialog.component.html'
})
export class CursoDialogComponent implements OnInit {

    curso: Curso;
    isSaving: boolean;

    ambientes: Ambiente[];

    materias: Materia[];

    users: User[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private cursoService: CursoService,
        private ambienteService: AmbienteService,
        private materiaService: MateriaService,
        private userService: UserService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.ambienteService
            .query({filter: 'curso-is-null'})
            .subscribe((res: HttpResponse<Ambiente[]>) => {
                if (!this.curso.ambiente || !this.curso.ambiente.id) {
                    this.ambientes = res.body;
                } else {
                    this.ambienteService
                        .find(this.curso.ambiente.id)
                        .subscribe((subRes: HttpResponse<Ambiente>) => {
                            this.ambientes = [subRes.body].concat(res.body);
                        }, (subRes: HttpErrorResponse) => this.onError(subRes.message));
                }
            }, (res: HttpErrorResponse) => this.onError(res.message));
        this.materiaService.query()
            .subscribe((res: HttpResponse<Materia[]>) => { this.materias = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.userService.query()
            .subscribe((res: HttpResponse<User[]>) => { this.users = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.curso.id !== undefined) {
            this.subscribeToSaveResponse(
                this.cursoService.update(this.curso));
        } else {
            this.subscribeToSaveResponse(
                this.cursoService.create(this.curso));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Curso>>) {
        result.subscribe((res: HttpResponse<Curso>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Curso) {
        this.eventManager.broadcast({ name: 'cursoListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackAmbienteById(index: number, item: Ambiente) {
        return item.id;
    }

    trackMateriaById(index: number, item: Materia) {
        return item.id;
    }

    trackUserById(index: number, item: User) {
        return item.id;
    }

    getSelected(selectedVals: Array<any>, option: any) {
        if (selectedVals) {
            for (let i = 0; i < selectedVals.length; i++) {
                if (option.id === selectedVals[i].id) {
                    return selectedVals[i];
                }
            }
        }
        return option;
    }
}

@Component({
    selector: 'jhi-curso-popup',
    template: ''
})
export class CursoPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private cursoPopupService: CursoPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.cursoPopupService
                    .open(CursoDialogComponent as Component, params['id']);
            } else {
                this.cursoPopupService
                    .open(CursoDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
