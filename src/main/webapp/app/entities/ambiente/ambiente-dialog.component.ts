import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Ambiente } from './ambiente.model';
import { AmbientePopupService } from './ambiente-popup.service';
import { AmbienteService } from './ambiente.service';

@Component({
    selector: 'jhi-ambiente-dialog',
    templateUrl: './ambiente-dialog.component.html'
})
export class AmbienteDialogComponent implements OnInit {

    ambiente: Ambiente;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private ambienteService: AmbienteService,
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
        if (this.ambiente.id !== undefined) {
            this.subscribeToSaveResponse(
                this.ambienteService.update(this.ambiente));
        } else {
            this.subscribeToSaveResponse(
                this.ambienteService.create(this.ambiente));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Ambiente>>) {
        result.subscribe((res: HttpResponse<Ambiente>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Ambiente) {
        this.eventManager.broadcast({ name: 'ambienteListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-ambiente-popup',
    template: ''
})
export class AmbientePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private ambientePopupService: AmbientePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.ambientePopupService
                    .open(AmbienteDialogComponent as Component, params['id']);
            } else {
                this.ambientePopupService
                    .open(AmbienteDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
