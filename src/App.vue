<template>
   <post-form
      @create="createPost"
   />
   <post-list
      :posts="posts"
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
      }
   },
   methods: {
      createPost(post, second, third) {
         this.posts.push(post)
      }
   }
}
</script>

<style>

</style>