const { TaskData } = require('./data');

/**
 * Get a particular task by its id
 * This is a higher order function.
 * 
 * @param {function} getTaskByIdImpl the concrete implementation, that actually fetches from the database
 */
const getTaskById = (getTaskByIdImpl = async (taskId) => { throw new Error(`Can't retrieve task of id ${taskId}: missing implementation`)}) => async taskId => {
    try {
        const task = await getTaskByIdImpl(taskId);
        return TaskData(task);
    } catch (err) {
        throw new Error(`Can't retrieve task of id ${taskId}.`);
    }
}

module.exports = {
    getTaskById
}