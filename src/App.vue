<template>

   <button
      class="click_me__btn"
      :class="{active: noActivated}"
      @click="noActivated = true"
   >
      CLICK ME
   </button>

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
      v-if="!isPostLoading"
      @remove="removePost"
   />
   <div v-else>Идет загрука...</div>
   <div ref="observer" class="observer"></div>
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
         noActivated: false,
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
      },
      async loadMorePosts() {
         try {
            this.page += 1
            const response = await axios.get('https://jsonplaceholder.typicode.com/posts',{
               params: {
                  _page: this.page,
                  _limit: this.limit
               }
            })
            this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit)
            this.posts = [...this.posts, ...response.data]
         } catch (e) {
            alert('error')
         }
      }
   },
   mounted() {
      this.fetchPosts()
      const options = {
         rootMargin: '0px',
         threshold: 1.0
      }
      const callback = (entries, observer) => {
         if(entries[0].isIntersecting) {
            this.loadMorePosts()
         }
      }
      const observer = new IntersectionObserver(callback, options)
      observer.observe(this.$refs.observer)
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