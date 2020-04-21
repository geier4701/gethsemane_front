<template>
  <div>
    <p v-for="(condition, idx) in addedConditions" :key="idx">
      Target: {{ condition.target }}
      <span v-if="condition.conditionType != 'IsDisabled'">
        At Least: {{ condition.atLeast }} At Most: {{ condition.atMost }}
      </span>
      <span v-if="condition.conditionType === 'AmmunitionLevel'">
        Ammunition Type: {{ condition.ammunitionType }}
      </span>
      <span
        v-if="
          condition.conditionType === 'IsDisabled' &&
            condition.target === 'self'
        "
      >
        Component: {{ condition.component.name }}
      </span>
      <span
        v-if="
          condition.conditionType === 'IsDisabled' &&
            condition.target === 'enemy'
        "
      >
        Component: {{ condition.enemyComponent }}
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
      Target:
      <select v-model="target">
        <option value="self">SELF</option>
        <option value="enemy">ENEMY</option>
      </select>
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
            v-for="option in componentOptions"
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
      <button v-on:click="addCondition">Add</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "ConditionSelector",
  created() {
    (this.selectedConditionType = ""),
      (this.target = "self"),
      (this.ammunitionType = {}),
      (this.atLeast = ""),
      (this.atMost = ""),
      (this.selectedComponent = {}),
      (this.enemyComponent = ""),
      (this.addedConditions = []);
  },
  data: function() {
    return {
      selectedConditionType: "",
      target: "self",
      ammunitionType: {},
      atLeast: {},
      atMost: {},
      selectedComponent: {},
      enemyComponent: {},
      componentOptions: this.formatComponents(this.getRepairableComponents()),
      conditionIndex: 0,
      addedConditions: this.$store.getters.conditions
    };
  },
  methods: {
    getRepairableComponents() {
      const ship = this.$store.getters.ship;
      const listedRepairableComponents = {};
      listedRepairableComponents[ship.radar.name] = ship.radar;
      listedRepairableComponents[ship.impulseEngine.name] = ship.impulseEngine;
      listedRepairableComponents[ship.jumpDrive.name] = ship.jumpDrive;
      for (const weapon of ship.weapons) {
        listedRepairableComponents[weapon.name] = weapon;
      }
      return listedRepairableComponents;
    },
    formatComponents(components) {
      const formattedComponents = {};
      for (const componentName in components) {
        const component = components[componentName];
        formattedComponents[component.name] = {
          text: component.name,
          key: component.name,
          value: component
        };
      }
      return formattedComponents;
    },
    addCondition() {
      const builtCondition = {
        conditionType: this.selectedConditionType,
        target: this.target,
        atLeast: this.atLeast,
        atMost: this.atMost,
        ammunitionType: this.ammunitionType,
        component: this.selectedComponent,
        enemyComponent: this.enemyComponent
      };
      this.$set(this.addedConditions, this.conditionIndex, builtCondition);
      this.conditionIndex++;
      this.$store.commit("setCondition", builtCondition);
      this.selectedConditionType = "";
      (this.target = "self"), (this.ammunitionType = {});
      this.atLeast = "";
      this.atMost = "";
      this.selectedComponent = {};
      this.enemyComponent = "";
      this.$emit("validate-program");
    },
    removeCondition(idx) {
      this.$delete(this.addedConditions, idx);
      this.$store.commit("removeCondition", idx);
      this.$emit("validate-program");
    }
  }
};
</script>
