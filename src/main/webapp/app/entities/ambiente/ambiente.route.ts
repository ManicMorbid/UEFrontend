import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { AmbienteComponent } from './ambiente.component';
import { AmbienteDetailComponent } from './ambiente-detail.component';
import { AmbientePopupComponent } from './ambiente-dialog.component';
import { AmbienteDeletePopupComponent } from './ambiente-delete-dialog.component';

export const ambienteRoute: Routes = [
    {
        path: 'ambiente',
        component: AmbienteComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Ambientes'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'ambiente/:id',
        component: AmbienteDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Ambientes'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const ambientePopupRoute: Routes = [
    {
        path: 'ambiente-new',
        component: AmbientePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Ambientes'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'ambiente/:id/edit',
        component: AmbientePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Ambientes'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'ambiente/:id/delete',
        component: AmbienteDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Ambientes'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
