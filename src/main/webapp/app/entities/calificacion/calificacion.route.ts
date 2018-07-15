import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { CalificacionComponent } from './calificacion.component';
import { CalificacionDetailComponent } from './calificacion-detail.component';
import { CalificacionPopupComponent } from './calificacion-dialog.component';
import { CalificacionDeletePopupComponent } from './calificacion-delete-dialog.component';

export const calificacionRoute: Routes = [
    {
        path: 'calificacion',
        component: CalificacionComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Calificacions'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'calificacion/:id',
        component: CalificacionDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Calificacions'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const calificacionPopupRoute: Routes = [
    {
        path: 'calificacion-new',
        component: CalificacionPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Calificacions'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'calificacion/:id/edit',
        component: CalificacionPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Calificacions'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'calificacion/:id/delete',
        component: CalificacionDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Calificacions'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
