import { BaseEntity } from './../../shared';

export class Actividad implements BaseEntity {
    constructor(
        public id?: number,
        public nombre?: string,
        public descripcion?: string,
        public imagens?: BaseEntity[],
    ) {
    }
}
