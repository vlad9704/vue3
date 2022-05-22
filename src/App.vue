<template>
   <div class="app">
      <my-navbar></my-navbar>
      <div class="body">
         <router-view></router-view>
      </div>
   </div>
</template>

<script>
import MyNavbar from "@/components/UI/MyNavbar";
export default {
   components: {MyNavbar}
}
</script>

<style>
   * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
   }
   a {
      text-decoration: none;
   }
   .body {
      padding: 20px 20px 0 20px;
   }
</style>