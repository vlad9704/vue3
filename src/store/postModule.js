import axios from "axios";

export const postModule = {
	// состояние - описываем данные которые будут в самом приложении
	state: () => ({
		posts: [],
		isPostsLoading: false,
		selectedSort: '',
		searchQuery: '',
		page: 1,
		limit: 10,
		totalPages: 0,
		sortOptions: [
			{value: 'title', name: 'По названию'},
			{value: 'body', name: 'По содержимому'},
		]
	}),
	// computed св-ва - кэшируемые вычисляемые значения
	getters: {
		sortedPosts(state) {
			return [...state.posts].sort((post1, post2) => post1[state.selectedSort]?.localeCompare(post2[state.selectedSort]))
		},
		sortedAndSearchedPosts(state, getters) {
			return getters.sortedPosts.filter(post => post.title.toLowerCase().includes(state.searchQuery.toLowerCase()))
		}
	},
	// функции, внутри которых мы меняем значения какого-то поля в состоянии
	// предназначены для изменения состояния
	mutations: {
		setPosts(state, posts) {
			state.posts = posts;
		},
		setLoading(state, bool) {
			state.isPostsLoading = bool
		},
		setPage(state, page) {
			state.page = page
		},
		setSelectedSort(state, selectedSort) {
			state.selectedSort = selectedSort
		},
		setTotalPages(state, totalPages) {
			state.totalPages = totalPages
		},
		setSearchQuery(state, searchQuery) {
			state.searchQuery = searchQuery
		},
	},
	// функции, которые внутри себя используют мутации
	actions: {
		async fetchPosts({state, commit}) {
			try {
				commit('setLoading', true)
				const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
					params: {
						_page: state.page,
						_limit: state.limit
					}
				})
				commit('setTotalPages', Math.ceil(response.headers['x-total-count'] / state.limit))
				commit('setPosts', response.data)
			} catch (e) {
				console.log(e)
			} finally {
				commit('setLoading', false)
			}
		},
		async loadMorePosts({state, commit}) {
			try {
				commit('setPage', state.page + 1)
				const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
					params: {
						_page: state.page,
						_limit: state.limit
					}
				});
				commit('setTotalPages', Math.ceil(response.headers['x-total-count'] / state.limit))
				commit('setPosts', [...state.posts, ...response.data]);
			} catch (e) {
				console.log(e)
			}
		}
	},
	namespaced: true
}