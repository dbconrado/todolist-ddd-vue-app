const { TaskData } = require('./data');

/**
 * Changes the description of a task.
 * Important: the returned object are not equal to the object passed as param.
 * I do this to ensure immutability.
 * 
 * @param {Task} taskData
 * @return {Task}
 */
const changeDescription = ({ taskData, description }) => {
    return TaskData({
        ...taskData,
        description
    });
}

/**
 * Completes a task.
 * @param {Task} taskData
 * @param {Object} [dateCompleted]
 * @return {Task} newly completed task
 */
const complete = ({ taskData, dateCompleted = new Date()}) => {
    if (taskData.isComplete) {
        throw new Error("TaskAlreadyComplete");
    }
    
    return TaskData({
        ...taskData,
        isComplete: true,
        dateCompleted
    });
}

/**
 * Checks whether a task is open or not
 * 
 * @param {Task} taskData
 * @return {boolean} true is task is open, false otherwise
 */
const isOpen = ({ taskData }) => taskData.isComplete;

/**
 * (Re)opens a task.
 * 
 * @param {Task} taskData
 * @return {Task} the reopened task.
 */
const open = ({ taskData }) => {
    if (isOpen(taskData))
        throw(new Error("TaskAlreadyOpen"));

    return TaskData({
        ...taskData,
        isComplete: false,
        dateCompleted: null
    });
}

module.exports = {
    open,
    isOpen,
    complete,
    changeDescription
}