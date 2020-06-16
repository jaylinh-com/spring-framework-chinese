<template>
  <div class="switch-code">
    <div>
      <button :class="{'active': programming == 'java'}" @click="CHANGE_PROGRAMING('java')">Java</button>
      <button
        :class="{'active': programming == 'kotlin'}"
        @click="CHANGE_PROGRAMING('kotlin')"
      >Kotlin</button>
    </div>
    <slot name="java" v-if="programming === 'java'" />
    <slot name="kotlin" v-if="programming === 'kotlin'" />
    <Content slot-key="java" />
    <Content slot-key="kotlin" />
  </div>
</template>

<script>
import { mapState } from "vuex";
import { mapMutations } from "vuex";
export default {
  computed: mapState({
    programming: state => state.programming
  }),
  methods: {
    ...mapMutations(["CHANGE_PROGRAMING"])
  }
};
</script>

<style lang="scss" scoped>
.switch-code {
  margin-top: 20px;
  button {
    padding: 7px 12px;
    font-size: 15px;

    &.active {
      background: black;
      color: white;
    }
  }
}
</style>