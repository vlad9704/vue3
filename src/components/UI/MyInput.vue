<template>
   <input
      type="text"
      class="input"
      :value="modelValue"
      @input="updateInput"
   >
</template>

<script>
export default {
   name: "MyInput",
   props: {
      modelValue: [String, Number]
   },
   methods: {
      updateInput(event) {
         this.$emit('update:modelValue', event.target.value)
      }
   }
}
</script>

<style scoped>
   .input {
      padding: 5px 15px;
      border-radius: 10px;
      border: 1px solid red;
   }
</style>