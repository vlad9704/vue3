<template>
   <div v-if="posts.length > 0">
      <h3>Список постов</h3>
      <transition-group name="post-list">
         <post-item
            v-for="post in posts"
            :post="post"
            :key="post.id"
            @remove="$emit('remove', post)"
         />
      </transition-group>
   </div>
   <h2 v-show="posts.length === 0" style="color: red">Нет постов</h2>
</template>

<script>
import PostItem from "@/components/PostItem";
export default {
   name: "PostList",
   components: {PostItem},
   props: {
      posts: {
         type: Array,
         required: true
      }
   }
}
</script>

<style>
.post-list-list {
   display: inline-block;
   margin-right: 10px;
}
.post-list-enter-active,
.post-list-leave-active {
   transition: all 1s ease;
}
.post-list-enter-from,
.post-list-leave-to {
   opacity: 0;
   transform: translateY(30px);
}
</style>