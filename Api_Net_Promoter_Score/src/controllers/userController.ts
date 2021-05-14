import { appError } from './../errors/appError';
import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { UserRepository } from '../repositories/userRepository';
import * as yup from 'yup'

class UserController {

    async create(req: Request, res: Response) {
        const { name, email } = req.body;

        const schema = yup.object().shape({
            name: yup.string().required(),
            email: yup.string().required()
        })

        try {
            await schema.validate(req.body, { abortEarly: false });

        } catch (err) {
            throw new appError(err, 400)
        }

        const userRepository = getCustomRepository(UserRepository)
        const userAlredyExists = await userRepository.findOne({ email })

        if (userAlredyExists) {
            throw new appError('User already exists', 400)
        }

        const user = userRepository.create({
            name,
            email,
        })
        await userRepository.save(user)

        return res.status(201).json(user)
    }
}

export { UserController };

