import WPController from '@includes/wp-rest-controller/WPController'
import {
	WPPostsGetParams,
	WPMediaGetPromise,
	WPMediaObject,
	WPMediaGetResponse,
} from '@includes/wp-rest-controller/typings/wp'
import { AxiosResponse } from 'axios'

export default class WPMedia extends WPController {
	get = async (params: WPPostsGetParams = null): WPMediaGetPromise => {
		let res: AxiosResponse
		switch (typeof params) {
			case 'undefined':
				res = await this.request.get('/wp/v2/media/')
				break
			case 'object':
				res = await this.request.get('/wp/v2/media/', {
					params,
				})
				break
			case 'string':
			case 'number':
				if (params === 0) return false
				res = await this.request.get('/wp/v2/media/' + params)
				return res.data as WPMediaObject
		}
		return res.data as WPMediaGetResponse
	}
}
