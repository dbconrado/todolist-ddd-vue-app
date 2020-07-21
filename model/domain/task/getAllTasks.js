/**
 * Gets all tasks from the repository (no order guaranteed).
 * This is a higher order function.
 * 
 * @param {Function} getAllTasksImpl the actual concrete implementation
 */
const getAllTasks = (getAllTasksImpl = async () => {throw new Error('missing implementation')}) => async () => {
    const allTasks = await getAllTasksImpl();
    return allTasks;    
}

module.exports = {
    getAllTasks
}