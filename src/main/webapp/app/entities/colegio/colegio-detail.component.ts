import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { Colegio } from './colegio.model';
import { ColegioService } from './colegio.service';

@Component({
    selector: 'jhi-colegio-detail',
    templateUrl: './colegio-detail.component.html'
})
export class ColegioDetailComponent implements OnInit, OnDestroy {

    colegio: Colegio;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private colegioService: ColegioService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInColegios();
    }

    load(id) {
        this.colegioService.find(id)
            .subscribe((colegioResponse: HttpResponse<Colegio>) => {
                this.colegio = colegioResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInColegios() {
        this.eventSubscriber = this.eventManager.subscribe(
            'colegioListModification',
            (response) => this.load(this.colegio.id)
        );
    }
}
