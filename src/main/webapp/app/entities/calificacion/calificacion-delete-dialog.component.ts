import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Calificacion } from './calificacion.model';
import { CalificacionPopupService } from './calificacion-popup.service';
import { CalificacionService } from './calificacion.service';

@Component({
    selector: 'jhi-calificacion-delete-dialog',
    templateUrl: './calificacion-delete-dialog.component.html'
})
export class CalificacionDeleteDialogComponent {

    calificacion: Calificacion;

    constructor(
        private calificacionService: CalificacionService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.calificacionService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'calificacionListModification',
                content: 'Deleted an calificacion'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-calificacion-delete-popup',
    template: ''
})
export class CalificacionDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private calificacionPopupService: CalificacionPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.calificacionPopupService
                .open(CalificacionDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
