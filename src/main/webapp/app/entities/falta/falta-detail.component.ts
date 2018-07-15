import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { Falta } from './falta.model';
import { FaltaService } from './falta.service';

@Component({
    selector: 'jhi-falta-detail',
    templateUrl: './falta-detail.component.html'
})
export class FaltaDetailComponent implements OnInit, OnDestroy {

    falta: Falta;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private faltaService: FaltaService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInFaltas();
    }

    load(id) {
        this.faltaService.find(id)
            .subscribe((faltaResponse: HttpResponse<Falta>) => {
                this.falta = faltaResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInFaltas() {
        this.eventSubscriber = this.eventManager.subscribe(
            'faltaListModification',
            (response) => this.load(this.falta.id)
        );
    }
}
