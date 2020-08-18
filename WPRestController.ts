import axios from 'axios'
import controllers, { RouteControllers } from './controllers'

import type { AxiosInstance, AxiosResponse } from 'axios'
import type { WPUserObject } from './typings/wp'

interface WPJsonResponse {
	authentication: Array<any>
	description: String
	gmt_offset: String
	home: String
	name: String
	namespaces: Array<string>
	routes: Object
	timezone_string: String
	url: String
	_links: any
	__proto__: Object
}

export interface WPState {
	base?: WPJsonResponse
	me?: WPUserObject
	[name: string]: any
}

export default class WPRestController {
	_connected: Boolean = false
	request: AxiosInstance

	subscribers: Array<Function> = []
	state: WPState = {
		posts: {},
	}
	route: RouteControllers = {}

	constructor(baseURL: string) {
		this.request = axios.create({ baseURL })
		this.setupControllers()
	}

	init = async (): Promise<Boolean> => {
		await this.fetchBaseData()
		return true
	}

	fetchBaseData = async (): Promise<WPRestController | Boolean> => {
		let res: AxiosResponse
		try {
			res = await this.request.get('')
		} catch {
			console.error('failed to connect to wp rest')
			return false
		}
		this.set({ base: res.data })
		return this
	}

	setupControllers = (): WPRestController => {
		controllers.forEach((c) => {
			let [routeNamespace, routeVersion] = c.namespace.split('.')
			this.route[routeNamespace] = {
				[routeVersion]: new c.controller(this),
			}
		})
		return this
	}

	subscribe = (subscription: Function): Function => {
		subscription(this.state)
		this.subscribers.push(subscription)
		return () => {
			const index = this.subscribers.indexOf(subscription)
			if (index !== -1) this.subscribers.splice(index, 1)
		}
	}

	set = (newState: Object): void => {
		//console.log('STATE UPDATE ', this.state, newState, this.subscribers.length)
		if (this.state !== newState)
			this.state = Object.assign(this.state, newState, {})
		if (this.subscribers.length > 0)
			this.subscribers.forEach((s) => s(this.state))
	}
}

/*export default (base: string) => {
	return new Proxy(new WPRestController(base), {
		get: (p, r) => {
			if (typeof p[r] !== 'undefined') return p[r]
			if (typeof p.route[r] !== 'undefined') return p.route[r]
			if (typeof p.state[r] !== 'undefined') return p.state[r]
			return false
		},
	})
}*/
