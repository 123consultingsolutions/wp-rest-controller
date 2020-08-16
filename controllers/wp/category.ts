import WPController from '@includes/wp-rest-controller/WPController'
import {
	WPPostsGetParams,
	WPCategoryGetPromise,
	WPCategoryObject,
	WPCategoryGetResponse,
} from '@includes/wp-rest-controller/typings/wp'
import { AxiosResponse } from 'axios'

export default class WPCategory extends WPController {
	get = async (params: WPPostsGetParams = null): WPCategoryGetPromise => {
		let res: AxiosResponse
		switch (typeof params) {
			case 'undefined':
				res = await this.request.get('/wp/v2/categories/')
				break
			case 'object':
				res = await this.request.get('/wp/v2/categories/', {
					params,
				})
				break
			case 'string':
			case 'number':
				res = await this.request.get('/wp/v2/categories/' + params)
				return res.data as WPCategoryObject
		}
		return res.data as WPCategoryGetResponse
	}
}
