import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { AnuncioComponent } from './anuncio.component';
import { AnuncioDetailComponent } from './anuncio-detail.component';
import { AnuncioPopupComponent } from './anuncio-dialog.component';
import { AnuncioDeletePopupComponent } from './anuncio-delete-dialog.component';

export const anuncioRoute: Routes = [
    {
        path: 'anuncio',
        component: AnuncioComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Anuncios'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'anuncio/:id',
        component: AnuncioDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Anuncios'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const anuncioPopupRoute: Routes = [
    {
        path: 'anuncio-new',
        component: AnuncioPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Anuncios'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'anuncio/:id/edit',
        component: AnuncioPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Anuncios'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'anuncio/:id/delete',
        component: AnuncioDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Anuncios'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
