<template>
   <div>
      <div><strong>Название: </strong>{{ post.title }}</div>
      <div><strong>Описание: </strong>{{ post.body }}</div>
      <hr>
   </div>
   <div>
      <input type="button" value="Delete">
   </div>
</template>

<script>
export default {
   name: "PostItem",
   props: {
      post: {
         type: Object,
         required: true
      }
   }
}
</script>

<style scoped>

</style>