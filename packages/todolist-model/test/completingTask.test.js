const expect = require('chai').expect;

const { TodolistModel } = require('../model/TodolistModel');
const { getTaskById, saveTask, getAllTasks } = require('../model/infrastructure/inMemoryDb');

const { complete } = require('../model/domain/task/behaviors');

const { TaskData } = require('../model/domain/task/data');

function getInMemDb() {
    return {
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
    }
}

describe('Testing getTaskById Impl', () => {
    it('should retrieve the task of id task1', async () => {
        const inMemDb = getInMemDb();

        const funcToTest = getTaskById(inMemDb);
        const taskData = await funcToTest('task1');        
        expect(taskData.uid).to.equal('task1');
        expect(taskData.isComplete).to.be.a('boolean');
    })
})

describe('Testing saveTask function impl', () => {
    it('should save a new task', async () => {
        const inMemDb = getInMemDb();

        const _saveTask = saveTask(inMemDb);

        const newTask = TaskData({
            uid: 'new_task',
            description: 'another task',
            isComplete: false,
            dateCreated: new Date(),
            dateCompleted: null
        });

        await _saveTask(newTask);
        expect(inMemDb['new_task']).to.equal(newTask);
    })
})

describe('Testing complete function', () => {
    it('should mark task as completed', () => {
        const inMemDb = getInMemDb();

        let task = inMemDb.task1;
        expect(task.isComplete).to.be.false;
        task = complete({taskData: task});
        expect(task.isComplete).to.be.true;

    })
})

describe('Function: getting all tasks', () => {
    it('should return an array of tasks', async () => {
        const inMemDb = getInMemDb();

        const _getAllTasks = getAllTasks(inMemDb);
        const tasks = await _getAllTasks();

        expect(tasks).to.be.an('array');
        expect(tasks[0].uid).to.equal('task1');
        expect(tasks[1].uid).to.equal('task2');
        expect(tasks[2].uid).to.equal('task3');
        expect(tasks[3]).to.not.exist;
    })
})

describe('Feature: completing a task', () => {
    it('should complete task', async () => {

        const inMemDb = getInMemDb();

        const todolist = TodolistModel({
            getTaskById: getTaskById(inMemDb),
            saveTask: saveTask(inMemDb)
        });

        await todolist.completeTask({ taskId: 'task1' });
        expect(inMemDb['task1'].isComplete).to.be.true;
    })
})

describe('Feature: getting all tasks', () => {
    it('should retrieve all tasks', async () => {
        const inMemDb = getInMemDb();

        const todolist = TodolistModel({
            getTaskById: getTaskById(inMemDb),
            saveTask: saveTask(inMemDb),
            getAllTasks: getAllTasks(inMemDb)
        });

        const tasks = await todolist.showAllTasks();
        expect(tasks).to.be.an('array');
        expect(tasks[0].uid).to.equal('task1');
        expect(tasks[1].uid).to.equal('task2');
        expect(tasks[2].uid).to.equal('task3');
        expect(tasks[3]).to.not.exist;      
    })
})