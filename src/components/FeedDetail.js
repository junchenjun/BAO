import React, { Component } from 'react';
import AV from 'leancloud-storage'; 
import { Text, TouchableOpacity, View, ActivityIndicator, FlatList, RefreshControl, Dimensions, StyleSheet } from 'react-native';
import { ItemCard, Container, Confirm, Timer } from './common';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { feedDetailFetch, feedDelete, feedDetailFetchMore, stopFooterRefreshing, noMoreReset } from '../actions';
import Icon from 'react-native-vector-icons/Ionicons';

const { width } = Dimensions.get('window');
const headerPadding = width*0.05;
const touchableWidth = width*0.9+7;

class FeedDetail extends Component {

	constructor(props){
		super(props);
		this.state = { showModal: false };
		this.renderItem = this.renderItem.bind(this);
		this.onHeaderRefresh = this.onHeaderRefresh.bind(this);
		this.onFooterRefresh = this.onFooterRefresh.bind(this);
		this.onAccept = this.onAccept.bind(this);
		this.onDecline = this.onDecline.bind(this);
		this.onDeleteButtonPress = this.onDeleteButtonPress.bind(this);
	}

    componentWillMount() {
		const { rss_url, rss_title } = this.props.item;
		const { feedDetail } = this.props; 
		const {
			footerRefreshing,
			stopFooterRefreshing,
			feedDetailFetch,
			noMore,
			noMoreReset
		} = this.props;
		if (footerRefreshing) { stopFooterRefreshing() }
		if (noMore) { noMoreReset() }
	}

    onAccept() {
		const { item } = this.props;
        this.props.feedDelete({ item }) 
        this.setState({ showModal: false });
    }

    onDecline() {
        this.setState({ showModal: false });
    }

    onDeleteButtonPress() {
        this.setState({ showModal: true })
    }

    onBackPress() {
		Actions.pop()
	}

	onHeaderRefresh() {
		if (!this.props.footerRefreshing) {
			const { rss_url, rss_title } = this.props.item;
			this.props.feedDetailFetch({
				rss_url: rss_url,
				rss_title: rss_title,
				initialLoading: false
			})				
		}
	}

	onFooterRefresh() {
		const { 
			headerRefreashing, 
			footerRefreshing,
			feedDetailFetchMore,
			noMore
		} = this.props;

		if (footerRefreshing == false && headerRefreashing == false && noMore == false) {
			let num = this.props.feedDetail.length;
			const { rss_url, rss_title } = this.props.item;
			feedDetailFetchMore({ rss_url: rss_url, num: num });
		}
	}
	
	renderFooterRefresh() {
		const { 
			headerRefreashing, 
			footerRefreshing,
			noMore,
			themeColor
		} = this.props;
		const { footerRefreshStyle } = styles;

		if (noMore) {
			return(
				<View style={ footerRefreshStyle }>
						<Text style={{ color: '#999' }}>- The End -</Text>
				</View>
			)
		}
		if (footerRefreshing == true && headerRefreashing == false) {
			return(
				<View style={ footerRefreshStyle }>
					<ActivityIndicator size="small" color={ themeColor } />
				</View>
			)			
		}
	}

	renderItem({ item }) {
		const { attributes: article } = item;
		const { titleStyle, touchableStyle } = styles;
		const { titleColor } = this.props;

		return (
			<TouchableOpacity onPress = { () => Actions.ArticleDetail({ item: article }) } style={ touchableStyle }>
					<ItemCard style={{ flexDirection: 'column', height: 88 }}>
						<Text 
							style={ [ titleStyle, { color: titleColor } ] }
							numberOfLines = { 2 }
							ellipsizeMode = 'tail'
						> 
							{ article.title } 
						</Text>
						<Timer>{ article.pubDate }</Timer>
					</ItemCard>
			</TouchableOpacity>
		);
	}

