import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Materia } from './materia.model';
import { MateriaPopupService } from './materia-popup.service';
import { MateriaService } from './materia.service';
import { User, UserService } from '../../shared';
import { Curso, CursoService } from '../curso';

@Component({
    selector: 'jhi-materia-dialog',
    templateUrl: './materia-dialog.component.html'
})
export class MateriaDialogComponent implements OnInit {

    materia: Materia;
    isSaving: boolean;

    users: User[];

    cursos: Curso[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private materiaService: MateriaService,
        private userService: UserService,
        private cursoService: CursoService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
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
        console.log(this.materia);
        if (this.materia.id !== undefined) {
            this.subscribeToSaveResponse(
                this.materiaService.update(this.materia));
        } else {
            this.subscribeToSaveResponse(
                this.materiaService.create(this.materia));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Materia>>) {
        result.subscribe((res: HttpResponse<Materia>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Materia) {
        this.eventManager.broadcast({ name: 'materiaListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackUserById(index: number, item: User) {
        return item.id;
    }

    trackCursoById(index: number, item: Curso) {
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
    selector: 'jhi-materia-popup',
    template: ''
})
export class MateriaPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private materiaPopupService: MateriaPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.materiaPopupService
                    .open(MateriaDialogComponent as Component, params['id']);
            } else {
                this.materiaPopupService
                    .open(MateriaDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
