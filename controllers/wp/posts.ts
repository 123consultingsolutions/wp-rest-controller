import WPController from '../../WPController'
import {
	WPPostObject,
	WPUserObject,
	WPMediaObject,
	WPCategoryObject,
	WPTagObject,
	WPPostsGetParams,
	WPPostsGetPromise,
	WPPostsGetResponse,
} from '@includes/wp-rest-controller/typings/wp'
import { WPV2 } from './wpv2'
import { AxiosResponse } from 'axios'

export default class WPPosts extends WPController {
	getFull = async (
		post: WPPostObject,
		updateState: boolean = true
	): Promise<WPPostObject> => {
		const {
			users,
			media,
			categories,
			tags,
			comments,
			state,
		}: WPV2 = this.route.wp.v2

		post.author = (await users.get(post.author)) as WPUserObject

		post.featured_media = (await media.get(post.featured_media)) as
			| WPMediaObject
			| boolean

		post.categories.forEach(async (cat, i) => {
			post.categories[i] = (await categories.get(
				cat as number
			)) as WPCategoryObject
		})

		post.tags.forEach(async (tag, i) => {
			post.tags[i] = (await tags.get(tag)) as WPTagObject
		})

		post.comments = await comments.get({ post: post.id })

		if (post.likes === false) post.likes = []

		if (updateState) {
			state.posts[post.id] = post
			this.set(state)
		}
		return post
	}

	get = async (
		params: WPPostsGetParams = null,
		full = false
	): WPPostsGetPromise => {
		let res: AxiosResponse
		switch (typeof params) {
			case 'undefined':
				res = await this.request.get('/wp/v2/posts/')
				break
			case 'object':
				res = await this.request.get('/wp/v2/posts/', { params })
				break
			case 'string':
			case 'number':
				res = await this.request.get('/wp/v2/posts/' + params)
				break
		}
		/**
		 ** if full then fetch all sub data not regularly returned
		 *  TODO: make this more... proper. Using the other classes instead of functions
		 */
		let data: WPPostsGetResponse = res.data
		let state = { posts: {} }
		if (!state.posts) state.posts = {}

		if (full) {
			if (Array.isArray(data)) {
				let records: WPPostsGetResponse = Object.values(data)

				for (var i = 0; i < records.length; i++) {
					await this.getFull(records[i])
				}
			} else {
				data = await this.getFull(data, false)
			}
		} else {
			if (Array.isArray(data)) {
				data.forEach((p) => (p.comments = false))
			} else {
				data.comments = false
			}
		}

		if (Array.isArray(data)) {
			for (var i = 0; i < data.length; i++) {
				state.posts[data[i].id] = data[i]
			}
		} else if (typeof data === 'object') {
			state.posts[data.id] = data
		}

		this.set(state)
		if (Array.isArray(data)) {
			return data as WPPostObject[]
		} else {
			return data as WPPostObject
		}
	}

	patch = async (
		id: number,
		params: WPPostsGetParams = null
	): WPPostsGetPromise => {
		return await this.request
			.patch('/wp/v2/posts/' + id, params)
			.then(({ data }) => data)
	}

	create = async (args: WPPostsGetParams): Promise<WPPostObject> => {
		let res: AxiosResponse
		try {
			res = await this.request.post('/wp/v2/posts', args)
			if (res.status === 201 && res.statusText === 'Created') {
				return await this.getFull(res.data)
			}
		} catch (error) {
			throw error
		}
	}
}
