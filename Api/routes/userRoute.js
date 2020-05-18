const fs = require('fs');
const { join } = require('path');

const filePath = join(__dirname, 'users.json')

const getUsers = () => {
    const data = fs.existsSync(filePath)
        ? fs.readFileSync(filePath)
        : [];

    try {
        return JSON.parse(data);

    } catch (erro) {
        return [];
    }
}

const saveUser = (users) => fs.writeFileSync(filePath, JSON.stringify(users, null, '\t'))

const userRouter = (app) => {
    const users = getUsers()
    app.route('/users/:id?')    
        .get((req, res) => {
            

            res.send({ users })
        })
        .post((req, res) => {            
            users.push(req.body)
            saveUser(users)

            res.status(201).send('Ok')
        })
        .put((req, res) => {
            
            saveUser(users.map(user => {
                const body = req.body;
                if (user.id === req.params.id) {
                    return {
                        user,
                        body
                    }
                }
                return user
            }))
            res.status(200).send('Ok')
        })
        .delete((req,res)=>{

            saveUser(users.filter((user => user.id !== req.params.id)))
            res.status(200).send('OK')
        })
}

module.exports = userRouter;