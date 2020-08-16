import WPController from '../WPController'

import type { AxiosResponse } from 'axios'
import type { MenuObject } from '../typings/menus'

export interface Namespace {
	v1: Menus
}

export class Menus extends WPController {
	getMenu = async (slug: String = ''): Promise<MenuObject | boolean> => {
		try {
			let { data }: AxiosResponse = await this.request.get(
				`/menus/v1/menus/${slug}`
			)
			if (data.success === false) throw data
			else return data
		} catch (e) {
			console.error(e)
			return false
		}
	}

	getLocation = async (slug: String = ''): Promise<MenuObject | Boolean> => {
		try {
			let { data }: AxiosResponse = await this.request.get(
				`/menus/v1/locations/${slug}`
			)
			return data as MenuObject
		} catch {
			console.error('failed to fetch menu locations')
			return false
		}
	}
}

export default {
	namespace: 'menus.v1',
	controller: Menus,
}
