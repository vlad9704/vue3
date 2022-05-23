import axios from "axios";

export default {
	props: {
		show: {
			type: Boolean,
			default: false
		}
	},
	methods: {
		hideDialog() {
			this.$emit('update:show', false)
		}
	}
}