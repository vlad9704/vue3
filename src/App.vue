<template>
   <h1>Страница с постами</h1>
   <my-button
      @click="showDialog"
   >
      Создать пост
   </my-button>
   <my-dialog v-model:show="dialogVisible">
      <post-form
         @create="createPost"
      />
   </my-dialog>
   <post-list
      :posts="posts"
      @remove="removePost"
   />
</template>

<script>
import PostForm from "@/components/PostForm";
import PostList from "@/components/PostList";

export default {
   components: {
      PostList, PostForm
   },
   data() {
      return {
         posts: [
            {id: 1, title: 'Js 1', body: 'Description 1'},
            {id: 2, title: 'Js 2', body: 'Description 2'},
            {id: 3, title: 'Js 3', body: 'Description 3'},
         ],
         dialogVisible: false,
      }
   },
   methods: {
      createPost(post, second, third) {
         this.posts.push(post)
         this.dialogVisible = false
      },
      removePost(post) {
         this.posts = this.posts.filter( p => p.id !== post.id )
      },
      showDialog() {
         this.dialogVisible = true
      }
   }
}
</script>

<style>

</style>