import { BaseEntity } from './../../shared';

export class Imagen implements BaseEntity {
    constructor(
        public id?: number,
        public nombre?: string,
        public fecha?: any,
        public imgContentType?: string,
        public img?: any,
        public actividad?: BaseEntity,
        public anuncio?: BaseEntity,
    ) {
    }
}
