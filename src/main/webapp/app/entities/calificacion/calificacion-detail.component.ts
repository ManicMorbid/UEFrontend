import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { Calificacion } from './calificacion.model';
import { CalificacionService } from './calificacion.service';

@Component({
    selector: 'jhi-calificacion-detail',
    templateUrl: './calificacion-detail.component.html'
})
export class CalificacionDetailComponent implements OnInit, OnDestroy {

    calificacion: Calificacion;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private calificacionService: CalificacionService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInCalificacions();
    }

    load(id) {
        this.calificacionService.find(id)
            .subscribe((calificacionResponse: HttpResponse<Calificacion>) => {
                this.calificacion = calificacionResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInCalificacions() {
        this.eventSubscriber = this.eventManager.subscribe(
            'calificacionListModification',
            (response) => this.load(this.calificacion.id)
        );
    }
}
