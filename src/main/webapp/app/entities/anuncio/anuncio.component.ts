import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Anuncio } from './anuncio.model';
import { AnuncioService } from './anuncio.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-anuncio',
    templateUrl: './anuncio.component.html'
})
export class AnuncioComponent implements OnInit, OnDestroy {
anuncios: Anuncio[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private anuncioService: AnuncioService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.anuncioService.query().subscribe(
            (res: HttpResponse<Anuncio[]>) => {
                this.anuncios = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInAnuncios();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Anuncio) {
        return item.id;
    }
    registerChangeInAnuncios() {
        this.eventSubscriber = this.eventManager.subscribe('anuncioListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
