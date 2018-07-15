import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { Materia } from './materia.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<Materia>;

@Injectable()
export class MateriaService {

    private resourceUrl =  SERVER_API_URL + 'api/materias';

    constructor(private http: HttpClient) { }

    create(materia: Materia): Observable<EntityResponseType> {
        const copy = this.convert(materia);
        return this.http.post<Materia>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(materia: Materia): Observable<EntityResponseType> {
        const copy = this.convert(materia);
        return this.http.put<Materia>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Materia>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Materia[]>> {
        const options = createRequestOption(req);
        return this.http.get<Materia[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Materia[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Materia = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Materia[]>): HttpResponse<Materia[]> {
        const jsonResponse: Materia[] = res.body;
        const body: Materia[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Materia.
     */
    private convertItemFromServer(materia: Materia): Materia {
        const copy: Materia = Object.assign({}, materia);
        return copy;
    }

    /**
     * Convert a Materia to a JSON which can be sent to the server.
     */
    private convert(materia: Materia): Materia {
        const copy: Materia = Object.assign({}, materia);
        return copy;
    }
}
