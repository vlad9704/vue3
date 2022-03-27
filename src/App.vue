<template>
   <form @submit.prevent>
      <h4>Добавить новый пост</h4>
      <input
         type="text"
         placeholder="Название поста"
         v-bind:value="title"
         @input="title = $event.target.value"
      >
      <input
         type="text"
         placeholder="Описание поста"
         v-bind:value="body"
         @input="body = $event.target.value"
      >
      <input
         type="submit"
         value="Добавить пост"
         @click="createPost"
      >
      <br>
      <br>
      <hr>
   </form>
   <div>
      <div v-for="post in posts">
         <div><strong>Название: </strong>{{ post.title }}</div>
         <div><strong>Описание: </strong>{{ post.body }}</div>
         <hr>
      </div>
   </div>
</template>

<script>
export default {
   data() {
      return {
         posts: [
            {id: 1, title: 'Js 1', body: 'Description 1'},
            {id: 2, title: 'Js 2', body: 'Description 2'},
            {id: 3, title: 'Js 3', body: 'Description 3'},
         ],
         title: '',
         body: ''
      }
   },
   methods: {
      createPost() {
         const newPost = {
            id: Date.now(),
            title: this.title,
            body: this.body,
         }
         this.posts.push(newPost)
         this.title = ''
         this.body = ''
      }
   }
}
</script>

<style>

</style>