<template>
  <q-item tag="label" v-ripple>
    <q-select
      borderless
      stack-label
      emit-value
      map-options
      multiple
      class="full-width"
      v-model="model"
      :options="options"
      :label="name"
    >
      <template v-slot:after>
        <q-btn
          data-test="btnMultipleDropDownSetting"
          round
          dense
          flat
          color="primary"
          icon="done"
          @click="multiSelectionCompletes"
          :disable="submitButtonDisable"
        />
      </template>
    </q-select>
  </q-item>
</template>

<script>
import { getNestedField } from "./getNestedField";
export default {
  name: "MultipleDropDownSetting",
  props: {
    name: String,
    fieldName: String,
    internalOptions: Array,
    optionPrefix: String,
    optionCountField: String,
    externalOptionsMap: Object,
  },
  data() {
    return {
      dropDownSettingModel: [],
    };
  },
  computed: {
    options: {
      get: function () {
        if (this.optionCountField && this.optionPrefix) {
          // if options are dynamically based on another field
          let arr = [];
          let count = 0;
          const fieldValue = this.getNestedField(this.optionCountField, null);
          while (count < fieldValue) {
            arr.push({
              label: `${this.optionPrefix}${count + 1}`,
              value: `${this.optionPrefix}${count + 1}`,
            });
            count++;
          }
          return arr;
        }
        // if options care retrieved from DB
        if (!this.internalOptions) {
          //const fieldOptions = this.externalOptionsMap[this.fieldName];
          if (!fieldOptions) {
            this.$q.notify({
              message: `Unable retrieve options for ${this.name}`,
              color: "red",
              position: "bottom-right",
            });
          }
          return fieldOptions ?? [];
        }
        // if options are static
        return this.internalOptions;
      },
    },
    model: {
      get: function () {
        /*console.log(
          `MultipleDropDownSetting getter model: ${JSON.stringify(
            this.dropDownSettingModel
          )}`
        );*/
        //return this.getNestedField(this.fieldName, null);
        return this.dropDownSettingModel;
      },
      set: function (newModel) {
        this.dropDownSettingModel = newModel;
        //console.log(`MultipleDropDownSetting setter model: ${JSON.stringify(this.dropDownSettingModel)}`);
      },
    },
    submitButtonDisable: {
      get() {
        return (
          this.dropDownSettingModel === undefined ||
          !this.dropDownSettingModel.length
        );
      },
    },
  },
  methods: {
    getNestedField,
    async multiSelectionCompletes() {
      console.log(
        `Multiple Dropdown Setting multiSelectionCompletes(): ${this.dropDownSettingModel}`
      );
    },
  },
};
</script>
