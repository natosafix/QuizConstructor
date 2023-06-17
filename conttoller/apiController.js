class ApiController {
    //TODO
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

    async getQuizzes(userData) {
        const data = {
            "groupVm1": {
                "id": '1',
                "name": "Контора",
                "isAdmin": "1",
                "quizVms": [
                    {
                        "id": "1",
                        "name": "Пятиминутка №15",
                        "description": "Пятиминутка о вёрстке и стилях",
                        "score": 0,
                        "start-time" : "2019-07-26T12:43:23",
                        "end-time" : "2022-07-26T12:43:23",
                    },
                    {
                        "id": "2",
                        "name": "Пятиминутка №228",
                        "description": "Пятиминутка о вёрстке и стилях",
                        "score": 0,
                        "start-time" : "2019-07-26T12:43:23",
                        "end-time" : "2022-07-26T12:43:23",
                    }
                ]
            }
        }
        return data;
    }

    async getForm(formId) {
        return undefined;
    }
}

module.exports = new ApiController();