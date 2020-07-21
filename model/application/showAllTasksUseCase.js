/**
 * Use case: showing all available tasks.
 * 
 * @param {Object} implementation
 * @param {Function} implementation.getAllTasks a concrete implementation of getAllTasks.
 * @returns {Function} a function that fetches all tasks from the database.
 */
const showAllTasksUseCase = ({ getAllTasks }) => async () => {
    try {
        const tasks = await getAllTasks();
        return tasks;
    } catch (err) {
        throw new Error('Can\'t retrieve tasks.');
    }
}

module.exports = {
    showAllTasksUseCase
}