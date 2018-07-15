import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { Falta } from './falta.model';
import { FaltaService } from './falta.service';

@Injectable()
export class FaltaPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private faltaService: FaltaService

    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.faltaService.find(id)
                    .subscribe((faltaResponse: HttpResponse<Falta>) => {
                        const falta: Falta = faltaResponse.body;
                        if (falta.fecha) {
                            falta.fecha = {
                                year: falta.fecha.getFullYear(),
                                month: falta.fecha.getMonth() + 1,
                                day: falta.fecha.getDate()
                            };
                        }
                        this.ngbModalRef = this.faltaModalRef(component, falta);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.faltaModalRef(component, new Falta());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    faltaModalRef(component: Component, falta: Falta): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.falta = falta;
        modalRef.result.then((result) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        });
        return modalRef;
    }
}
