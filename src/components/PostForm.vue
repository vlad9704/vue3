<template>
   <div>
      <form @submit.prevent>
         <h4>Добавить новый пост</h4>
         <input
            type="text"
            placeholder="Название поста"
            v-model="post.title"
         >
         <input
            type="text"
            placeholder="Описание поста"
            v-model="post.body"
         >
         <input
            type="submit"
            value="Добавить пост"
            @click="createPosts"
         >
         <br>
         <br>
         <hr>
      </form>
   </div>
</template>

<script>
export default {
   data() {
      return {
         post: {
            title: '',
            body: ''
         }
      }
   },
   methods: {
      createPosts() {
         this.post.id = Date.now()
         this.$emit('create', this.post, 'arg1', 'arg2')
         this.post = {
            title: '',
            body: ''
         }
      }
   }
}
</script>

<style scoped>

</style>