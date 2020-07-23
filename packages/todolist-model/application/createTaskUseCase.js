/**
 * 
 * @param {Object} implementation
 * @param {Function} implementation.saveTask A concrete implementation of saveTask behavior.
 * @returns {Function} a function that creates a new task.
 */
const createTaskUseCase = ({saveTask}) => 
/**
 * @param {Task} newTask the task to be created.
 */
async (newTask) => {
    try {
        await saveTask(newTask);
    } catch (err) {
        throw new Error(`Can't save task with description: ${newTask.description}`)
    }
}

module.exports = {
    createTaskUseCase
}