import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { Curso } from './curso.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<Curso>;

@Injectable()
export class CursoService {

    private resourceUrl =  SERVER_API_URL + 'api/cursos';

    constructor(private http: HttpClient) { }

    create(curso: Curso): Observable<EntityResponseType> {
        const copy = this.convert(curso);
        return this.http.post<Curso>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(curso: Curso): Observable<EntityResponseType> {
        const copy = this.convert(curso);
        return this.http.put<Curso>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Curso>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Curso[]>> {
        const options = createRequestOption(req);
        return this.http.get<Curso[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Curso[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Curso = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Curso[]>): HttpResponse<Curso[]> {
        const jsonResponse: Curso[] = res.body;
        const body: Curso[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Curso.
     */
    private convertItemFromServer(curso: Curso): Curso {
        const copy: Curso = Object.assign({}, curso);
        return copy;
    }

    /**
     * Convert a Curso to a JSON which can be sent to the server.
     */
    private convert(curso: Curso): Curso {
        const copy: Curso = Object.assign({}, curso);
        return copy;
    }
}
