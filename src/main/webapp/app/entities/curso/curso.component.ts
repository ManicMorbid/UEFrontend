import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Curso } from './curso.model';
import { CursoService } from './curso.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-curso',
    templateUrl: './curso.component.html'
})
export class CursoComponent implements OnInit, OnDestroy {
cursos: Curso[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private cursoService: CursoService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.cursoService.query().subscribe(
            (res: HttpResponse<Curso[]>) => {
                this.cursos = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInCursos();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Curso) {
        return item.id;
    }
    registerChangeInCursos() {
        this.eventSubscriber = this.eventManager.subscribe('cursoListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
