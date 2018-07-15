import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { Colegio } from './colegio.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<Colegio>;

@Injectable()
export class ColegioService {

    private resourceUrl =  SERVER_API_URL + 'api/colegios';

    constructor(private http: HttpClient) { }

    create(colegio: Colegio): Observable<EntityResponseType> {
        const copy = this.convert(colegio);
        return this.http.post<Colegio>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(colegio: Colegio): Observable<EntityResponseType> {
        const copy = this.convert(colegio);
        return this.http.put<Colegio>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Colegio>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Colegio[]>> {
        const options = createRequestOption(req);
        return this.http.get<Colegio[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Colegio[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Colegio = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Colegio[]>): HttpResponse<Colegio[]> {
        const jsonResponse: Colegio[] = res.body;
        const body: Colegio[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Colegio.
     */
    private convertItemFromServer(colegio: Colegio): Colegio {
        const copy: Colegio = Object.assign({}, colegio);
        return copy;
    }

    /**
     * Convert a Colegio to a JSON which can be sent to the server.
     */
    private convert(colegio: Colegio): Colegio {
        const copy: Colegio = Object.assign({}, colegio);
        return copy;
    }
}
