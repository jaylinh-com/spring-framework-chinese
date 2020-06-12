<template>
  <div>
    <div>
    <button @click="handleClick('java')">java</button>
    <button @click="handleClick('kotlin')">kotlin</button>
    </div>
  <slot name="java" v-if="lang === 'java'"/>
  <slot name="kotlin" v-if="lang === 'kotlin'"/>
  <Content slot-key="java"/>
  <Content slot-key="kotlin"/>

  </div>
</template>

<script>
export default {
  data() {
    return {
      lang: 'java'
    }
  },
  methods: {
    handleClick(lang) {
      console.log(lang)
      this.lang = lang
    }
  }
}
</script>