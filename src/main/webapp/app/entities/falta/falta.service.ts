import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { Falta } from './falta.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<Falta>;

@Injectable()
export class FaltaService {

    private resourceUrl =  SERVER_API_URL + 'api/faltas';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(falta: Falta): Observable<EntityResponseType> {
        const copy = this.convert(falta);
        return this.http.post<Falta>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(falta: Falta): Observable<EntityResponseType> {
        const copy = this.convert(falta);
        return this.http.put<Falta>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Falta>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Falta[]>> {
        const options = createRequestOption(req);
        return this.http.get<Falta[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Falta[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Falta = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Falta[]>): HttpResponse<Falta[]> {
        const jsonResponse: Falta[] = res.body;
        const body: Falta[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Falta.
     */
    private convertItemFromServer(falta: Falta): Falta {
        const copy: Falta = Object.assign({}, falta);
        copy.fecha = this.dateUtils
            .convertLocalDateFromServer(falta.fecha);
        return copy;
    }

    /**
     * Convert a Falta to a JSON which can be sent to the server.
     */
    private convert(falta: Falta): Falta {
        const copy: Falta = Object.assign({}, falta);
        copy.fecha = this.dateUtils
            .convertLocalDateToServer(falta.fecha);
        return copy;
    }
}
