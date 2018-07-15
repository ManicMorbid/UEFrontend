import { BaseEntity } from './../../shared';

export class Ambiente implements BaseEntity {
    constructor(
        public id?: number,
        public nombre?: string,
        public capacidad?: number,
        public descripcion?: string,
    ) {
    }
}
