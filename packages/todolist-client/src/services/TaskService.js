import axios from 'axios';

const URL = 'http://localhost:3000/api/tasks/';

/**
 * A service that communicates with a REST server
 * to manipulate tasks
 */
class TaskService {
    /**
     * get all tasks from the REST server.
     * @returns {Array} an array of task objects.
     * @todo it should deal with possible errors like server down or database error
     */
    static async getAllTasks() {
        const res = await axios.get(URL);
        const data = res.data;
        return data;
    }
    
    /**
     * invokes the REST server trying to complete the specified task.
     * 
     * @param {number} taskId the id of the task to be completed
     * @returns {undefined|string} either nothing (meaning it succeded) or
     *  an error message.
     */
    static async completeTask(taskId) {
        const res = await axios.post(`${URL}${taskId}/complete-task`);
        if (res.status == 200)
            return;
        else
            return res.data.error;
    }
}

export default TaskService;