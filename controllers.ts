import wp, { Namespace as WPNS } from './controllers/wp/wpv2'
import menus, { Namespace as MenusNS } from './controllers/menus'
import jwtAuth, { Namespace as jwtAuthNS } from './controllers/jwt-auth'

export interface RouteControllers {
	wp?: WPNS
	menus?: MenusNS
	jwtAuth?: jwtAuthNS
}

export default [wp, menus, jwtAuth]
