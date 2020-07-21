const { TodolistModel } = require('./TodolistModel');
const inMemoryDb = require('./infrastructure/inMemoryDb');

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

/**
 * A todolist model object that relies on the beforementioned in-memory database.
 * @type {Object}
 */
const todolist = TodolistModel({
    getAllTasks: inMemoryDb.getAllTasks(inMemDb),
    getTaskById: inMemoryDb.getTaskById(inMemDb),
    saveTask: inMemoryDb.saveTask(inMemDb)
});

module.exports = todolist;