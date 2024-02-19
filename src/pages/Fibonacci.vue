<template>
  <q-page padding>
    <q-input
      data-test="inputFibonacci"
      for="fibInput"
      rounded
      outlined
      bottom-slots
      v-model="n"
      label="n: "
      :dense="dense"
      placeholder="Please provide a valid number to calculate fibonacci(n): "
      :rules="[
        (value) =>
          (value !== undefined && value.length > 0 && !isNaN(value)) ||
          'Please provide a valid number to calculate fibonacci(n)',
      ]"
    >
      <template v-slot:after>
        <q-btn
          data-test="btnFibonacci"
          round
          dense
          flat
          color="primary"
          icon="calculate"
          @click="fibonacci"
          :disable="submitButtonDisable"
        />
      </template>
    </q-input>
    <q-input
      data-test="inputResult"
      for="fibResult"
      borderless
      v-model="fibn"
      label="Fibonacci(n): "
      :dense="dense"
      readonly
    />
  </q-page>
</template>
<script>
import { defineComponent, ref } from "vue";
export default defineComponent({
  name: "FibonacciPage",
  data() {
    return {
      n: ref(0),
      fibn: ref(1),
      dense: ref(false),
    };
  },
  computed: {
    submitButtonDisable: {
      get() {
        return this.n === undefined || !this.n.length || isNaN(this.n);
      },
    },
  },
  methods: {
    async fibonacci() {
      if (this.n !== undefined && this.n.length > 0 && !isNaN(this.n)) {
        if (this.n <= 1) this.fibn = 1;
        else {
          let n = +this.n;
          // return fib(n-2) + fib(n-1)
          let result = [0, 1];
          for (let i = 2; i < n + 1; i++) {
            result[i % 2] = result[(i - 2) % 2] + result[(i - 1) % 2];
          }
          this.fibn = result[n % 2];
        }
      } else
        console.log(
          "Please provide a valid integer as query string for fibonacci(n) calculation!"
        );
    },
  },
});
</script>
<style>
/* This is where your CSS goes */
</style>
