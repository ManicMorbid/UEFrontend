import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { ColegioComponent } from './colegio.component';
import { ColegioDetailComponent } from './colegio-detail.component';
import { ColegioPopupComponent } from './colegio-dialog.component';
import { ColegioDeletePopupComponent } from './colegio-delete-dialog.component';

export const colegioRoute: Routes = [
    {
        path: 'colegio',
        component: ColegioComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Colegios'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'colegio/:id',
        component: ColegioDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Colegios'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const colegioPopupRoute: Routes = [
    {
        path: 'colegio-new',
        component: ColegioPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Colegios'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'colegio/:id/edit',
        component: ColegioPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Colegios'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'colegio/:id/delete',
        component: ColegioDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Colegios'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
