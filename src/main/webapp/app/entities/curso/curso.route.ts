import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { CursoComponent } from './curso.component';
import { CursoDetailComponent } from './curso-detail.component';
import { CursoPopupComponent } from './curso-dialog.component';
import { CursoDeletePopupComponent } from './curso-delete-dialog.component';

export const cursoRoute: Routes = [
    {
        path: 'curso',
        component: CursoComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Cursos'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'curso/:id',
        component: CursoDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Cursos'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const cursoPopupRoute: Routes = [
    {
        path: 'curso-new',
        component: CursoPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Cursos'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'curso/:id/edit',
        component: CursoPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Cursos'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'curso/:id/delete',
        component: CursoDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Cursos'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
