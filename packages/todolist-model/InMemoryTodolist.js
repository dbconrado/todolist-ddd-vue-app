const { TodolistModel } = require('./TodolistModel');
const inMemoryDb = require('./infrastructure/inMemoryDb');
const inMemoryUserDb = require('./infrastructure/inMemoryUserDb')

/**
 * The in-memory database with three example tasks
 * indexed by their ids.
 * @type {Object}
 */
const inMemDb = {
    task1: {
        uid: 'task1',
        description: 'prepare lunch',
        isComplete: false,
        dateCreated: new Date(),
        dateCompleted: null
    },
    task2: {
        uid: 'task2',
        description: 'do the dishes',
        isComplete: false,
        dateCreated: new Date(),
        dateCompleted: null
    },
    task3: {
        uid: 'task3',
        description: 'rest for a bit',
        isComplete: false,
        dateCreated: new Date(),
        dateCompleted: null
    }
};

const inMemUsers = {
    daniel: {
        givenName: 'Daniel',
        lastName: 'Conrado',
        username: 'daniel',
        email: 'dbconrado@gmail.com',
        password: '1234'
    }
}

/**
 * A todolist model object that relies on the beforementioned in-memory database.
 * @type {Object}
 */
const todolist = TodolistModel({
    getAllTasks: inMemoryDb.getAllTasks(inMemDb),
    getTaskById: inMemoryDb.getTaskById(inMemDb),
    saveTask: inMemoryDb.saveTask(inMemDb),
    getUserByUsername: inMemoryUserDb.getUserByUsername(inMemUsers),
    createUser: inMemoryUserDb.createUser(inMemUsers)
});

module.exports = todolist;