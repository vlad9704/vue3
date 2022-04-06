<template>
   <button class="btn">
      <slot></slot>
   </button>
</template>

<script>
export default {
   name: "MyButton"
}
</script>

<style scoped>
   .btn {
      margin-left: 10px;
      text-transform: uppercase;
      font-size: 12px;
      padding: 5px 15px;
      border-radius: 10px;
      border: 1px solid lightcoral;
      background-color: lightblue;
   }
</style>