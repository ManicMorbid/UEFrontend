import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { Anuncio } from './anuncio.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<Anuncio>;

@Injectable()
export class AnuncioService {

    private resourceUrl =  SERVER_API_URL + 'api/anuncios';

    constructor(private http: HttpClient) { }

    create(anuncio: Anuncio): Observable<EntityResponseType> {
        const copy = this.convert(anuncio);
        return this.http.post<Anuncio>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(anuncio: Anuncio): Observable<EntityResponseType> {
        const copy = this.convert(anuncio);
        return this.http.put<Anuncio>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Anuncio>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Anuncio[]>> {
        const options = createRequestOption(req);
        return this.http.get<Anuncio[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Anuncio[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Anuncio = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Anuncio[]>): HttpResponse<Anuncio[]> {
        const jsonResponse: Anuncio[] = res.body;
        const body: Anuncio[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Anuncio.
     */
    private convertItemFromServer(anuncio: Anuncio): Anuncio {
        const copy: Anuncio = Object.assign({}, anuncio);
        return copy;
    }

    /**
     * Convert a Anuncio to a JSON which can be sent to the server.
     */
    private convert(anuncio: Anuncio): Anuncio {
        const copy: Anuncio = Object.assign({}, anuncio);
        return copy;
    }
}
