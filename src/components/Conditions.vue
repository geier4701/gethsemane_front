<template>
  <div>
    <div v-for="(condition, idx) in this.conditions" :key="idx">
      <p v-if="condition.conditionType === 'AmmunitionLevel'">
        If ship has at least {{ condition.atLeast }} and less than
        {{ condition.atMost }} rounds of {{ condition.ammunitionType }} left and
      </p>
      <p v-if="condition.conditionType === 'Distance'">
        If enemy is at least {{ condition.atLeast }} meters and less than
        {{ condition.atMost }} meters and
      </p>
      <p v-if="condition.conditionType === 'EnergyLevel'">
        If {{ condition.target }} energy level is at least
        {{ condition.atLeast }} and less than {{ condition.atMost }} and
      </p>
      <p v-if="condition.conditionType === 'Health'">
        If {{ condition.target }} {{ condition.health }} is at least
        {{ condition.atLeast }} and less than {{ condition.atMost }} and
      </p>
      <p v-if="condition.conditionType === 'IsDisabled'">
        <span v-if="condition.target === 'self'">
          If own {{ condition.component }} is disabled and
        </span>
        <span v-if="condition.target === 'enemy'">
          If enemy's {{ condition.component }} is disabled and
        </span>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Conditions",
  props: {
    conditions: {}
  }
};
</script>
