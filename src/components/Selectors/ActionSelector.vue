<template>
  <div>
    <p v-for="(action, idx) in addedActions" :key="idx">
      Name: {{ action.actionType }}
      <span v-if="action.actionType === 'FireWeapon'">
        Weapon: {{ action.selectedComponentName }}
      </span>
      <span v-if="action.actionType === 'AttemptRepairs'">
        Component to repair: {{ action.selectedComponentName }}
      </span>
      <span v-if="action.actionType === 'Distance'">
        Distance from enemy: {{ action.distance }}
      </span>
      <span v-if="action.actionType === 'FireImpulse'">
        <!-- TODO: Update once fire impulse is refactored -->
      </span>
      <button @click="removeAction(idx)">Delete</button>
    </p>
    Select the type of action to add:
    <select v-model="selectedActionType">
      <option value="AttemptRepairs">Attempt Repairs</option>
      <option value="Delay">Delay</option>
      <option value="FireImpulse">Fire Impulse</option>
      <option value="FireWeapon">Fire Weapon</option>
      <option value="Jump">Jump</option>
      <option value="Scan">Scan</option>
    </select>
    <div v-if="selectedActionType === 'AttemptRepairs'">
      <select v-model="selectedComponent">
        <option
          v-for="option in this.componentOptions"
          v-bind:key="option.key"
          v-bind:value="option.value"
        >
          {{ option.text }}
        </option>
      </select>
    </div>
    <div v-if="selectedActionType != ''">
      <div v-if="selectedActionType === 'FireImpulse'">
        <!-- TODO: Update this once fire impulse is more usable on back end -->
      </div>
      <div v-if="selectedActionType === 'FireWeapon'">
        <select v-model="selectedComponent">
          <option
            v-for="option in this.weaponOptions"
            v-bind:key="option.key"
            v-bind:value="option.value"
          >
            {{ option.text }}
          </option>
        </select>
      </div>
      <div v-if="selectedActionType === 'Jump'">
        <label for="distance">Distance from the enemy: </label>
        <input name="distance" v-model="distance" />
      </div>
      <div
        v-if="selectedActionType === 'Delay' || selectedActionType === 'Scan'"
      ></div>
      <div v-if="selectedActionType != ''">
        <button @click="addAction">Add</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ActionSelector",
  props: {
    componentOptions: {},
    weaponOptions: {}
  },
  data: function() {
    return {
      selectedActionType: "",
      selectedComponent: {},
      distance: "",
      actionIndex: 0
    };
  },
  computed: {
    addedActions: function() {
      return this.$store.getters.actions;
    }
  },
  methods: {
    addAction() {
      const builtAction = {
        id: null,
        actionType: this.selectedActionType,
        selectedComponentName: this.selectedComponent.name,
        distance: this.distance
      };
      this.$store.commit("setAction", builtAction);
      this.actionIndex++;
      this.selectedActionType = "";
      this.selectedComponent = {};
      this.distance = "";
      this.$emit("validate-program");
    },
    removeAction(idx) {
      this.$store.commit("removeAction", idx);
      this.$emit("validate-program");
    }
  }
};
</script>
