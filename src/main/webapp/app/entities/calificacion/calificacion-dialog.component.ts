import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Calificacion } from './calificacion.model';
import { CalificacionPopupService } from './calificacion-popup.service';
import { CalificacionService } from './calificacion.service';
import { Materia, MateriaService } from '../materia';
import { User, UserService } from '../../shared';
import { Curso, CursoService } from '../curso';

@Component({
    selector: 'jhi-calificacion-dialog',
    templateUrl: './calificacion-dialog.component.html'
})
export class CalificacionDialogComponent implements OnInit {

    calificacion: Calificacion;
    isSaving: boolean;

    materias: Materia[];

    users: User[];

    cursos: Curso[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private calificacionService: CalificacionService,
        private materiaService: MateriaService,
        private userService: UserService,
        private cursoService: CursoService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.materiaService.query()
            .subscribe((res: HttpResponse<Materia[]>) => { this.materias = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.userService.query()
            .subscribe((res: HttpResponse<User[]>) => { this.users = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.cursoService.query()
            .subscribe((res: HttpResponse<Curso[]>) => { this.cursos = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.calificacion.id !== undefined) {
            this.subscribeToSaveResponse(
                this.calificacionService.update(this.calificacion));
        } else {
            this.subscribeToSaveResponse(
                this.calificacionService.create(this.calificacion));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Calificacion>>) {
        result.subscribe((res: HttpResponse<Calificacion>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Calificacion) {
        this.eventManager.broadcast({ name: 'calificacionListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackMateriaById(index: number, item: Materia) {
        return item.id;
    }

    trackUserById(index: number, item: User) {
        return item.id;
    }

    trackCursoById(index: number, item: Curso) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-calificacion-popup',
    template: ''
})
export class CalificacionPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private calificacionPopupService: CalificacionPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.calificacionPopupService
                    .open(CalificacionDialogComponent as Component, params['id']);
            } else {
                this.calificacionPopupService
                    .open(CalificacionDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
