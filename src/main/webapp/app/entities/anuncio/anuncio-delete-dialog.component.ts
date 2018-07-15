import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Anuncio } from './anuncio.model';
import { AnuncioPopupService } from './anuncio-popup.service';
import { AnuncioService } from './anuncio.service';

@Component({
    selector: 'jhi-anuncio-delete-dialog',
    templateUrl: './anuncio-delete-dialog.component.html'
})
export class AnuncioDeleteDialogComponent {

    anuncio: Anuncio;

    constructor(
        private anuncioService: AnuncioService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.anuncioService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'anuncioListModification',
                content: 'Deleted an anuncio'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-anuncio-delete-popup',
    template: ''
})
export class AnuncioDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private anuncioPopupService: AnuncioPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.anuncioPopupService
                .open(AnuncioDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
