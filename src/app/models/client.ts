export class Client {

    constructor(
        public _id: string,
        public name: string,
        public lastname: string,
        public iden: string,
        public email: string,
        public username: string,
        public password: string,
        public city: string,
        public dir: string,
        public cel: string,
        public porcentaje: string,
        public efecty: boolean,
        public user: string,
        public saldo_actual: number,
        public comision_actual: number,
        public incentivo_actual: number,
        public status: boolean,
        public role: string,
     ) {}
}
