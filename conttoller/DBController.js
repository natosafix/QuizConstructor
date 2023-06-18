class DBController {
    //TODO
    apiUrl = "http://localhost:8080/";
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

    async getRequest(method, params) {
        try {
            return await fetch(this.apiUrl + method + '?' + new URLSearchParams(params), {
                method: 'GET'
            });
        } catch (e) {
            console.error(e);
        }

    }

    async postRequest(method, body) {
        try {
        return await fetch(this.apiUrl + method, {
            method: 'POST',
            body: body
        });
        } catch (e) {
            console.error(e);
        }
    }

    async getQuizzes(userId) {
        const data =
            {
                "groupVm1": {
                    "id": 1,
                    "name": "Контора",
                    "isAdmin": false,
                    "quizVms": [
                        {
                            "id": 1,
                            "finished": false,
                            "name": "Пятиминутка №15",
                            "description": "Пятиминутка о вёрстке и стилях",
                            "score": 0,
                            "startTime" : "2019-07-26T12:43:23+05:00",
                            "endTime" : "2025-07-26T12:43:23+05:00",
                        },
                        {
                            "id": 2,
                            "finished": false,
                            "name": "Пятиминутка №228",
                            "description": "Пятиминутка о вёрстке и стилях",
                            "score": 0,
                            "startTime" : "2019-07-26T12:43:23+05:00",
                            "endTime" : "2025-07-26T12:43:23+00:00",
                        }
                    ]
                },
                "groupVm2": {
                    "id": 1,
                    "name": "Контора2",
                    "isAdmin": true,
                    "quizVms": [
                        {
                            "id": 1,
                            "finished": false,
                            "name": "Пятиминутка №15",
                            "description": "Пятиминутка о вёрстке и стилях",
                            "score": 0,
                            "startTime" : "2019-07-26T12:43:23+05:00",
                            "endTime" : "2025-07-26T12:43:23+05:00",
                        },
                    ]
                },
                "groupVm3": {
                    "id": 1,
                    "name": "Контора3",
                    "isAdmin": false,
                    "quizVms": [
                        {
                            "id": 1,
                            "finished": true,
                            "name": "Пятиминутка №15",
                            "description": "Пятиминутка о вёрстке и стилях",
                            "score": 0,
                            "startTime" : "2019-07-26T12:43:23+05:00",
                            "endTime" : "2025-07-26T12:43:23+05:00",
                        },
                    ]
                },
                "groupVm4": {
                    "id": 1,
                    "name": "Контора4",
                    "isAdmin": false,
                    "quizVms": [
                        {
                            "id": 1,
                            "finished": false,
                            "name": "Моя первая пятиминутка",
                            "description": "Пятиминутка ни о чём",
                            "score": 0,
                            "startTime" : "2019-07-26T12:43:23+05:00",
                            "endTime" : "2025-07-26T12:43:23+05:00",
                        },
                    ]
                }

            }
        return data;
    }

    async getGroups(userId) {
        return undefined;
    }

    async createGroup(groupData) {
        return undefined;
    }

    async deleteGroup(groupData) {
        return undefined;
    }

    async addGroupMember(userId) {
        return undefined;
    }

    async addQuiz(quizData) {
        return undefined;
    }

    async deleteQuiz(quizId) {
        return undefined;
    }

    async updateQuiz(quizData) {
        return undefined;
    }

    async addAnswers(answersData) {
        return undefined;
    }

    async updateScore(scoreData) {
        return undefined;
    }

    async getQuiz(quizId) {
        return undefined;
    }
}

module.exports = new DBController();