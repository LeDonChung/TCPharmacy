export class Student {
    constructor(
        public id: number,
        public name: string,
        public email: string,
        public cpf: string,
        public ra: string,
        public createdAt: Date,
        public updatedAt: Date
    ) {}
}