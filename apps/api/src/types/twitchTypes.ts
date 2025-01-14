interface IOAuthToken {
	access_token: string
	expires_in: number
	token_type: string
}

interface ioauthrejection {
	status: string
	message: string
}

interface itwitchlivechannels {
	id: string
	user_id: string
	user_login: string
	user_name: string
	game_id: string
	game_name: string
	type: string
	title: string
	viewer_count: number
	started_at: string
	language: string
	thumbnail_url: string
	tag_ids: [string]
	is_mature: boolean
}

interface itwitchdataforprofilepage {
	channeldata: itwitchchanneldata
	clips: itwitchclip[]
	recentvideos: itwitchvideo[]
	schedule: itwitchschedulesegment[]
}

interface itwitchclip {
	id: string
	url: string
	embed_url: string
	broadcaster_id: string
	broadcaster_name: string
	creator_id: string
	creator_name: string
	video_id: string
	game_id: string
	language: string
	title: string
	view_count: number
	created_at: Date
	thumbnail_url: string
	duration: number
}

interface itwitchvideo {
	id: string
	channel_id: string
	user_id: string
	user_login: string
	user_name: string
	title: string
	description: string
	created_at: Date
	published_at: Date
	url: string
	thumbnail_url: string
	viewable: string
	view_count: number
	language: string
	type: string
	duration: string
	muted_segments: null | any
}

interface itwitchschedulesegment {
	id: string
	start_time: Date
	end_time: Date
	title: string
	canceled_until: Date | null
	category: null | {
		id: string
		name: string
	}
	is_recurring: true
}

interface itwitchchanneldata {
	id: string
	login: string
	display_name: string
	type: string
	broadcaster_type: string
	description: string
	profile_image_url: string
	offline_image_url: string
	view_count: number
	created_at: Date
}
