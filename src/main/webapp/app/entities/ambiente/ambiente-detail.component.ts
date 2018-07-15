import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { Ambiente } from './ambiente.model';
import { AmbienteService } from './ambiente.service';

@Component({
    selector: 'jhi-ambiente-detail',
    templateUrl: './ambiente-detail.component.html'
})
export class AmbienteDetailComponent implements OnInit, OnDestroy {

    ambiente: Ambiente;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private ambienteService: AmbienteService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInAmbientes();
    }

    load(id) {
        this.ambienteService.find(id)
            .subscribe((ambienteResponse: HttpResponse<Ambiente>) => {
                this.ambiente = ambienteResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInAmbientes() {
        this.eventSubscriber = this.eventManager.subscribe(
            'ambienteListModification',
            (response) => this.load(this.ambiente.id)
        );
    }
}
