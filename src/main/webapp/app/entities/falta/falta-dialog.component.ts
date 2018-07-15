import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Falta } from './falta.model';
import { FaltaPopupService } from './falta-popup.service';
import { FaltaService } from './falta.service';
import { User, UserService } from '../../shared';

@Component({
    selector: 'jhi-falta-dialog',
    templateUrl: './falta-dialog.component.html'
})
export class FaltaDialogComponent implements OnInit {

    falta: Falta;
    isSaving: boolean;

    users: User[];
    fechaDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private faltaService: FaltaService,
        private userService: UserService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.userService.query()
            .subscribe((res: HttpResponse<User[]>) => { this.users = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.falta.id !== undefined) {
            this.subscribeToSaveResponse(
                this.faltaService.update(this.falta));
        } else {
            this.subscribeToSaveResponse(
                this.faltaService.create(this.falta));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Falta>>) {
        result.subscribe((res: HttpResponse<Falta>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Falta) {
        this.eventManager.broadcast({ name: 'faltaListModification', content: 'OK'});
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
}

@Component({
    selector: 'jhi-falta-popup',
    template: ''
})
export class FaltaPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private faltaPopupService: FaltaPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.faltaPopupService
                    .open(FaltaDialogComponent as Component, params['id']);
            } else {
                this.faltaPopupService
                    .open(FaltaDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
