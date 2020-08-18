import WPController from '@includes/wp-rest-controller/WPController'
import type {
	WPPostsGetParams,
	WPCommentsGetPromise,
	WPCommentsGetResponse,
} from '@includes/wp-rest-controller/typings/wp'
import type { AxiosResponse } from 'axios'

export default class WPComments extends WPController {
	get = async (params: WPPostsGetParams = null): WPCommentsGetPromise => {
		let res: AxiosResponse
		switch (typeof params) {
			case 'undefined':
				res = await this.request.get('/wp/v2/comments/')
				break
			case 'object':
				res = await this.request.get('/wp/v2/comments/', {
					params,
				})
				break
			case 'string':
			case 'number':
				res = await this.request.get('/wp/v2/comments/' + params)
				break
		}
		return res.data as WPCommentsGetResponse
	}
}
