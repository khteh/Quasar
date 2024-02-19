<!--<template>
  <q-page class="row items-center justify-evenly">
    <example-component
      title="Example component"
      active
      :todos="todos"
      :meta="meta"
    ></example-component>
    <div class="row" style="margin-top: 10px">
      <div class="col-6">
        <q-input borderless v-model="greetings" :dense="dense" readonly />
      </div>
    </div>
  </q-page>
</template>-->
<template>
  <q-page padding>
    <div class="row">
      <img
        alt="Quasar logo"
        src="~assets/quasar-logo-vertical.svg"
        style="width: 200px; height: 200px"
      />
    </div>
    <div class="row" style="margin-top: 10px">
      <div class="col-6">
        <q-input borderless v-model="greetings" :dense="dense" readonly />
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import { Todo, Meta } from 'components/models';
//import ExampleComponent from 'components/ExampleComponent.vue';
import { defineComponent, ref } from 'vue';
import { date } from 'quasar';
export default defineComponent({
  name: 'IndexPage',
  data() {
    return {
      greetings: ref(''),
      dense: ref(false),
      afternoon: date.buildDate({
        hours: 12,
      }),
      evening: date.buildDate({
        hours: 18,
      }),
      midnight: date.buildDate({
        hours: 0,
      }),
    };
  },
  mounted() {
    this.Greetings(); // 1
  },
  //components: { ExampleComponent },
  /*setup() {
    const todos = ref<Todo[]>([
      {
        id: 1,
        content: 'ct1',
      },
      {
        id: 2,
        content: 'ct2',
      },
      {
        id: 3,
        content: 'ct3',
      },
      {
        id: 4,
        content: 'ct4',
      },
      {
        id: 5,
        content: 'ct5',
      },
    ]);
    const meta = ref<Meta>({
      totalCount: 1200,
    });
    return { todos, meta };
  },*/
  methods: {
    async Greetings() {
      let timeStamp = new Date(); //Date.now();
      const formattedTimeStamp = date.formatDate(
        timeStamp,
        'Do MMMM YYYY HH:mm:ss'
      );
      let suffix = '';
      this.greetings = '';
      //if (timeStamp > this.midnight && timeStamp < this.afternoon) {
      if (date.isBetweenDates(timeStamp, this.midnight, this.afternoon)) {
        this.greetings += 'Good morning! ';
        suffix = 'Have a great day!';
      } //else if (timeStamp > this.afternoon && timeStamp < this.evening) {
      else if (date.isBetweenDates(timeStamp, this.afternoon, this.evening)) {
        this.greetings += 'Good afternoon! ';
        suffix = 'Have a great day!';
      } else if (timeStamp > this.evening) {
        this.greetings += 'Good evening! ';
        suffix = 'Have a great evening!';
      }
      this.greetings += "It's " + formattedTimeStamp + ' now. ' + suffix;
    },
  },
});
</script>
