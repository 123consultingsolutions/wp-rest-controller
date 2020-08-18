import WPController from '@includes/wp-rest-controller/WPController'
import type {
	WPPostsGetParams,
	WPTagsGetPromise,
	WPTagObject,
} from '@includes/wp-rest-controller/typings/wp'
import type { AxiosResponse } from 'axios'

export default class WPPages extends WPController {
	get = async (params: WPPostsGetParams = null): WPTagsGetPromise => {
		let res: AxiosResponse
		switch (typeof params) {
			case 'undefined':
				res = await this.request.get('/wp/v2/pages/')
				return res.data as WPTagObject[]
			case 'object':
				res = await this.request.get('/wp/v2/pages/', { params })
				return res.data as WPTagObject[]
			case 'string':
			case 'number':
				res = await this.request.get('/wp/v2/pages/' + params)
				return res.data as WPTagObject
		}
	}
}
