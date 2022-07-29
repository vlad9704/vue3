<template>
   <div class="navbar">
      <a href="javascript:void(0)" @click="$router.push('/')">Vue 3</a>
      <div class="navbar_btns">
         <my-button @click="$router.push('/posts')">Посты</my-button>
         <my-button @click="$router.push('/store')">Vuex</my-button>
         <my-button @click="$router.push('/composition')">Composition</my-button>
         <my-button @click="$router.push('/about')">О нас</my-button>
         <my-button @click="$router.push('/task')">Практические задания</my-button>
      </div>
   </div>
</template>

<script>
export default {
}
</script>

<style scoped>
   a {
      color: #fff;
      text-transform: uppercase;
   }
   .navbar {
      height: 50px;
      background-color: teal;
      box-shadow: 2px 2px 4px gray;
      display: flex;
      align-items: center;
      padding: 0 20px;
      justify-content: space-between;
   }
</style>