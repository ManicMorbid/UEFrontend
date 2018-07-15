import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Materia } from './materia.model';
import { MateriaService } from './materia.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-materia',
    templateUrl: './materia.component.html'
})
export class MateriaComponent implements OnInit, OnDestroy {
materias: Materia[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private materiaService: MateriaService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.materiaService.query().subscribe(
            (res: HttpResponse<Materia[]>) => {
                this.materias = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInMaterias();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Materia) {
        return item.id;
    }
    registerChangeInMaterias() {
        this.eventSubscriber = this.eventManager.subscribe('materiaListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
