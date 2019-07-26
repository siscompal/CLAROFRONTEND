export class Activation {

    constructor(
        public numero: string,
        public iccid: string,
        public id_pdv: string
     ) {}
}

export class Activated {

    constructor(
        public nombre: string,
        public documento: string,
        public direccion: string,
        public numero: string,
        public iccid: string,
        public id_pdv: string,
        public _id: string
     ) {}
}
