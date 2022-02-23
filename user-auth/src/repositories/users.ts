import db from '../db';
import { User } from './../models/user';


class UserRepository {

    async findAll(): Promise<User[]> {
        const query = "Select id, username from my_users"
        const { rows } = await db.query<User>(query)

        return rows
    }

    async findById(id: string): Promise<User> {

        const query = `Select id, username from my_users where id = '${id}'`
        const { rows } = await db.query<User>(query)

        return rows?.[0]
    }

    async create(user: User): Promise<User> {
        const insert = `INSERT INTO my_users 
                    (username,  password)
                    VALUES ($1, crypt($2, 'salt'))
                    RETURNING id`

        const values = [user.username, user.password]

        const { rows } = await db.query<{ id: string }>(insert, values)
        user.id = rows?.[0].id

        return user
    }

    async update(user: User): Promise<string> {
        const update = `UPDATE my_users 
                        SET 
                            username = $1,
                            password = crypt($2, 'salt')
                        WHERE id = $3 `

        const values = [user.username, user.password, user.id];
        await db.query(update, values);

        return 'Update with success'
    }

    async remove(id: string): Promise<string> {
        const remove = `DELETE from my_users where id = '${id}'`
        await db.query(remove)

        return 'Delete with success'
    }

    async getUserByLogin(username: string, password: string): Promise<User | null> {
        const query = `Select id, username from my_users where username = '${username}' and password = crypt('${password}', 'salt')`
        const { rows } = await db.query<User>(query)

        return rows?.[0] ?? null
    }
}

export default new UserRepository()