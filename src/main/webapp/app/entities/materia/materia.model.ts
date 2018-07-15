import { BaseEntity, User } from './../../shared';

export class Materia implements BaseEntity {
    constructor(
        public id?: number,
        public nombre?: string,
        public descripcion?: string,
        public grado?: string,
        public profesor?: User,
        public cursos?: BaseEntity[],
    ) {
    }
}
