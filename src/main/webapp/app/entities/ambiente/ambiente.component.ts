import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Ambiente } from './ambiente.model';
import { AmbienteService } from './ambiente.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-ambiente',
    templateUrl: './ambiente.component.html'
})
export class AmbienteComponent implements OnInit, OnDestroy {
ambientes: Ambiente[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private ambienteService: AmbienteService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.ambienteService.query().subscribe(
            (res: HttpResponse<Ambiente[]>) => {
                this.ambientes = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInAmbientes();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Ambiente) {
        return item.id;
    }
    registerChangeInAmbientes() {
        this.eventSubscriber = this.eventManager.subscribe('ambienteListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
