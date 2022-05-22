<template>
   <div>
      <form @submit.prevent>
         <h4>Добавить новый пост</h4>
         <my-input
            placeholder="Название поста"
            v-model="post.title"
            type="text"
            v-focus
         ></my-input>
         <my-input
            placeholder="Описание поста"
            v-model="post.body"
            type="text"
         ></my-input>
         <my-button
            @click="createPosts"
         >
            Создать
         </my-button>
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
   },
   watch: {
      post: {
         handler(newVal) {
            //console.log(newVal)
         },
         deep: true
      }
   }
}
</script>

<style scoped>

</style>