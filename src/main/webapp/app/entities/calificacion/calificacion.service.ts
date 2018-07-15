import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { Calificacion } from './calificacion.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<Calificacion>;

@Injectable()
export class CalificacionService {

    private resourceUrl =  SERVER_API_URL + 'api/calificacions';

    constructor(private http: HttpClient) { }

    create(calificacion: Calificacion): Observable<EntityResponseType> {
        const copy = this.convert(calificacion);
        return this.http.post<Calificacion>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(calificacion: Calificacion): Observable<EntityResponseType> {
        const copy = this.convert(calificacion);
        return this.http.put<Calificacion>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Calificacion>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Calificacion[]>> {
        const options = createRequestOption(req);
        return this.http.get<Calificacion[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Calificacion[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Calificacion = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Calificacion[]>): HttpResponse<Calificacion[]> {
        const jsonResponse: Calificacion[] = res.body;
        const body: Calificacion[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Calificacion.
     */
    private convertItemFromServer(calificacion: Calificacion): Calificacion {
        const copy: Calificacion = Object.assign({}, calificacion);
        return copy;
    }

    /**
     * Convert a Calificacion to a JSON which can be sent to the server.
     */
    private convert(calificacion: Calificacion): Calificacion {
        const copy: Calificacion = Object.assign({}, calificacion);
        return copy;
    }
}
