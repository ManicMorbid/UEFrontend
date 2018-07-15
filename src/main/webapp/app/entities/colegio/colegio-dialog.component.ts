import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Colegio } from './colegio.model';
import { ColegioPopupService } from './colegio-popup.service';
import { ColegioService } from './colegio.service';

@Component({
    selector: 'jhi-colegio-dialog',
    templateUrl: './colegio-dialog.component.html'
})
export class ColegioDialogComponent implements OnInit {

    colegio: Colegio;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private colegioService: ColegioService,
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
        if (this.colegio.id !== undefined) {
            this.subscribeToSaveResponse(
                this.colegioService.update(this.colegio));
        } else {
            this.subscribeToSaveResponse(
                this.colegioService.create(this.colegio));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Colegio>>) {
        result.subscribe((res: HttpResponse<Colegio>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Colegio) {
        this.eventManager.broadcast({ name: 'colegioListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-colegio-popup',
    template: ''
})
export class ColegioPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private colegioPopupService: ColegioPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.colegioPopupService
                    .open(ColegioDialogComponent as Component, params['id']);
            } else {
                this.colegioPopupService
                    .open(ColegioDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
