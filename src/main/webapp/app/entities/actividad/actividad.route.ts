import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { ActividadComponent } from './actividad.component';
import { ActividadDetailComponent } from './actividad-detail.component';
import { ActividadPopupComponent } from './actividad-dialog.component';
import { ActividadDeletePopupComponent } from './actividad-delete-dialog.component';

export const actividadRoute: Routes = [
    {
        path: 'actividad',
        component: ActividadComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Actividads'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'actividad/:id',
        component: ActividadDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Actividads'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const actividadPopupRoute: Routes = [
    {
        path: 'actividad-new',
        component: ActividadPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Actividads'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'actividad/:id/edit',
        component: ActividadPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Actividads'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'actividad/:id/delete',
        component: ActividadDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Actividads'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
