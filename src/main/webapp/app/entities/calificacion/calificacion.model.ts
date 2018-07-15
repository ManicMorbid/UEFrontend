import { BaseEntity, User } from './../../shared';

export class Calificacion implements BaseEntity {
    constructor(
        public id?: number,
        public primerbimestrecuantitativo?: number,
        public segundobimestrecuantitativo?: number,
        public tercerbimestrecuantitativo?: number,
        public cuartobimestrecuantitativo?: number,
        public primerbimestrecualitativo?: string,
        public segundobimestrecualitativo?: string,
        public tercerbimestrecualitativo?: string,
        public cuartobimestrecualitativo?: string,
        public materia?: BaseEntity,
        public userestudiante?: User,
        public curso?: BaseEntity,
    ) {
    }
}
