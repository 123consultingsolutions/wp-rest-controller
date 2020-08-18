import {
	WPUserObject,
	WPCategoryObject,
	WPMediaObject,
	WPTagObject,
} from './index'

export interface WPPostObject {
	author: number | WPUserObject
	categories: Array<number | WPCategoryObject>
	comment_status: string
	content: { rendered: string; protected: boolean }
	date: string
	date_gmt: string
	excerpt: { rendered: string; protected: boolean }
	featured_media: number | WPMediaObject | boolean
	format: string
	guid: { rendered: string }
	id: number
	link: string
	likes: boolean | Array<string | number | WPUserObject>
	meta: Array<any>
	modified: string
	modified_gmt: string
	ping_status: string
	slug: string
	status: string
	sticky: boolean
	tags: Array<number | WPTagObject>
	template: string
	title: { rendered: string }
	type: string
	comments?: any
	_links?: any
}

export type WPPostsGetParams = Object | string | number | null
export type WPPostsGetPromise = Promise<WPPostObject | WPPostObject[]>
export type WPPostsGetResponse = WPPostObject | WPPostObject[]
