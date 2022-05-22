import Main from "@/pages/Main";
import {createRouter, createWebHistory} from "vue-router";
import PostPage from "@/pages/PostPage";
import PostDetail from "@/components/PostDetail";
import About from "@/pages/About";

const routes = [
	{
		path: '/',
		component: Main,
	},
	{
		path: '/posts',
		component: PostPage
	},
	{
		path: '/posts/:id',
		component: PostDetail
	},
	{
		path: '/about',
		component: About
	}
]

const router = createRouter({
	routes,
	history: createWebHistory(process.env.BASE_URL)
})

export default router;