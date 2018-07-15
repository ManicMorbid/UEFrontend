import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { Anuncio } from './anuncio.model';
import { AnuncioService } from './anuncio.service';

@Component({
    selector: 'jhi-anuncio-detail',
    templateUrl: './anuncio-detail.component.html'
})
export class AnuncioDetailComponent implements OnInit, OnDestroy {

    anuncio: Anuncio;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private anuncioService: AnuncioService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInAnuncios();
    }

    load(id) {
        this.anuncioService.find(id)
            .subscribe((anuncioResponse: HttpResponse<Anuncio>) => {
                this.anuncio = anuncioResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInAnuncios() {
        this.eventSubscriber = this.eventManager.subscribe(
            'anuncioListModification',
            (response) => this.load(this.anuncio.id)
        );
    }
}
