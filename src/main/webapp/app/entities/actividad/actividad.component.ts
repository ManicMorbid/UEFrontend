import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Actividad } from './actividad.model';
import { ActividadService } from './actividad.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-actividad',
    templateUrl: './actividad.component.html'
})
export class ActividadComponent implements OnInit, OnDestroy {
actividads: Actividad[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private actividadService: ActividadService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.actividadService.query().subscribe(
            (res: HttpResponse<Actividad[]>) => {
                this.actividads = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInActividads();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Actividad) {
        return item.id;
    }
    registerChangeInActividads() {
        this.eventSubscriber = this.eventManager.subscribe('actividadListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
