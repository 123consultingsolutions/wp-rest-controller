import WPController from '@includes/wp-rest-controller/WPController'
import {
	WPPostsGetParams,
	WPTagsGetPromise,
	WPTagObject,
} from '@includes/wp-rest-controller/typings/wp'
import { AxiosResponse } from 'axios'

export default class WPTags extends WPController {
	get = async (params: WPPostsGetParams = null): WPTagsGetPromise => {
		let res: AxiosResponse
		switch (typeof params) {
			case 'undefined':
				res = await this.request.get('/wp/v2/tags/')
				return res.data as WPTagObject[]
			case 'object':
				res = await this.request.get('/wp/v2/tags/', { params })
				return res.data as WPTagObject[]
			case 'string':
			case 'number':
				res = await this.request.get('/wp/v2/tags/' + params)
				return res.data as WPTagObject
		}
	}
}
