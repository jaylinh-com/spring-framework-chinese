<template>
  <div class="tag-wraper">
    <div class="tag">{{text}}</div>
    <div class="tag-content">
      <slot name="tag" />
    </div>
  </div>
</template>
<script>
export default {
  props: {
    text: {
      type: String,
      default: ""
    }
  }
};
</script>

<style lang="scss" scoped>
.tag-wraper {
  display: flex;
  align-items: center;
  height: 30px;
}
.tag {
  padding: 3px 8px;
  margin-right: 5px;
  height: 16px;
  border-radius: 50%;
  background: orange;
  color: black;
  font-size: 12px;
}
</style>
