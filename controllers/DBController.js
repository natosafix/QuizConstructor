class DBController {
    //TODO
    apiUrl = "http://31.129.97.40:3000/api/";
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

    async getRequest(method, body) {
        const link = this.apiUrl + method;
        try {
            return await fetch(link, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            });
        } catch (e) {
            console.error(e);
        }

    }

    async postRequest(method, body) {
        const link = this.apiUrl + method;
        try {
            return await fetch(link, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
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
                            "finished": null,
                            "name": "Пятиминутка №15",
                            "description": "Пятиминутка о вёрстке и стилях",
                            "score": 0,
                            "startTime" : "2019-07-26T12:43:23+05:00",
                            "endTime" : "2025-07-26T12:43:23+05:00",
                        },
                        {
                            "id": 2,
                            "finished": null,
                            "name": "Пятиминутка №228",
                            "description": "Пятиминутка",
                            "score": 0,
                            "startTime" : "2019-07-26T12:43:23+05:00",
                            "endTime" : "2025-07-26T12:43:23+00:00",
                        },
                        {
                            "id": 3,
                            "finished": null,
                            "name": "Вы гей? №322",
                            "description": "",
                            "score": 0,
                            "startTime" : "2019-07-26T12:43:23+05:00",
                            "endTime" : "2020-07-26T12:43:23+00:00",
                        },
                        {
                            "id": 4,
                            "finished": '2020-07-26T12:43:23+05:00',
                            "name": "Двухминутка №1337",
                            "description": "очевидно да",
                            "score": 3.81,
                            "startTime" : "2019-07-26T12:43:23+05:00",
                            "endTime" : "2021-07-26T12:43:23+00:00",
                        },
                        {
                            "id": 5,
                            "finished": '2020-07-26T12:43:23+05:00',
                            "name": "Лох с нулём",
                            "description": "Лох с нулём",
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
                            "finished": null,
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
                            "finished": "2021-07-26T12:43:23+05:00",
                            "name": "Пятиминутка №15",
                            "description": "Пятиминутка о вёрстке и стилях",
                            "score": 2,
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
                            "finished": null,
                            "name": "Моя первая пятиминутка",
                            "description": "Пятиминутка ни о чём",
                            "score": 0,
                            "startTime" : "2019-07-26T12:43:23+05:00",
                            "endTime" : "2025-07-26T12:43:23+05:00",
                        },
                        {
                            "id": 9,
                            "finished": null,
                            "name": "Никогда не настанет",
                            "description": "Пятиминутка ни о чём",
                            "score": 0,
                            "startTime" : "2024-07-26T12:43:23+05:00",
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