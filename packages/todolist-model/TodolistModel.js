/**
 * dependencies
 */
const { completeTaskUseCase } = require('./application/completeTaskUseCase');
const { showAllTasksUseCase } = require('./application/showAllTasksUseCase');
const { createTaskUseCase } = require('./application/createTaskUseCase');

/**
 * Creates a Todolist model object which serves as a facade
 * for the Todolist domain.
 * 
 * @param {Object} implementation
 * @param {Function} implementation.getTaskById a concrete implementation of getTaskById
 * @param {Function} implementation.saveTask a concrete implementation of saveTask
 * @param {Function} implementation.getTaskById a concrete implementation of getTaskById
 * @param {Function} implementation.getUserByUsername a concrete implementation of getUserByUsername
 * @param {Function} implementation.createUser a concrete implementation of createUser
 * @returns {Object} a todolist model object.
 */
const TodolistModel = ({ 
    getTaskById, 
    saveTask, 
    getAllTasks, 
    getUserByUsername,
    createUser
 }) => ({
    completeTask: completeTaskUseCase({ getTaskById, saveTask }),
    showAllTasks: showAllTasksUseCase({ getAllTasks }),
    createTask: createTaskUseCase({ saveTask }),
    getTaskById,
    getUserByUsername,
    createUser
})

module.exports = {
    TodolistModel
}