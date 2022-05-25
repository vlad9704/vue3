<template>
   <h1>{{likes}}</h1>
   <button @click="addLike">Лайк</button>
   <h1>Страница с постами</h1>
   <br>
   <my-input
      v-model="searchQuery"
      v-focus
      placeholder="Поиск..."
   />
   <br>
   <div>
      <my-select
         v-model="selectedSort"
         :options="sortOptions"
      />
   </div>
   <post-list
      :posts="sortedAndSearchedPosts"
      v-if="!isPostLoading"
   />
   <div v-else>Идет загрука...</div>
</template>

<script>
import PostForm from "@/components/PostForm";
import PostList from "@/components/PostList";
import axios from 'axios'
import MySelect from "@/components/UI/MySelect";
import {ref} from "vue";
import {usePosts} from "@/hooks/usePosts";
import useSortedPosts from "@/hooks/useSortedPosts";
import useSortedAndSearchedPosts from "@/hooks/useSortedAndSearchedPosts";

export default {
   components: {
      MySelect,
      PostList,
      PostForm
   },
   data() {
      return {
         dialogVisible: false,
         sortOptions: [
            {value: 'title', name: 'По названию'},
            {value: 'body', name: 'По содержимому'},
         ]
      }
   },
   setup(props) {
      const likes = ref(0)

      const addLike = () => {
         likes.value += 1
      }
      
      const {posts, isPostLoading, totalPages} = usePosts(10)
      const {sortedPosts, selectedSort} = useSortedPosts(posts)
      const {searchQuery, sortedAndSearchedPosts} = useSortedAndSearchedPosts(sortedPosts)

      return {
         likes,
         addLike,
         posts,
         isPostLoading,
         totalPages,
         sortedPosts,
         selectedSort,
         searchQuery,
         sortedAndSearchedPosts,
      }
   }
}
</script>

<style>
.click_me__btn {
   border-radius: 20px;
   padding: 10px 20px;
   border: 3px solid darkseagreen;
   background-color: violet;
   color: #fff;
}
.click_me__btn.active {
   border-color: indianred;
}
.page__wrapper {
   display: flex;
   margin-top: 15px;
}
.page {
   border: 1px solid black;
   padding: 10px;
}
.current-page {
   border: 2px solid teal
}
.observer {
   height: 30px;
   background-color: lightskyblue;
}
</style>