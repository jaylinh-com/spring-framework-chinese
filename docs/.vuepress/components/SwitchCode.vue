<template>
  <div>
    <div>
    <button @click="handleClick('java')">java</button>
    <button @click="handleClick('kotlin')">kotlin</button>
    </div>
  <slot name="java" v-if="$store.state.programming === 'java'"/>
  <slot name="kotlin" v-if="$store.state.programming === 'kotlin'"/>
  <Content slot-key="java"/>
  <Content slot-key="kotlin"/>

  </div>
</template>

<script>
export default {
  mounted() {
      console.log(this)
  },
  methods: {
    handleClick(lang) {
      this.$store.commit("programming",lang)
    }
  }
}
</script>