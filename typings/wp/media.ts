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
