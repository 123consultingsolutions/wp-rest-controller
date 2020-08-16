import { AxiosResponse } from 'axios'
import {
	WPPostObject,
	WPPostsGetParams,
	WPPostsGetResponse,
	WPPostsGetPromise,
	WPMediaGetPromise,
	WPMediaGetResponse,
	WPUserObject,
	WPUsersGetPromise,
	WPCategoryObject,
	WPUsersGetResponse,
	WPMediaObject,
	WPCategoryGetResponse,
	WPCategoryGetPromise,
	WPTagObject,
	WPTagsGetPromise,
	WPTagsGetResponse,
	WPCommentsGetPromise,
	WPCommentsGetResponse,
} from '../typings/wp'
import WPController from '../WPController'

export interface Namespace {
	v2: WPV2
}

class WPPosts extends WPController {
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

class WPMedia extends WPController {
	get = async (params: WPPostsGetParams = null): WPMediaGetPromise => {
		let res: AxiosResponse
		switch (typeof params) {
			case 'undefined':
				res = await this.request.get('/wp/v2/media/')
				break
			case 'object':
				res = await this.request.get('/wp/v2/media/', { params })
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

class WPCategory extends WPController {
	get = async (params: WPPostsGetParams = null): WPCategoryGetPromise => {
		let res: AxiosResponse
		switch (typeof params) {
			case 'undefined':
				res = await this.request.get('/wp/v2/categories/')
				break
			case 'object':
				res = await this.request.get('/wp/v2/categories/', { params })
				break
			case 'string':
			case 'number':
				res = await this.request.get('/wp/v2/categories/' + params)
				return res.data as WPCategoryObject
		}
		return res.data as WPCategoryGetResponse
	}
}

class WPUsers extends WPController {
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
				res = await this.request.get('/wp/v2/users/', { params })
				break
			case 'string':
			case 'number':
				res = await this.request.get('/wp/v2/users/' + params)
				break
		}
		return res.data as WPUsersGetResponse
	}
}

class WPTags extends WPController {
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

class WPComments extends WPController {
	get = async (params: WPPostsGetParams = null): WPCommentsGetPromise => {
		let res: AxiosResponse
		switch (typeof params) {
			case 'undefined':
				res = await this.request.get('/wp/v2/comments/')
				break
			case 'object':
				res = await this.request.get('/wp/v2/comments/', { params })
				break
			case 'string':
			case 'number':
				res = await this.request.get('/wp/v2/comments/' + params)
				break
		}
		return res.data as WPCommentsGetResponse
	}
}

class WPPages extends WPController {}

export class WPV2 extends WPController {
	posts: WPPosts
	pages: WPPages
	media: WPMedia
	users: WPUsers
	categories: WPCategory
	tags: WPTags
	comments: WPComments

	constructor(base) {
		super(base)
		this.posts = new WPPosts(base)
		this.pages = new WPPages(base)
		this.media = new WPMedia(base)
		this.users = new WPUsers(base)
		this.categories = new WPCategory(base)
		this.tags = new WPTags(base)
		this.comments = new WPComments(base)
	}
}

export default {
	namespace: 'wp.v2',
	controller: WPV2,
}
