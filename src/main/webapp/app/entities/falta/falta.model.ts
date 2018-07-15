import { BaseEntity, User } from './../../shared';

export class Falta implements BaseEntity {
    constructor(
        public id?: number,
        public fecha?: any,
        public licencia?: boolean,
        public userestudiante?: User,
    ) {
        this.licencia = false;
    }
}
