/*const users = [
    { id: '1', name: 'Peter Parker', email: 'peter@marvel.com' },
    { id: '2', name: 'Toni Stark', email: 'toni@marvel.com' },
    { id: '3', name: 'Bruce Wayne', email: 'bruce@dc.com' },
    { id: '4', name: 'Luiz Felipe', email: 'felippe@gmail.com.br' },
]

export class User {
    static findAll(): Promise<any[]> {
        return Promise.resolve(users);
    };
    static findById(id: string): Promise<any> {
        return new Promise(resolve => {
            const filtered = users.filter(user => user.id === id)
            let user = undefined;
            if (filtered.length > 0)
                user = filtered[0];

            resolve(user);
        })
    }
}*/

import * as mongoose from 'mongoose';
import { validateCPF } from './../common/validator';
import * as bcrypt from 'bcrypt';
import { environment } from './../common/environment';

export interface User extends mongoose.Document {
    name: String,
    email: String,
    password: String,
};

export interface UserModel extends mongoose.Model<User> {
    findByEmail(email: string): Promise<User>;
}

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 80, // tamanho maximo
        minlength: 3 // tamanho minimo
    },
    email: {
        type: String,
        unique: true,
        required: true,
        match: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    },
    password: {
        type: String,
        required: true,
        select: false,
        minlength: 6
    },
    gender: {
        type: String,
        required: false,
        enum: ['M', 'F']
    },
    cpf: {
        type: String,
        required: false,
        validate: {
            validator: validateCPF,
            message: '{PATH}:Invalid CPF  ({VALUE})'
        }
    }
});

userSchema.statics.findByEmail = function (email: string) {
    return this.findOne({ email }); //{email:email}
}

const hashPassword = (obj, next) => {
    bcrypt.hash(obj.password, environment.security.saltRounds)
        .then(hash => {
            obj.password = hash;
            next();
        }).catch(next);
}

const saveMiddleware = function (next) {
    const user: any = this
    if (!user.isModified('password')) {
        next();
    } else {
        hashPassword(user, next);
    }
}

const updateMiddleware = function (next) {
    if (!this.getUpdate().password) {
        next();
    } else {
        hashPassword(this.getUpdate(), next);
    }
}

userSchema.pre('save', saveMiddleware);
userSchema.pre('findOneAndUpdate', updateMiddleware);
userSchema.pre('update', updateMiddleware);


export const User = mongoose.model<User,UserModel>('User', userSchema);