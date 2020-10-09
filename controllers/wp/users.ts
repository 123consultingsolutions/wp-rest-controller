import WPController from '@includes/wp-rest-controller/WPController'
import type { AxiosResponse } from 'axios'
import type {
	WPUserObject,
	WPPostsGetParams,
	WPUsersGetPromise,
} from '@includes/wp-rest-controller/typings/wp'

export default class WPUsers extends WPController {
	me = async () => {
		let res: AxiosResponse
		try {
			res = await this.request.get('/wp/v2/users/me')
		} catch (error) {
			console.error(error)
			throw error
		}
		let user: WPUserObject = res.data
		if (user.ID && user.username && user.user_email) {
			this.set({ me: user })
		} else {
			console.log(user)
		}
	}

	get = async (params: WPPostsGetParams = null): WPUsersGetPromise => {
		let res: AxiosResponse
		switch (typeof params) {
			case 'undefined':
				res = await this.request.get('/wp/v2/users/')
				return res.data as WPUserObject
			case 'object':
				res = await this.request.get('/wp/v2/users/', {
					params,
				})
				return res.data as WPUserObject[]
			case 'string':
			case 'number':
				res = await this.request.get('/wp/v2/users/' + params)
				return res.data as WPUserObject
		}
	}
}
