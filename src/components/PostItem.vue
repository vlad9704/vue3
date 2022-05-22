<template>
   <div class="post">
      <div>ID: {{ post.id }}</div>
      <div><strong>Название: </strong>{{ post.title }}</div>
      <div><strong>Описание: </strong>{{ post.body }}</div>
      <br>
      <my-button
         @click="$router.push(`/posts/${post.id}`)"
      >
         Открыть
      </my-button>
      <my-button
         @click="$emit('remove', post)"
      >
         Удалить
      </my-button>
      <br>
      <br>
      <hr>
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
   .post {
      margin-top: 20px;
   }
</style>