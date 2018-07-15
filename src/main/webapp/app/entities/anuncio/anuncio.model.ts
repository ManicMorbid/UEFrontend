import { BaseEntity } from './../../shared';

export class Anuncio implements BaseEntity {
    constructor(
        public id?: number,
        public nombre?: string,
        public descripcion?: string,
        public imagens?: BaseEntity[],
        public curso?: BaseEntity,
        public materia?: BaseEntity,
    ) {
    }
}
