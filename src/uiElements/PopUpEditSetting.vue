<template>
  <q-item tag="label" v-ripple>
    <q-popup-edit
      v-model="model"
      :cover="false"
      fit
      buttons
      :validate="validate"
      @before-show="modelProxy = model"
    >
      <template v-slot:title>
        <div class="text-mono">
          {{ name }}
        </div>
      </template>
      <q-input
        color="indigo"
        v-model="modelProxy"
        dense
        autofocus
        counter
        :type="dataType ? dataType : 'text'"
        :hint="hint"
        :error="error"
        :error-message="errorMessage"
      />
    </q-popup-edit>
    <q-item-section>
      <q-item-label class="text-mono">{{ name }}</q-item-label>
      <q-item-label v-if="offset && model && model.length > offset" caption
        >...{{
          model.substring(model.length - offset, model.length)
        }}</q-item-label
      >
      <q-item-label v-else caption>{{ model }}</q-item-label>
    </q-item-section>
  </q-item>
</template>
<script>
import * as validation from "./validation";
import { getNestedField } from "./getNestedField";

export default {
  name: "PopUpEditSetting",
  props: {
    fieldName: String,
    name: String,
    dataType: String,
    hint: String,
    validationFunction: Array,
    errorMsg: String,
    offset: Number,
  },
  data() {
    return {
      error: false,
      errorMessage: "",
      modelProxy: "",
    };
  },
  computed: {
    model: {
      get: function () {
        //return this.getNestedField(this.fieldName, this.getData());
        return this.modelProxy;
      },
      set: function (newValue) {
        if (this.dataType === "number") {
          newValue = Number(newValue);
        }
        this.modelProxy = newValue;
        //console.log(`DropDownSetting setter. newValue: ${newValue}`);
      },
    },
  },
  methods: {
    getNestedField,
    // get the first store if stores exist for multiple store settings update, otherwise return clientData
    getData() {
      return [];
    },
    validate() {
      if (
        this.validationFunction &&
        this.validationFunction.some(
          (validationName) => !validation[validationName](this.modelProxy)
        )
      ) {
        this.error = true;
        this.errorMessage = this.errorMsg;
        return false;
      }
      this.model = this.modelProxy;
      this.error = false;
      this.errorMessage = "";
      return true;
    },
  },
};
</script>
