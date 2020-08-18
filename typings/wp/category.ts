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
