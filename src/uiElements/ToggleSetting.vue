<template>
  <q-item tag="label" v-ripple>
    <q-item-section>
      <q-item-label class="text-mono">
        {{ name }}
      </q-item-label>
      <q-item-label caption>{{ description }}</q-item-label>
      <q-item-label
        caption
        class="text-red"
        v-show="warning"
        :key="warning"
        v-for="warning in warnings"
      >
        {{ warning }}
      </q-item-label>
      <q-item-label caption class="text-red" v-show="warningMsg">
        {{ warningMsg }}
      </q-item-label>
    </q-item-section>
    <q-item-section avatar>
      <q-toggle
        color="indigo"
        v-model="model"
        :disable="isToggleDisabled"
        @triggerFunc="btnToggleTrigger"
      />
    </q-item-section>
  </q-item>
</template>

<script>
import { getNestedField } from "./getNestedField";
export default {
  name: "ToggleSetting",
  props: {
    name: String,
    description: String,
    fieldName: String,
    warnings: Array,
    warningMsg: String,
    isToggleDisabled: Boolean,
  },
  data() {
    return {
      btnToggleModel: Boolean,
    };
  },
  mounted() {
    this.btnToggleModel = false;
  },
  computed: {
    model: {
      get: function () {
        //return this.getNestedField(this.fieldName, this.getData(), true);
        return this.btnToggleModel;
      },
      set: function (newValue) {
        this.btnToggleModel = newValue;
        //console.log(`ToggleSetting setter newValue: ${newValue}`);
        this.$emit(
          "triggerFunc",
          this.fieldName.replace(/settings.|paymentsettings./g, ""),
          newValue
        );
      },
    },
  },
  methods: {
    getNestedField,
    getData() {
      return [];
    },
    btnToggleTrigger(newValue) {
      console.log(`btnToggleTrigger(${newValue})`);
      this.model.set(newValue);
    },
  },
};
</script>
