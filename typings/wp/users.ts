import type { WPMediaObject } from './media'

export interface WPUserObject {
	avatar_urls: { [size: string]: string } | string
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
