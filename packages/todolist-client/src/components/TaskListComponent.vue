<template>
  <ul class="collection">
    <li class="collection-item"
      v-for="task in tasks"
      v-bind:item="task"
      v-bind:key="task.uid">
      <label>
        <input type="checkbox" class="filled-in" v-model="task.isComplete"
          v-on:change="completeTask"
          v-bind:data-id="task.uid">
        <span>{{ task.description }}</span> 
      </label>
    </li>
  </ul>
</template>

<script>
import TaskService from '../services/TaskService';

export default {
  name: 'TaskList',
  data: () => ({
    tasks: [],
    error: ''
  }),
  async created() {
    try {
      this.$parent.showProgress();
      this.tasks = await TaskService.getAllTasks();
    } catch (err) {
      this.error = err.message;
    } finally {
      this.$parent.hideProgress();
    }
  },
  methods: {
    async completeTask(event) {
      try {
        this.$parent.showProgress();
        await TaskService.completeTask(event.target.dataset.id);
      } catch (err) {
        this.error = err.message;
        console.log(err);
      } finally {
        this.$parent.hideProgress();
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
