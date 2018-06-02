import AV from 'leancloud-storage'; 
import { Actions } from 'react-native-router-flux';
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
	ERROR_MESSAGE,
	CURRENT_FEED
} from './types';

const api = 'https://api.rss2json.com/v1/api.json?rss_url=';
const apiParams = '&api_key=b5gxz7tkpefjdnwkyv2vbttmaybnft653sfhxc83&count=30&order_by=pubDate';

export const setCurrentFeed = ( currentFeed ) => {
	return ({
		type: CURRENT_FEED,
		payload: currentFeed
	})
}

// http://www.36kr.com/feed/

export const feedDetailFetch = ({ rss_url, rss_title, initialLoading }) => {
	return (dispatch) => {
		if (!initialLoading) {
			// disable initial headerrefreshing
			headerRefreashing(dispatch);
		}
		let feedsQuery = new AV.Query('Feeds');
		feedsQuery.equalTo('owner', rss_url);
		feedsQuery.limit(18);
		feedsQuery.addDescending('pubDate');
		feedsQuery.find()
			.then((oldFeeds) => {
				if ( oldFeeds.length == 0 ) {
					const paramsJson = {
					  rss_url: rss_url,
					  rss_title: rss_title
					};
					AV.Cloud.run('firstFeedDetailFetch', paramsJson).then( () => {
						feedsQuery.find()
							.then((feeds) => {
								dispatch({
									type: FEED_DETAIL_FETCH_SUCCESS,
									payload: feeds
								})
							})
					}, (err) => {});
				}
				else {
					dispatch({
						type: FEED_DETAIL_FETCH_SUCCESS,
						payload: oldFeeds
					})	
				}
			})
	}
}

export const feedDetailFetchMore = ({ rss_url, num }) => {
	return (dispatch) => {
		dispatch({
			type: FOOTER_IS_REFRESHING,
		})
		let feedsQuery = new AV.Query('Feeds');
		feedsQuery.equalTo('owner', rss_url);
		feedsQuery.addDescending('pubDate');
		feedsQuery.skip(num)
		feedsQuery.limit(15);
		feedsQuery.find()
			.then((moreFeeds) => {
				if (moreFeeds.length == 0) {
					dispatch({
						type: NO_MORE
					})
				}
				else{
					dispatch({
						type: MORE_FEED_DETAIL_FETCH_SUCCESS,
						payload: moreFeeds
					})					
				}
			})
	}
}

export const noMoreReset = () => {
	return({ type: NO_MORE_RESET })
}

export const stopFooterRefreshing  = () => {
	return { type: STOP_FOOTER_REFRESHING };
}


export const headerRefreashing = (dispatch) => {
	dispatch({
		type: HEADER_IS_REFRESHING,
	})
};

export const feedsFetch = () => {
	return (dispatch) => {
		AV.User.currentAsync()
			.then( (currentUser) => {
				AV.User.become(currentUser._sessionToken)
					.then((user) => {
						return user.get('RSSFeeds');
					})
					.then((data) => {
						dispatch({
							type: FEEDS_FETCH_SUCCESS,
							payload: data
						});
					});
			})
	}
}

export const clearFeeds = () => {
	return ({
		type: FEEDS_CLEAR
	})
}

export const feedAdd = ({ rss_url }) => {
	return (dispatch) => {
		dispatch({ type: ADD_FEED_LOADING, });
		if (rss_url === '') {
			feedAddFail(dispatch);
			errorMessage(dispatch, 'Empty url');
			return false;
		}
		fetch(api + rss_url)
			.then(response => response.json())
			.then((data) => {
				if (data.status === 'ok') {
					AV.User.currentAsync()
						.then((currentUser) => {
							let RSSFeeds = currentUser.get('RSSFeeds');
							for (let i = 0; i < RSSFeeds.length; i++) {
							// already exist
								if (RSSFeeds[i].rss_url == rss_url) {
									feedAddFail(dispatch)
									errorMessage(dispatch, 'Feed already exist')
									return 0;
								}
							};
							if (!data.feed.title) {
								feedAddFail(dispatch);
								errorMessage(dispatch, 'Failed');
								return false;								
							}
							const RSSFeed = {
								rss_url: rss_url,
								rss_title: data.feed.title
							};
							RSSFeeds[RSSFeeds.length] = RSSFeed;
							currentUser.set('RSSFeeds', RSSFeeds);
							currentUser.save()
								.then(() => {
									Actions.pop({refresh: {test: Math.random()}})
									feedAddSuccess(dispatch, RSSFeeds);
								})
								.catch((error) => {
									feedAddFail(dispatch)
									errorMessage(dispatch, 'Failed')
								})
			    		.catch( (error) => {
			    			feedAddFail(dispatch)
							errorMessage(dispatch, 'Failed')
			    		});
					})
				}
				else{
					feedAddFail(dispatch)
					errorMessage(dispatch, 'Invalid url')
				}
			})
			.catch((error)=> {
			    feedAddFail(dispatch) 
				errorMessage(dispatch, 'Invalid url')
			})
	}
};

export const feedAddFail = (dispatch) => {
	dispatch({
		type: FEED_ADD_FAIL,
	})
};

export const feedAddSuccess = (dispatch, data) => {
	dispatch({
		type: FEED_ADD_SUCCESS,
		payload: data
	})
};

export const feedDelete = ({ item }) => {
	return (dispatch) => {
		AV.User.currentAsync()
			.then((currentUser) => {
				let RSSFeeds = currentUser.get('RSSFeeds');
				RSSFeeds.splice(RSSFeeds.indexOf(item),1);
				currentUser.set('RSSFeeds', RSSFeeds);
				currentUser.save()
					.then(() => {
						Actions.pop({refresh: {test:Math.random()}})
						dispatch({
							type: FEED_DELETE,
							payload: RSSFeeds
						})
					})
			})		
	}
};

export const feedEdit = ({ rss_url }) => {
	return {
		type: FEED_EDIT,
		payload: { rss_url }
	};
}

export const eixtMessage = (error) => {
	return {
		type: ERROR_MESSAGE,
		payload: error
	}
}

export const errorMessage = (dispatch, error) => {
	dispatch({
		type: ERROR_MESSAGE,
		payload: error		
	})
}