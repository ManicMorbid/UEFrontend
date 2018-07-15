import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { Actividad } from './actividad.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<Actividad>;

@Injectable()
export class ActividadService {

    private resourceUrl =  SERVER_API_URL + 'api/actividads';

    constructor(private http: HttpClient) { }

    create(actividad: Actividad): Observable<EntityResponseType> {
        const copy = this.convert(actividad);
        return this.http.post<Actividad>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(actividad: Actividad): Observable<EntityResponseType> {
        const copy = this.convert(actividad);
        return this.http.put<Actividad>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Actividad>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Actividad[]>> {
        const options = createRequestOption(req);
        return this.http.get<Actividad[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Actividad[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Actividad = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Actividad[]>): HttpResponse<Actividad[]> {
        const jsonResponse: Actividad[] = res.body;
        const body: Actividad[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Actividad.
     */
    private convertItemFromServer(actividad: Actividad): Actividad {
        const copy: Actividad = Object.assign({}, actividad);
        return copy;
    }

    /**
     * Convert a Actividad to a JSON which can be sent to the server.
     */
    private convert(actividad: Actividad): Actividad {
        const copy: Actividad = Object.assign({}, actividad);
        return copy;
    }
}
