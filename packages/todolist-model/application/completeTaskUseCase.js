const { complete } = require('../domain/task/behaviors')

/**
 * Use case: completing a task.
 * 
 * @param {Object} functions
 * @param {Function} functions.getTaskById a concrete implementation of getTaskById
 * @param {Function} functions.saveTask a concrete implementation of saveTask
 * @return {Function}
 */
const completeTaskUseCase = ({ getTaskById, saveTask }) => 
    /**
     * @param {Object} params
     * @param {number} taskId the task id to complete
     * @param {Object} [dateCompleted] the date it was completed.
     */
    async ({ taskId, dateCompleted }) => {
        const taskData = await getTaskById(taskId);
        const newTaskData = complete({taskData, dateCompleted});
        await saveTask(newTaskData); 
    }

module.exports = {
    completeTaskUseCase
}