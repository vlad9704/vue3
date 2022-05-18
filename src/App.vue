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
   <div class="page__wrapper">
      <div
         v-for="pageNum in totalPages"
         :key="pageNum"
         class="page"
         :class="{
            'current-page': page === pageNum
         }"
         @click="changePage(pageNum)"
      >
         {{ pageNum }}
      </div>
   </div>
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
         page: 1,
         limit: 10,
         totalPages: 0,
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
      changePage(pageNum) {
         this.page = pageNum
      },
      async fetchPosts() {
         try {
            this.isPostLoading = true
            const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
               params: {
                  _page: this.page,
                  _limit: this.limit
               }
            })
            this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit)
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
   },
   watch: {
      page() {
         this.fetchPosts()
      }
   }
}
</script>

<style>
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
</style>