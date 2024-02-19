<template>
  <q-page padding>
    <div v-if="loading"><q-spinner /> Fetching data...</div>
    <div v-else>
      <q-list>
        <q-item-label header>Todos</q-item-label>
        <q-item v-for="(todo, index) in todos" :key="index">
          <q-item-label>
            {{ todo.title }}
          </q-item-label>
        </q-item>
      </q-list>
    </div>
    <q-btn
      v-if="!loading"
      color="primary"
      label="Seed Data"
      class="q-mt-md"
      @click="seedData()"
    />
  </q-page>
</template>

<script>
import seedData from "../../data/todos.json";
import { defineComponent } from "vue";
import { getFirestore, collection, getDocs, addDoc } from "firebase/firestore";

export default defineComponent({
  name: "FireStorePage",
  data() {
    return {
      loading: true,
      todos: [],
      todoTitles: new Set(),
    };
  },
  created() {
    this.getData();
  },
  methods: {
    async getData() {
      this.loading = true;
      this.todos = [];
      let db = getFirestore();
      let querySnapshot = await getDocs(collection(db, "todos"));
      this.todoTitles.clear();
      querySnapshot.forEach((doc) => {
        let data = doc.data();
        this.todos.push(data.todo);
        this.todoTitles.add(data.todo.title);
      });
      this.loading = false;
    },
    async seedData() {
      seedData.forEach(async (todo) => {
        /*
        This will incur costs - both execution and Cloud charges
        let querySnapshot = await getDocs(
          query(
            collection(getFirestore(), "todos"),
            where("todo.title", "==", todo.title)
          )
        );
        if (querySnapshot.empty) {
        */
        if (!this.todoTitles.has(todo.title)) {
          // Contents of first document
          await addDoc(collection(getFirestore(), "todos"), { todo });
          this.todos.push(todo);
          this.todoTitles.add(todo.title);
        } else {
          await this.showNotif(
            "Cannot add existing todo item: " + todo.title,
            "warning"
          );
        }
      });
    },
    async showNotif(msg, level) {
      await this.$q.notify({
        message: msg,
        type: level,
        actions: [
          {
            icon: "close",
            // for individual action (button):
            attrs: {
              "aria-label": "Dismiss",
            },
          },
        ],
      });
    },
  },
});
</script>
