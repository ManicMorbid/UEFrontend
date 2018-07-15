import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { MateriaComponent } from './materia.component';
import { MateriaDetailComponent } from './materia-detail.component';
import { MateriaPopupComponent } from './materia-dialog.component';
import { MateriaDeletePopupComponent } from './materia-delete-dialog.component';

export const materiaRoute: Routes = [
    {
        path: 'materia',
        component: MateriaComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Materias'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'materia/:id',
        component: MateriaDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Materias'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const materiaPopupRoute: Routes = [
    {
        path: 'materia-new',
        component: MateriaPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Materias'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'materia/:id/edit',
        component: MateriaPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Materias'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'materia/:id/delete',
        component: MateriaDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Materias'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
