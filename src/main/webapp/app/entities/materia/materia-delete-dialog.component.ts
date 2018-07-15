import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Materia } from './materia.model';
import { MateriaPopupService } from './materia-popup.service';
import { MateriaService } from './materia.service';

@Component({
    selector: 'jhi-materia-delete-dialog',
    templateUrl: './materia-delete-dialog.component.html'
})
export class MateriaDeleteDialogComponent {

    materia: Materia;

    constructor(
        private materiaService: MateriaService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.materiaService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'materiaListModification',
                content: 'Deleted an materia'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-materia-delete-popup',
    template: ''
})
export class MateriaDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private materiaPopupService: MateriaPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.materiaPopupService
                .open(MateriaDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
