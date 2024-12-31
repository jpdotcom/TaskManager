<template>
  <v-dialog v-model="dialog" persistent max-width="600px">
    <v-card>
      <v-card-title>
        <div
          class="headline"
          style="text-align: center; background-color: #2196f3; color: white"
        >
          <v-icon v-if="isEdit">mdi-pencil</v-icon>

          <v-icon v-else>mdi-plus</v-icon>
          {{ isEdit ? 'Edit Task' : 'New Task' }}
        </div>
      </v-card-title>

      <v-card-text>
        <v-form ref="form" v-model="valid">
          <!-- Task Title -->
          <v-text-field
            v-model="task.title"
            :rules="titleRules"
            label="Task Title"
            required
            :readonly="isEdit == true"
          ></v-text-field>

          <!-- Task Description -->
          <v-textarea
            v-model="task.description"
            label="Task Description"
            rows="3"
            :rules="descRules"
          ></v-textarea>

          <!-- Deadline with text input and format validation -->
          <v-text-field
            type="date"
            v-model="task.deadline"
            label="Deadline (MM/DD/YYYY)"
            :rules="dateRules"
            required
          ></v-text-field>

          <!-- Task Priority -->
          <v-select
            v-model="task.priority"
            :items="['Low', 'Medium', 'High']"
            label="Priority"
          ></v-select>
        </v-form>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="save" color="blue darken-1" text>Save</v-btn>
        <v-btn @click="close" color="red darken-1" text>Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    value: Boolean,
    isEdit: Boolean,
    task: Object,
  },
  data() {
    return {
      dialog: this.value,
      valid: false, // Tracks the form validity
      titleRules: [(v) => !!v || this.isEdit || 'Task Title is required'], // Title must be provided
      descRules: [(v) => this.isValidDesc(v) || 'Description is required'],
      dateRules: [
        (v) => !!v || 'Deadline is required', // Deadline must be provided
      ],
      task: {
        title: '',
        description: '',
        deadline: '',
        priority: 'Medium',
        isComplete: false,
      },
    };
  },
  watch: {
    value(val) {
      this.dialog = val;
    },
    dialog(val) {
      this.$emit('input', val);
      if (!val) {
        this.resetTask();
      }
    },
  },
  methods: {
    isValidDesc(v) {
      return !!v;
    },
    // Custom method to validate MM/DD/YYYY date format
    isValidTitle(value) {
      return !!value || this.isEdit;
    },
    isValidDate(value) {
      return !!value;
    },

    close() {
      this.dialog = false; // Close the dialog
      this.isEdit = false;
    },

    // Save task only if both the title and deadline are valid
    save() {
      // Validate the form, and proceed only if it's valid

      if (
        this.$refs.form.validate() &&
        this.isValidDate(this.task.deadline) &&
        this.isValidTitle(this.task.title) &&
        this.isValidDesc(this.task.description)
      ) {
        console.log('SAVING');
        if (this.isEdit) {
          this.$emit('update-task', { ...this.task }); // Emit update event
        } else {
          this.$emit('add-task', { ...this.task }); // Emit add event
        }
      }
    },

    resetTask() {
      this.task.title = '';
      this.task.description = '';
      this.task.deadline = '';
      this.task.priority = 'Medium';
      this.task.isComplete = false;
    },
  },
};
</script>

<style scoped>
/* Add any necessary styles here */
</style>
