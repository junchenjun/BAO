import {
	FEED_ADD,
	FEED_DELETE,
	FEED_EDIT,
	FEED_ADD_FAIL,
	FEED_ADD_SUCCESS,
	ADD_FEED_LOADING,
	FEEDS_FETCH_SUCCESS,
	FEEDS_CLEAR,
	FEED_DETAIL_FETCH_SUCCESS,
	FEED_DETAIL_FETCH_FAIL,
	HEADER_IS_REFRESHING,
	FOOTER_IS_REFRESHING,
	STOP_FOOTER_REFRESHING,
	MORE_FEED_DETAIL_FETCH_SUCCESS,
	NO_MORE,
	NO_MORE_RESET,
	LOGOUT_SUCCESS,
	CURRENT_FEED
} from '../actions/types';

const INITAIL_STATE = {
	rss_title: '',
	rss_url: '',
	loading: false,
	feeds: null,
	feedDetail: [],
	articleDetail: '',
	headerRefreashing: false,
	footerRefreshing: false,
	noMore: false,
	currentFeed: '',
};
		
export default (state = INITAIL_STATE, action) => {
	switch (action.type) {
		case CURRENT_FEED:
			return { ...state, currentFeed: action.payload };

		case FEED_ADD:
			return { ...state, rss_title: action.payload.rss_title ,rss_url: action.payload.rss_url };

		case FEED_DELETE:
			return { ...state, feeds: action.payload };

		case FEED_EDIT:
			return { ...state, rss_url: action.payload.rss_url };

		case FEED_ADD_FAIL:
			return { ...state, rss_url:'', rss_title: '', loading: false };

		case FEED_ADD_SUCCESS:
			return { ...state, rss_url:'', rss_title: '', loading: false, feeds: action.payload };

		case FEEDS_FETCH_SUCCESS:
			return { ...state, feeds: action.payload };

		case FEEDS_CLEAR:
			return INITAIL_STATE

		case ADD_FEED_LOADING:
			return { ...state, loading: true }

		case FEED_DETAIL_FETCH_SUCCESS:
			if ( state.currentFeed != action.payload[0].attributes.sourceTitle) {
				// in case unnecessary re-render
				return { ...state }
			}
			return { ...state, feedDetail: action.payload, headerRefreashing: false };

		case FEED_DETAIL_FETCH_FAIL:
			return { ...state, headerRefreashing: false };

		case HEADER_IS_REFRESHING:
			return { ...state, headerRefreashing: true, noMore: false };

		case FOOTER_IS_REFRESHING:
			return { ...state, footerRefreshing: true };

		case MORE_FEED_DETAIL_FETCH_SUCCESS:
			const moreFeeds = state.feedDetail.concat(action.payload);
			return { ...state, footerRefreshing: false, feedDetail: moreFeeds };
			
		case STOP_FOOTER_REFRESHING:
			return { ...state, footerRefreshing: false };

		case NO_MORE:
			return { ...state, noMore: true, footerRefreshing: false };

		case NO_MORE_RESET:
			return { ...state, noMore: false };

		default:
			return state;
	}
};