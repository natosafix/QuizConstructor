class ApiController {
    users = {};
    async getUser(username) {
        //TODO
        console.log(this.users);
        if (!(this.users.hasOwnProperty(username)))
            return undefined;
        return {username, password: this.users[username]};
    }

    async createUser(userData) {
        this.users[userData.username] = userData.password;
        console.log(this.users);
        return userData;
    }
}

module.exports = new ApiController();