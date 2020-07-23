const router = require('express').Router();
const todolist = require('../../model/InMemoryTodolist');

/**
 * get all tasks
 * @route     GET /tasks/
 */
router.get('/', async (req, res) => {
    try {
        const tasks = await todolist.showAllTasks();
        res.status(200).json(tasks);
    } catch (err) {
        res.status(500).send({error: err.message});
    }
})

/**
 * get a task by its id
 * @route   GET /tasks/:uid
 */
router.get('/:uid', async (req, res) => {
    try {
        const task = await todolist.getTaskById(req.params.uid);

        if (!task)
            res.status(404).end();
        
        res.status(200).json(task);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
})

/**
 * creates or updates a task.
 * @route   POST /tasks/:uid
 */
router.post('/:uid', async (req, res) => {
    try {
        const theTask = {
            uid: req.params.uid,
            description: req.body.description,
            isComplete: req.body.isComplete || undefined,
            dateCreated: req.body.dateCreated || undefined,
            dateCompleted: req.body.dateCompleted || undefined
        };

        await todolist.createTask(theTask);

        const linkNewTask = '/api/tasks/' + req.params.uid;
        res.status(201)
            .location(linkNewTask)
            .json({
                message: 'task created',
                link: linkNewTask
            });
        
    } catch (err) {
        res.status(500).json({
            error: err.message
        });
    }
})

/**
 * tries to complete a task. Will throw an error if task is already completed.
 * @route   POST /tasks/:uid/complete-task
 */
router.post('/:uid/complete-task', async (req, res) => {
    try {
        await todolist.completeTask({ taskId: req.params.uid, dateCompleted: req.body.dateCompleted });
        res.status(200).end();                
    } catch (err) { // TODO error from domain model aren't being propagated here.
        res.status(500).json({error: err.message});
    }
})

module.exports = router;