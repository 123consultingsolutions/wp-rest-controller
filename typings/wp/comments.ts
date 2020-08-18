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
