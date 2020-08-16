import WPController from '@includes/wp-rest-controller/WPController'

import WPPages from './pages'
import WPPosts from './posts'
import WPMedia from './media'
import WPCategory from './category'
import WPUsers from './users'
import WPTags from './tags'
import WPComments from './comments'

export interface Namespace {
	v2: WPV2
}

export class WPV2 extends WPController {
	posts: WPPosts
	pages: WPPages
	media: WPMedia
	users: WPUsers
	categories: WPCategory
	tags: WPTags
	comments: WPComments

	constructor(base) {
		super(base)
		this.posts = new WPPosts(base)
		this.pages = new WPPages(base)
		this.media = new WPMedia(base)
		this.users = new WPUsers(base)
		this.categories = new WPCategory(base)
		this.tags = new WPTags(base)
		this.comments = new WPComments(base)
	}
}

export default {
	namespace: 'wp.v2',
	controller: WPV2,
}
