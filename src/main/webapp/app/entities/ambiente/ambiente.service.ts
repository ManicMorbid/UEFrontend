import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { Ambiente } from './ambiente.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<Ambiente>;

@Injectable()
export class AmbienteService {

    private resourceUrl =  SERVER_API_URL + 'api/ambientes';

    constructor(private http: HttpClient) { }

    create(ambiente: Ambiente): Observable<EntityResponseType> {
        const copy = this.convert(ambiente);
        return this.http.post<Ambiente>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(ambiente: Ambiente): Observable<EntityResponseType> {
        const copy = this.convert(ambiente);
        return this.http.put<Ambiente>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Ambiente>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Ambiente[]>> {
        const options = createRequestOption(req);
        return this.http.get<Ambiente[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Ambiente[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Ambiente = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Ambiente[]>): HttpResponse<Ambiente[]> {
        const jsonResponse: Ambiente[] = res.body;
        const body: Ambiente[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Ambiente.
     */
    private convertItemFromServer(ambiente: Ambiente): Ambiente {
        const copy: Ambiente = Object.assign({}, ambiente);
        return copy;
    }

    /**
     * Convert a Ambiente to a JSON which can be sent to the server.
     */
    private convert(ambiente: Ambiente): Ambiente {
        const copy: Ambiente = Object.assign({}, ambiente);
        return copy;
    }
}
