const users = [];

class UserController{
    async createUser(req, res){
        const  {name, surname} = req.body;
        console.log(req.body);
        for (let i = 0; i < users.length; i++) {
            if (users[i].name === name && users[i].surname === surname){
                res.json('You are already registered');
                return;
            }
        }
        const newUser = {
            name: name,
            surname: surname
        };
        users.push(newUser);
        console.log(users);
        res.json('You have successfully registered');
    }

    async getUsers(req, res){
        res.json(users);
    }

    async getUser(req, res){

    }
    async updateUser(req, res){

    }

    async deleteUser(req, res){

    }
}

module.exports = new UserController();