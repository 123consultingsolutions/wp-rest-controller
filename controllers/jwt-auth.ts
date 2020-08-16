import WPController from '../WPController'
import type { AxiosResponse } from 'axios'

export interface UserCreds {
	username: String
	password: String
	rememberMe?: Boolean
}

export interface TokenPackage {
	displayName: String
	email: String
	firstName: String
	id: Number
	lastName: String
	nicename: String
	token: String
}

export interface Namespace {
	v1: JWTAuth
}

export class JWTAuth extends WPController {
	_tokenPkg: TokenPackage

	setToken = (tokenPackage: TokenPackage | string | null = null) => {
		if (typeof tokenPackage === 'string') {
			this.request.defaults.headers.common.Authorization = `Bearer ${tokenPackage}`
		} else if (tokenPackage === null) {
			delete this.request.defaults.headers.common.Authorization
		} else if (typeof tokenPackage === 'object') {
			this.request.defaults.headers.common.Authorization = `Bearer ${tokenPackage.token}`
		}
	}

	getToken = async (user: UserCreds) => {
		try {
			let { data } = await this.request.post('/jwt-auth/v1/token', user)
			if (data.statusCode === 200) return data.data
			else throw data
		} catch (error) {
			throw error
		}
	}

	validate = async (token: TokenPackage | null = null) => {
		if (token) this.setToken(token)
		try {
			let { data }: AxiosResponse = await this.request.post(
				'/jwt-auth/v1/token/validate'
			)
			if (data.statusCode === 200) return token
			else throw data
		} catch (error) {
			throw error
		}
	}

	save = (tokenPackage: TokenPackage): Boolean => {
		if (window.localStorage && typeof tokenPackage === 'object') {
			this.setToken(tokenPackage)
			window.localStorage.setItem('sa-user', JSON.stringify(tokenPackage))
			console.log('user saved')
			return true
		} else return false
	}

	load = async (): Promise<TokenPackage | Boolean> => {
		if (window.localStorage) {
			let d = window.localStorage.getItem('sa-user')
			if (d) {
				let tokenPackage: TokenPackage = JSON.parse(d) as TokenPackage
				await this.validate(tokenPackage)
					.then(this.save)
					.catch((error) => {
						console.error('invalid token! Clearing local user data!', error)
						this.clear()
					})
				return true
			} else return false
		} else return false
	}

	clear = (): Boolean => {
		this.setToken()
		if (window.localStorage) {
			window.localStorage.removeItem('sa-user')
			return true
		} else return false
	}
}

export default {
	namespace: 'jwtAuth.v1',
	controller: JWTAuth,
}
