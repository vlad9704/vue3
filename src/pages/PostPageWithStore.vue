<template>
   <button
      class="click_me__btn"
      :class="{active: noActivated}"
      @click="noActivated = true"
   >
      CLICK ME
   </button>

   <h1>Страница с постами</h1> <br>
   <my-input
      :model-value="searchQuery"
      @update:model-value="setSearchQuery"
      v-focus
      placeholder="Поиск..."
   /> <br><br>
   <div>
      <my-select
         :model-value="selectedSort"
         @update:movel-value="setSelectedSort"
         :options="sortOptions"
      />
   </div> <br>
   <my-button
      @click="showDialog"
   >
      Создать пост
   </my-button> <br><br>
   <my-dialog v-model:show="dialogVisible">
      <post-form
         @create="createPost"
      />
   </my-dialog>
   <post-list
      :posts="sortedAndSearchedPosts"
      v-if="!isPostsLoading"
      @remove="removePost"
   />
   <div v-else>Идет загрука...</div>
   <div v-intersection="loadMorePosts" class="observer"></div>
</template>

<script>
import PostForm from "@/components/PostForm";
import PostList from "@/components/PostList";
import axios from 'axios'
import MySelect from "@/components/UI/MySelect";
import {mapState, mapActions, mapGetters, mapMutations} from 'vuex'

export default {
   components: {
      MySelect,
      PostList,
      PostForm
   },
   data() {
      return {
         dialogVisible: false,
      }
   },
   methods: {
      ...mapMutations({
         setPage: 'post/setPage',
         setSearchQuery: 'post/setSearchQuery',
         setSelectedSort: 'post/setSelectedSort'
      }),
      ...mapActions({
         loadMorePosts: 'post/loadMorePosts',
         fetchPosts: 'post/fetchPosts'
      }),
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
   },
   mounted() {
      this.fetchPosts()
   },
   computed: {
      ...mapState({
         posts: state => state.post.posts,
         isPostsLoading: state => state.post.isPostsLoading,
         selectedSort: state => state.post.selectedSort,
         searchQuery: state => state.post.searchQuery,
         page: state => state.post.page,
         limit: state => state.post.limit,
         totalPages: state => state.post.totalPages,
         sortOptions: state => state.post.sortOptions
      }),
      ...mapGetters({
         sortedPosts: 'post/sortedPosts',
         sortedAndSearchedPosts: 'post/sortedAndSearchedPosts'
      })
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