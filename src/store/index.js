import {createStore} from "vuex";
import {postModule} from "@/store/postModule";

export default createStore({
	state: {
		isAuth: false,
	},
	// изолированный кусочек состояния
	modules: {
		post: postModule
	}
})