	renderList() {
		const { rss_url, rss_title } = this.props.item;
		const { feedDetail, headerRefreashing, footerRefreshing, feedDetailFetch, themeColor } = this.props;
		const { loadingStyle } = styles;
		
		if (!feedDetail[0] || feedDetail[0].attributes.owner != rss_url) {
			feedDetailFetch({ rss_url: rss_url, rss_title: rss_title, initialLoading: true });
			return (
				<View style={ loadingStyle }>
					<ActivityIndicator size="small" color={ themeColor }/>
				</View>
			);			
		}
		else if (feedDetail[0].attributes.owner === rss_url) {
			return (
				<FlatList
					refreshControl={
						<RefreshControl
							refreshing={ headerRefreashing }
							onRefresh={ this.onHeaderRefresh }
							colors = { ['#000'] }
							tintColor = { themeColor }
						/>
			        }
			        onEndReached={ this.onFooterRefresh }
                	onEndReachedThreshold={ 0.1 }
					ListFooterComponent={ this.renderFooterRefresh() }
					data={ feedDetail }
					renderItem={ this.renderItem }
					keyExtractor={ (item) => item.id  }
					extraData={ this.props }
					// including the margins
					getItemLayout={(data, index) => (
				        {length: 94, offset: 94 * index, index}
				    )}
				    initialListSize={ 18 } 
				/>
			)
		}
	}

	render() {
		const { 
			headerContainerStyle,
			headerTitleStyle,
			headerTitleTextStyle,
			buttonStyle
		} = styles;
		const { rss_title, rss_url } = this.props.item;
		const { themeColor } = this.props;

		return (
			<Container>
				<View style={ headerContainerStyle } >
					<TouchableOpacity onPress={ this.onBackPress } style={ [ buttonStyle, { paddingRight: 10} ] }>
						<Icon name={ 'ios-arrow-back-outline' } size={ 30 } color={ themeColor }/>
					</TouchableOpacity>
					<View style={ headerTitleStyle }>
						<Text 
							style={ [ headerTitleTextStyle, { color: themeColor } ] }
							numberOfLines = { 1 }
							ellipsizeMode = 'tail'
						>
							{ rss_title }
						</Text>
					</View>
					<TouchableOpacity onPress={ this.onDeleteButtonPress } style={ buttonStyle }>
						<Icon name={ 'ios-trash-outline' } size={ 30 } color={ themeColor }/>
					</TouchableOpacity>
				</View>
				{ this.renderList() }
			    <Confirm
                    visible={ this.state.showModal }
                    onAccept={ this.onAccept }
                    onDecline={ this.onDecline }
                >
                	<Text>Unfollow</Text>
                </Confirm>
			</Container>
		);
	}
}

const styles = StyleSheet.create({
	titleStyle: {
		flex: 1,
		fontSize: 16,
		lineHeight: 25
	},
	headerTitleStyle:{
		flex: 1
	},
	headerTitleTextStyle: {
		fontSize: 20,
		lineHeight: 30
	},
	headerContainerStyle: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		height: 46,
		width: width,
		alignSelf: 'center'
	},
	buttonStyle: {
		padding: 2,
		paddingLeft: headerPadding,
		paddingRight: headerPadding
	},
	loadingStyle: {
		marginTop: 100
	},
	footerRefreshStyle: {
		flex: 1,
		height: 94 , 
		alignItems: 'center', 
		justifyContent: 'center'
	},
	touchableStyle: {  
		width: touchableWidth,
		alignSelf:'center'
	}
})

const mapStateToProps = state => {
	return {
		feedDetail: state.feed.feedDetail,
		themeColor: state.themes.themeColor,
		titleColor: state.themes.titleColor,
		headerRefreashing: state.feed.headerRefreashing,
		footerRefreshing:  state.feed.footerRefreshing,
		noMore: state.feed.noMore
	}
};

export default connect(mapStateToProps, { 
	feedDetailFetch, 
	feedDelete, 
	feedDetailFetchMore, 
	stopFooterRefreshing,
	noMoreReset
})(FeedDetail);