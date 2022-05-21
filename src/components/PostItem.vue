<template>
   <div>
      <div>{{ post.id }}</div>
      <div><strong>Название: </strong>{{ post.title }}</div>
      <div><strong>Описание: </strong>{{ post.body }}</div>
      <hr>
      <my-button
         @click="$emit('remove', post)"
      >
         Удалить
      </my-button>
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