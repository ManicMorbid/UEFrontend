import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Ambiente } from './ambiente.model';
import { AmbientePopupService } from './ambiente-popup.service';
import { AmbienteService } from './ambiente.service';

@Component({
    selector: 'jhi-ambiente-delete-dialog',
    templateUrl: './ambiente-delete-dialog.component.html'
})
export class AmbienteDeleteDialogComponent {

    ambiente: Ambiente;

    constructor(
        private ambienteService: AmbienteService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.ambienteService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'ambienteListModification',
                content: 'Deleted an ambiente'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-ambiente-delete-popup',
    template: ''
})
export class AmbienteDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private ambientePopupService: AmbientePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.ambientePopupService
                .open(AmbienteDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
