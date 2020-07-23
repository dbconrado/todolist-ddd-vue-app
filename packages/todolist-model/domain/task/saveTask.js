/**
 * Saves or updates a particular task in the database.
 * This is a higher order function.
 * 
 * @param {Function} saveTaskImpl The actual implementation for saving a task in a db or whatever
 */
const saveTask = (saveTaskImpl = async (taskData) => {throw new Error(`Can't save task of id ${taskData.uid}: missing implementation`)}) => async taskData => {
    try {
        await saveTaskImpl(taskData);
    } catch (err) {
        throw new Error(`Can't save task of id ${taskData.uid}`);
    }
};

module.exports = {
    saveTask
}