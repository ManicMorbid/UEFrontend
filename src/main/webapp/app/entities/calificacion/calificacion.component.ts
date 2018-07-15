import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Calificacion } from './calificacion.model';
import { CalificacionService } from './calificacion.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-calificacion',
    templateUrl: './calificacion.component.html'
})
export class CalificacionComponent implements OnInit, OnDestroy {
calificacions: Calificacion[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private calificacionService: CalificacionService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.calificacionService.query().subscribe(
            (res: HttpResponse<Calificacion[]>) => {
                this.calificacions = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInCalificacions();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Calificacion) {
        return item.id;
    }
    registerChangeInCalificacions() {
        this.eventSubscriber = this.eventManager.subscribe('calificacionListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
