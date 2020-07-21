/**
 * This project combines the doman driven design with
 * functional programming to model the app.
 * 
 * It is divided in three parts:
 * - domain          where the data and behaviors are modeled
 * - application     where use cases (or user stories) are modeled  
 * - infrastructure  where infra specificities are modeles (like db, auth etc.)
 */

/**
 * @typedef {Object} Task
 * @property {string} uid
 * @property {string} description
 * @property {boolean} isComplete
 * @property {Object} dateCreated
 * @property {Object} dateCompleted
 */

/**
 * Creates an immutable task object
 * 
 * @param {Task|Object}
 * @return {Task} A new immutable task
 */
const TaskData = ({ uid, description, isComplete = false, dateCreated = null, 
    dateCompleted = null}) => Object.freeze({
    uid,
    description,
    isComplete,
    dateCreated,
    dateCompleted
});

module.exports = {
    TaskData
}