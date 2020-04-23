<template>
  <div>
    <p v-for="(condition, idx) in addedConditions" :key="idx">
      Target: {{ condition.target }} Name: {{ condition.conditionType }}
      <span v-if="condition.conditionType != 'IsDisabled'">
        At Least: {{ condition.atLeast }} At Most: {{ condition.atMost }}
      </span>
      <span v-if="condition.conditionType === 'AmmunitionLevel'">
        Ammunition Type: {{ condition.ammunitionType }}
      </span>
      <span v-if="condition.conditionType === 'IsDisabled'">
        Component: {{ condition.component }}
      </span>
      <button @click="removeCondition(idx)">Delete</button>
    </p>
    Select the type of condition to add:
    <select v-model="selectedConditionType">
      <option value="AmmunitionLevel">
        Ammunition Level
      </option>
      <option value="Distance">
        Distance
      </option>
      <option value="EnergyLevel">
        Energy Level
      </option>
      <option value="Health">
        Health
      </option>
      <option value="IsDisabled">
        Is Disabled
      </option>
    </select>
    <div v-if="selectedConditionType != ''">
      <span
        v-if="
          selectedConditionType != 'Distance' &&
            selectedConditionType != 'AmmunitionLevel'
        "
      >
        Target:
        <select v-model="target">
          <option value="self">SELF</option>
          <option value="enemy">ENEMY</option>
        </select>
      </span>
      <p v-if="this.selectedConditionType === 'AmmunitionLevel'">
        Ammunition Type:
        <select v-model="ammunitionType">
          <option value="crystal">Crystal</option>
          <option value="missile">Missile</option>
          <option value="rail">Rail</option>
          <option value="electric">Electric</option>
        </select>
      </p>
      <p v-if="this.selectedConditionType === 'IsDisabled'">
        <select v-if="target === 'self'" v-model="selectedComponent">
          <option
            v-for="option in this.componentOptions"
            v-bind:key="option.key"
            v-bind:value="option.value"
          >
            {{ option.text }}
          </option>
        </select>
        <select v-if="target === 'enemy'" v-model="enemyComponent">
          <option value="Radar">Radar</option>
          <option value="Impulse Engine">Impulse Engine</option>
          <option value="Jump Drive">Jump Drive</option>
        </select>
      </p>
      <p v-if="this.selectedConditionType != 'IsDisabled'">
        <label for="atLeast">is at least </label>
        <input name="atLeast" v-model="atLeast" />
        <label for="atMost">and at most </label>
        <input name="atMost" v-model="atMost" />
      </p>
      <button @click="addCondition">Add</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "ConditionSelector",
  created() {
    this.selectedConditionType = "";
    this.target = "self";
    this.ammunitionType = {};
    this.atLeast = "";
    this.atMost = "";
    this.selectedComponent = {};
    this.enemyComponent = "";
  },
  props: {
    componentOptions: {}
  },
  data: function() {
    return {
      selectedConditionType: "",
      target: "self",
      ammunitionType: {},
      atLeast: {},
      atMost: {},
      selectedComponent: {},
      enemyComponent: {}
    };
  },
  computed: {
    addedConditions: function() {
      return this.$store.getters.conditions;
    }
  },
  methods: {
    addCondition() {
      let selectedComponentName = {};
      if (this.enemyComponent === "") {
        selectedComponentName = this.selectedComponent.name;
      } else {
        selectedComponentName = this.enemyComponent;
      }
      const builtCondition = {
        id: null,
        conditionType: this.selectedConditionType,
        target: this.target,
        atLeast: this.atLeast,
        atMost: this.atMost,
        ammunitionType: this.ammunitionType,
        component: selectedComponentName
      };
      this.$store.commit("setCondition", builtCondition);
      this.selectedConditionType = "";
      this.target = "self";
      this.ammunitionType = {};
      this.atLeast = "";
      this.atMost = "";
      this.selectedComponent = {};
      this.enemyComponent = "";
      this.$emit("validate-program");
    },
    removeCondition(idx) {
      this.$store.commit("removeCondition", idx);
      this.$emit("validate-program");
    }
  }
};
</script>
