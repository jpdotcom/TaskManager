<template>
  <div class="header">
    <div class="bars">
      <div class="bar"></div>
      <div class="bar"></div>
      <div class="bar"></div>
    </div>
    <h1 class="title">FRAMEWORK</h1>
    <v-btn @click="showDialog = true" color="primary"> + Add Task </v-btn>
  </div>
  <v-container>
    <v-table>
      <template v-slot:default>
        <thead>
          <tr>
            <th>Task</th>
            <th>Description</th>
            <th>Deadline</th>
            <th>Priority</th>
            <th>Is Complete</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(task, index) in tasks" :key="index">
            <td>{{ task.title }}</td>
            <td>{{ task.description }}</td>
            <td>{{ task.deadline }}</td>
            <td>{{ task.priority }}</td>
            <td>
              <v-checkbox
                v-model="task.isComplete"
                @click="toggleComplete(task)"
              ></v-checkbox>
            </td>
            <td>
              <v-btn
                v-if="!task.isComplete"
                @click="editTask(task)"
                color="blue"
                icon
              >
                <v-icon>mdi-pencil</v-icon>
              </v-btn>

              <v-btn @click="deleteTask(task)" color="red" icon>
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </td>
          </tr>
        </tbody>
      </template>
    </v-table>
  </v-container>

  <task-dialog
    :value="showDialog"
    :task="currentTask"
    :isEdit="isEdit"
    @input="showDialog = $event"
    @add-task="addTask"
    @update-task="updateTask"
  />
</template>

<script>
import taskDialog from './components/taskDialog.vue';
import $ from 'jquery';
import toastr from 'https://esm.sh/toastr';
import { useToast } from 'vue-toastification';
import Toast, { POSITION } from 'vue-toastification';
export default {
  name: 'HeaderComponent',

  components: {
    taskDialog,
  },
  data() {
    return {
      showDialog: false,
      tasks: [],
      isEdit: false,
      oldTask: false,
    };
  },

  methods: {
    addTask(newTask) {
      const toast = useToast();
      console.log('Added!');
      const index = this.tasks.findIndex((t) => t.title === newTask.title);

      if (index == -1 || this.isEdit) {
        this.tasks.push(newTask);
        this.showDialog = false;
        toast.success(this.isEdit ? 'Edited' : 'Added', {
          position: POSITION.BOTTOM_LEFT,
        });
        return true;
      } else {
        toast.error('Task already there!', { position: POSITION.BOTTOM_LEFT });
        console.log('repeated');
        return false;
      }
    },
    toggleComplete(task) {
      task.isComplete = !task.isComplete;
      console.log(task.isComplete);
    },
    deleteTask(task, editDelete = false) {
      const toast = useToast();
      const index = this.tasks.findIndex((t) => t.title === task.title);
      if (!editDelete) {
        this.tasks.splice(index, 1);
        console.log('Toast-Notif');
        toast.success('Task Deleted! 🎉', { position: POSITION.BOTTOM_LEFT });
      } else {
        this.tasks.splice(index, 1);
      }
    },

    editTask(task) {
      console.log('Editting');
      this.currentTask = { ...task }; // Copy the task to currentTask
      this.oldTask = task;
      this.showDialog = true;
      this.isEdit = true; // Set edit mode
    },
    updateTask(updatedTask) {
      updatedTask.title = this.oldTask.title;
      let added = this.addTask(updatedTask);
      const toast = useToast();
      console.log(added);
      if (added) {
        this.showDialog = false;
        this.isEdit = false; // Reset edit mode after update
        this.deleteTask(this.oldTask, true);
      } else {
        console.log('Repeated Title');
      }
    },
  },
};
</script>

<style scoped>
.header {
  display: flex;
  align-items: center;
  background-color: #2196f3; /* Blue color */
  padding: 10px 20px; /* Padding around the header */
}

.bars {
  display: flex;
  margin-right: 15px; /* Space between bars and title */
  align-items: center;
}

.bar {
  width: 5px; /* Width of the bars */
  height: 20px; /* Height of the bars */
  background-color: white; /* Color of the bars */
  margin: 0 2px; /* Space between the bars */
}

.title {
  color: white; /* Title text color */
  margin: 0; /* Remove default margin */
  flex-grow: 1; /* Take up remaining space to center title */
  text-align: center; /* Center the title */
}
</style>
