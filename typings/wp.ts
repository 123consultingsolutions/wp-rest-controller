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

export interface WPMediaObject {
	alt_text: string
	author: number
	caption: { rendered: string }
	comment_status: string
	date: string
	date_gmt: string
	description: { rendered: string }
	guid: { rendered: string } | string
	id: number
	link: string
	media_details: {
		width: number
		height: number
		file: string
		sizes: {
			[size: string]: {
				file: string
				height: number
				mime_type: string
				source_url: string
				width: number
			}
		}
		image_meta: {
			aperture: string
			camera: string
			caption: string
			copyright: string
			created_timestamp: string
			credit: string
			focal_length: string
			iso: string
			keywords: any[]
			orientation: string
			shutter_speed: string
			title: string
		}
	}
	media_type: string
	meta: any[]
	mime_type: string
	modified: string
	modified_gmt: string
	ping_status: string
	post: number
	slug: string
	source_url: string
	status: string
	template: string
	title: { rendered: string }
	type: string
	_links?: any
}

export type WPMediaGetResponse = WPMediaObject | WPMediaObject[] | boolean
export type WPMediaGetPromise = Promise<WPMediaGetResponse>

export interface WPUserObject {
	avatar_urls: { [size: string]: string }
	description: string
	id: 1
	link: string
	meta: []
	name: string
	slug: string
	url: string
	profile_background_image?: WPMediaObject
	woocommerce_meta?: {
		activity_panel_inbox_last_read: string
		activity_panel_reviews_last_read: string
		categories_report_columns: string
		coupons_report_columns: string
		customers_report_columns: string
		dashboard_chart_interval: string
		dashboard_chart_type: string
		dashboard_leaderboard_rows: string
		dashboard_sections: string
		homepage_stats: string
		orders_report_columns: string
		products_report_columns: string
		revenue_report_columns: string
		taxes_report_columns: string
		variations_report_columns: string
	}
	_links?: any
}

export type WPUsersGetPromise = Promise<WPUserObject | WPUserObject[]>
export type WPUsersGetResponse = WPUserObject | WPUserObject[]

export interface WPCategoryObject {
	count: number
	description: string
	id: number
	link: string
	meta: any[]
	name: string
	parent: number
	slug: string
	taxonomy: string
	_links?: any
}

export type WPCategoryGetResponse = WPCategoryObject | WPCategoryObject[]
export type WPCategoryGetPromise = Promise<WPCategoryGetResponse>

export interface WPTagObject {
	count: number
	description: string
	id: number
	link: string
	meta: any[]
	name: string
	slug: string
	taxonomy: string
	_links?: any
}

export type WPTagsGetResponse = WPTagObject | WPTagObject[]
export type WPTagsGetPromise = Promise<WPTagsGetResponse>

export interface WPCommentObject {
	author: number
	author_avatar_urls: { [size: string]: string }
	author_name: string
	author_url: string
	content: { rendered: string }
	date: string
	date_gmt: string
	id: number
	link: string
	meta: any[]
	parent: number
	post: number
	status: string
	type: string
	_links?: any
}

export type WPCommentsGetResponse = WPCommentObject | WPCommentObject[]
export type WPCommentsGetPromise = Promise<WPCommentsGetResponse>
