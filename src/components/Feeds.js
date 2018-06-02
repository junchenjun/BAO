import React, { PureComponent } from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, Dimensions, BackHandler, StyleSheet } from 'react-native';
import { Card, Container, ItemCard } from './common';
import AV from 'leancloud-storage'; 
import LoginForm from './LoginForm'; 
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { feedsFetch, eixtMessage, setCurrentFeed, clearFeeds } from '../actions';
import Icon from 'react-native-vector-icons/Ionicons';

const { width } = Dimensions.get('window');
const headerPadding = width*0.05;
const touchableWidth = width*0.9+7;

class Feeds extends PureComponent {
	constructor(props){
		super(props)
		this.renderItem = this.renderItem.bind(this)
	}

	onBackAndroid = () => {
		if (Actions.currentScene != 'Feeds') return false;
		if (this.lastBackPressed && this.lastBackPressed + 2000 >= Date.now()) {
			// BackHandler.exitApp();
			return false;
		}
		this.lastBackPressed = Date.now();
		this.props.eixtMessage('Press again to exit the app');
		return true;
	}

	componentWillMount() {
		this.props.feedsFetch();
		BackHandler.addEventListener('hardwareBackPress', this.onBackAndroid);
	}

	componentWillReceiveProps(nextProps) {
		if ( nextProps.currentUser && (this.props.currentUser !== nextProps.currentUser)) {
			this.props.feedsFetch();
		}
		if (!nextProps.currentUser) {
			this.props.clearFeeds();
		}
	}

	componentWillUnmount() {
		BackHandler.removeEventListener('hardwareBackPress', this.onBackAndroid);
	}

	onDrawerOpenPress() {
		Actions.drawerOpen()
	}

	onAddIconPress() {
		Actions.AddFeed()
	}

	renderAddIcon() {
		const { currentUser, themeColor } = this.props;
		const { buttonStyle } = styles;

		return currentUser?(
				<TouchableOpacity onPress={ this.onAddIconPress  } style={ buttonStyle }>
					<Icon name={'ios-add-outline'} size={ 40 } color={ themeColor }/>
				</TouchableOpacity>				
			):(
				<View onPress={ this.onAddIconPress }  style={ buttonStyle }>
					<Icon name={'ios-add-outline'} size={ 40 } color={'grey'}/>
				</View>
			)
	}

 	renderItem({ item }) {
 		const { bigTitleColor } = this.props;
 		const { titleStyle, touchableStyle } = styles;
		return (
			<TouchableOpacity 
				onPress={ () => {
					this.props.setCurrentFeed(item.rss_title)
					Actions.FeedDetail({ item });
				} }
				style={ touchableStyle }
			>
				<ItemCard style={{ padding: 14 }}>
					<Text 
						style = { [ titleStyle, { color: bigTitleColor } ] }
						numberOfLines = { 1 }
						ellipsizeMode = 'tail'
					>
						{ item.rss_title }
					</Text>
				</ItemCard>
			</TouchableOpacity>
		);
	}

	renderList() {
		const { loadingStyle, listStyle } = styles;
		const { currentUser, RSSFeeds, themeColor, feedsFetch } = this.props;

		if (!currentUser) {
			return <View/>
		}
		if (!RSSFeeds) {
			if (currentUser) {
				return (
					<View style={ loadingStyle }>
						<ActivityIndicator size="small" color= { themeColor } />
					</View>
				)
			}
			else {
				return <View/>
			}
		}
		if (!RSSFeeds.length) {
			return <View/>
		}
		return(
			<FlatList
				data={ RSSFeeds }
				renderItem={ (item) => this.renderItem(item) }
				keyExtractor={(feed) => feed.rss_url }
				style = { listStyle }
				extraData={ this.props }
			/>
		)
	}

	render() {
		const { headerContainerStyle, buttonStyle } = styles;
		const { themeColor } = this.props;
		return(
			<Container>
				<View style={ headerContainerStyle }>
					<View>
						<TouchableOpacity onPress={ this.onDrawerOpenPress } style={ buttonStyle }>
							<Icon name={ 'ios-menu-outline' } size={ 37 } color={ themeColor }/>
						</TouchableOpacity>
					</View>
					<View>
						<Icon name={'logo-rss'} size={40} color={ themeColor }/>
					</View>
					{ this.renderAddIcon() }
				</View>
				{ this.renderList() }
			</Container>
		);
	}
}

const styles = StyleSheet.create({
	titleStyle: {
		lineHeight: 30,
		flex: 1,
		fontSize: 23,
		alignSelf: 'center',
		fontWeight: 'bold',
	},
	headerContainerStyle: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		height: 45,
		width: width,
		alignSelf: 'center'
	},
	buttonStyle: {
		padding: 2,
		paddingLeft: headerPadding,
		paddingRight: headerPadding
	},
	listStyle: {
		marginBottom: 10
	},
	loadingStyle: {
		marginTop: 100
	},
	touchableStyle: {  
		width: touchableWidth,
		alignSelf:'center'
	}
})

const mapStateToProps = state => {
	return { 
		currentUser: state.auth.currentUser,
		RSSFeeds: state.feed.feeds,
		themeColor: state.themes.themeColor,
		bigTitleColor: state.themes.bigTitleColor
	};
};

export default connect(mapStateToProps, { feedsFetch, eixtMessage, setCurrentFeed, clearFeeds })(Feeds);