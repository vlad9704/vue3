<template>
   <h1>Страница с постами</h1>
   <input type="text" v-model.lazy.trim.number="modificatorValue">
   <my-input
      v-model="searchQuery"
      placeholder="Поиск..."
   />
   <div>
      <my-select
         v-model="selectedSort"
         :options="sortOptions"
      />
   </div>
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
      :posts="sortedAndSearchedPosts"
      @remove="removePost"
      v-if="!isPostLoading"
   />
   <div v-else>Идет загрука...</div>
</template>

<script>
import PostForm from "@/components/PostForm";
import PostList from "@/components/PostList";
import axios from 'axios'
import MySelect from "@/components/UI/MySelect";

export default {
   components: {
      MySelect,
      PostList,
      PostForm
   },
   data() {
      return {
         posts: [],
         dialogVisible: false,
         modificatorValue: '',
         isPostLoading: false,
         selectedSort: '',
         searchQuery: '',
         sortOptions: [
            {value: 'title', name: 'По названию'},
            {value: 'body', name: 'По содержимому'},
         ]
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
      },
      async fetchPosts() {
         try {
            this.isPostLoading = true
            const response = await axios.get('https://jsonplaceholder.typicode.com/posts?_limit=10')
            this.posts = response.data
         } catch (e) {
            alert('error')
         } finally {
            this.isPostLoading = false
         }
      }
   },
   mounted() {
      this.fetchPosts()
   },
   computed: {
      sortedPosts() {
         return [...this.posts].sort( (post1, post2) => {
            post1[this.selectedSort]?.localeCompare(post2[this.selectedSort])
         })
      },
      sortedAndSearchedPosts() {
         return this.sortedPosts.filter(post => post.title.toLowerCase().includes(this.searchQuery.toLowerCase()))
      }
   }
}
</script>

<style>

</style>