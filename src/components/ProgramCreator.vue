<template>
  <div>
    <div>
      <!-- <p v-for="(subroutine, idx) in currentSubroutines" :key="idx">
                <Conditions :conditions="subroutine.conditions" />
                <Actions :actions="subroutine.actions" />
            </p> -->
    </div>
    <div>
      <label for="priority">Priority: </label>
      <input name="priority" v-model="priority" />
      <ConditionSelector @validate-program="validateProgram" />
      <!-- <ActionSelector /> -->
      <!-- <button v-on:click="addSubroutine">Add</button> -->
    </div>
  </div>
</template>

<script>
import ConditionSelector from "./Selectors/ConditionSelector";

export default {
  name: "SubroutineCreator",
  components: { ConditionSelector },
  props: {
    subroutineList: {}
  },
  data: function() {
    return {
      currentSubroutines: {},
      priority: ""
    };
  },
  methds: {
    // TODO: Validate program isn't too large for chosen cpu
    validateProgram() {
      console.log("validated!");
    }
  }
};
</script>
