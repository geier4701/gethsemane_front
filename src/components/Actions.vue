<template>
  <div>
    <p v-for="(action, idx) in this.actions" :key="idx">
      <span v-if="action.actionType === 'AttemptRepairs'">
        Repair {{ action.selectedComponentName }}
      </span>
      <span v-if="action.actionType === 'FireImpulse'">
        <!-- TODO: Update with fire impulse when changed -->
      </span>
      <span v-if="action.actionType === 'FireWeapon'">
        Fire {{ action.selectedComponentName }}
      </span>
      <span v-if="action.actionType === 'Jump'">
        Jump {{ action.distace }} meters from the enemy
      </span>
      <span v-if="action.actionType === 'Delay'">
        Delay
      </span>
      <span v-if="action.actionType === 'Scan'">
        Scan enemy ship
      </span>
    </p>
  </div>
</template>
<script>
export default {
  name: "Actions",
  props: {
    actions: {}
  }
};
</script>
