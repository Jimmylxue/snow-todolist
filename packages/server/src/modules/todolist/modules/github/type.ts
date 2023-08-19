export type TCommitList = {
	sha: string
	node_id: string
	commit: {
		author: {
			name: string
			email: string
			date: string
		}
		committer: {
			name: string
			email: string
			date: string
		}
		message: string
		tree: {
			sha: string
			url: string
		}
		url: string
		comment_count: number
		verification: {
			verified: false
			reason: 'unsigned'
			signature: null
			payload: null
		}
	}
	url: string
	html_url: string
	comments_url: string
}[]
