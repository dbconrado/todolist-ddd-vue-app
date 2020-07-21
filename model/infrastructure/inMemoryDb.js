/**
 * Module dependencies
 */
const { getTaskById: createGetTaskById } = require('../domain/task/getTaskById');
const { saveTask: createSaveTask } = require('../domain/task/saveTask');
const { getAllTasks: createGetAllTasks } = require('../domain/task/getAllTasks');

/**
 * Creates a function getTaskById that receives a object that is going to
 * be used as an in-memory database.
 * 
 * 
 * @param {Object} inMemoryDb an object where tasks are going to be 'saved'.
 * @returns {Function} a function that concretely implements the getTaskById behavior.

 * @example
 * 
 * const myInMemoryDb = {
 *  task1: {...},
 *  task2: {...}
 * };
 * 
 * const taskByIdGetter = getTaskById(myInMemoryDb);
 * 
 * const myTask = taskByIdGetter('task1'); // will return the task1 in myInMemoryDb
 */

const getTaskById = inMemoryDb => createGetTaskById(taskId => inMemoryDb[taskId]);

/**
 * Creates a function that may be used to save tasks in an in-memory database.
 * 
 * @param {Object} inMemoryDb an object that serves as an in-memory database
 * @return {Function} a function that concretely implements the saveTask behavior.
 */
const saveTask = inMemoryDb => createSaveTask(taskData => inMemoryDb[taskData.uid] = taskData);

/**
 * Creates a function that may be used to get all tasks from an in-memory database.
 * 
 * @param {Object} inMemoryDb an object that serves as an in-memory database
 * @return {Function} a function that concretely implements the getAllTasks behavior.
 */

const getAllTasks = inMemoryDb => createGetAllTasks(() => Object.values(inMemoryDb));

module.exports = {
    getTaskById,
    saveTask,
    getAllTasks
}