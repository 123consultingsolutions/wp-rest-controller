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
