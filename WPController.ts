import type { RouteControllers } from './controllers'
import type { WPState } from './WPRestController'
import type { AxiosInstance } from 'axios'

export interface ControllerExport {
	namespace: string
	controller: Function
}

export default class WPController {
	public state: WPState
	public request: AxiosInstance
	public route: RouteControllers
	public set: Function
	public subscribe: Function
	constructor(base: WPController) {
		this.state = base.state
		this.request = base.request
		this.route = base.route
		this.set = base.set
		this.subscribe = base.subscribe
	}
}
