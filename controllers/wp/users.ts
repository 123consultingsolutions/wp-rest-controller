import WPController from '@includes/wp-rest-controller/WPController'
import { AxiosResponse } from 'axios'
import {
	WPUserObject,
	WPPostsGetParams,
	WPUsersGetPromise,
	WPUsersGetResponse,
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
		if (user.id && user.name && user.avatar_urls) {
			this.set({ me: user })
		}
	}

	get = async (params: WPPostsGetParams = null): WPUsersGetPromise => {
		let res: AxiosResponse
		switch (typeof params) {
			case 'undefined':
				res = await this.request.get('/wp/v2/users/')
				break
			case 'object':
				res = await this.request.get('/wp/v2/users/', {
					params,
				})
				break
			case 'string':
			case 'number':
				res = await this.request.get('/wp/v2/users/' + params)
				break
		}
		return res.data as WPUsersGetResponse
	}
}
