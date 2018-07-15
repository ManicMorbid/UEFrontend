import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Actividad } from './actividad.model';
import { ActividadPopupService } from './actividad-popup.service';
import { ActividadService } from './actividad.service';

@Component({
    selector: 'jhi-actividad-dialog',
    templateUrl: './actividad-dialog.component.html'
})
export class ActividadDialogComponent implements OnInit {

    actividad: Actividad;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private actividadService: ActividadService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.actividad.id !== undefined) {
            this.subscribeToSaveResponse(
                this.actividadService.update(this.actividad));
        } else {
            this.subscribeToSaveResponse(
                this.actividadService.create(this.actividad));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Actividad>>) {
        result.subscribe((res: HttpResponse<Actividad>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Actividad) {
        this.eventManager.broadcast({ name: 'actividadListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-actividad-popup',
    template: ''
})
export class ActividadPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private actividadPopupService: ActividadPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.actividadPopupService
                    .open(ActividadDialogComponent as Component, params['id']);
            } else {
                this.actividadPopupService
                    .open(ActividadDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
