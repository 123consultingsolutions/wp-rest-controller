import WPController from '../WPController'

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

/**
 *! This Rest Controller is mean to be used with JWT Auth by Useful Team
 ** https://wordpress.org/plugins/jwt-auth/
 */
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
			let res = await this.request.post('/jwt-auth/v1/token', user)
			if (res.status === 200) return res.data.data
			else throw res
		} catch (error) {
			throw error
		}
	}

	validate = async (token: TokenPackage | null = null) => {
		if (token) this.setToken(token)
		try {
			let res = await this.request.post('/jwt-auth/v1/token/validate')
			if (res.status === 200) return token
			else throw res
		} catch (error) {
			throw error
		}
	}

	save = (tokenPackage: TokenPackage): Boolean => {
		const wp = this.route.wp.v2
		if (window.localStorage && typeof tokenPackage === 'object') {
			this.setToken(tokenPackage)
			window.localStorage.setItem('sa-user', JSON.stringify(tokenPackage))
			console.log('user saved')
			if (wp) wp.users.me()
			return true
		} else return false
	}

	load = async (): Promise<TokenPackage | Boolean> => {
		console.log('loading user...')
		if (window.localStorage) {
			let d = window.localStorage.getItem('sa-user')
			if (d) {
				let tokenPackage: TokenPackage = JSON.parse(d) as TokenPackage
				await this.validate(tokenPackage)
					.then(this.save)
					.then((saved) => {
						if (!saved) return false
						return d
					})
					.catch((error) => {
						console.error('invalid token! Clearing local user data!', error)
						this.clear()
						throw error
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
