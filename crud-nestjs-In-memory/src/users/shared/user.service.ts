import { User } from './../models/user';
import { Injectable } from '@nestjs/common';


@Injectable()
export class UserService {

    constructor() { }

    users: User[] = [
        { idPessoa: 1, nome: 'ana', sobrenome: 'bbb', dataNascimento: new Date('01/02/1990'), dataCadastro: new Date(DataAtual()), pkContato: 1, pkEndereco: 1 },
        { idPessoa: 2, nome: 'paulo', sobrenome: 'ccc', dataNascimento: new Date('11/12/1990'), dataCadastro: new Date(DataAtual()), pkContato: 3, pkEndereco: 3 },
        { idPessoa: 3, nome: 'bruno', sobrenome: 'ddd', dataNascimento: new Date('21/08/1994'), dataCadastro: new Date(DataAtual()), pkContato: 2, pkEndereco: 2 }
    ]

    async getAll() {
        return this.users
    }

    async getById(id: number) {
        let user = this.users.find((obj) => obj.idPessoa == id)
        return user
    }

    async create(user: User) {

        user.idPessoa = this.users.length > 0 ? this.users.length + 1 : 1
        await this.users.push(user)
        return user
    }

    async update(user: User) {

        let myUsers = await this.getById(user.idPessoa)
        if (myUsers) {
            myUsers.nome = user.nome
            myUsers.sobrenome = user.sobrenome
            myUsers.dataNascimento = user.dataNascimento
            myUsers.pkContato = user.pkContato
            myUsers.pkEndereco = user.pkEndereco
        }

        return myUsers
    }

    async delete(id: number) {
        const index = await this.users.findIndex((obj) => obj.idPessoa == id)
        this.users.splice(index, 1)
    }
}
const DataAtual = (): string => {
    let data = new Date();
    let dataFormatada = ((data.getDate())) + "/" + ((data.getMonth() + 1)) + "/" + data.getFullYear()

    return dataFormatada
};
