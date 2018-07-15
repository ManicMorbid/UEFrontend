import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Colegio } from './colegio.model';
import { ColegioPopupService } from './colegio-popup.service';
import { ColegioService } from './colegio.service';

@Component({
    selector: 'jhi-colegio-delete-dialog',
    templateUrl: './colegio-delete-dialog.component.html'
})
export class ColegioDeleteDialogComponent {

    colegio: Colegio;

    constructor(
        private colegioService: ColegioService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.colegioService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'colegioListModification',
                content: 'Deleted an colegio'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-colegio-delete-popup',
    template: ''
})
export class ColegioDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private colegioPopupService: ColegioPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.colegioPopupService
                .open(ColegioDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
