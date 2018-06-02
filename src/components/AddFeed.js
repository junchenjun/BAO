import React, { PureComponent } from 'react';
import { Text, View, TouchableOpacity, ActivityIndicator, TextInput, BackHandler, StyleSheet } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Container, ItemCard, Input } from './common';
import { feedAdd, feedDelete, feedEdit } from '../actions';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';


class AddFeed extends PureComponent{

	constructor(props){
		super(props);
		this.onUrlChange = this.onUrlChange.bind(this);
		this.onAddPress = this.onAddPress.bind(this);
	}
	
	componentWillMount() {
		BackHandler.addEventListener('hardwareBackPress', this.onBackAndroid);
	}

	componentWillUnmount() {
		this.props.feedEdit({ rss_url: '' })
		BackHandler.removeEventListener('hardwareBackPress', this.onBackAndroid);
	}

	onBackAndroid = () => {
		return this.props.loading? true: false;
	}

	onAddPress() {
		this.props.feedAdd({ rss_url: this.props.rss_url })
	}

	onBackPress() {
		Actions.pop()
	}

	onUrlChange(text) {
		if (!this.props.loading) {
			this.props.feedEdit({ rss_url: text })
		}
	}

	renderButton() {
		const { titleColor } = this.props;
		if (!this.props.loading) {
			return(
				<View>
					<TouchableOpacity onPress={ this.onAddPress } activeOpacity={ 0.5 }>
						<Text style={ [ styles.buttonStyle, { borderColor: titleColor, color: titleColor } ] }>
							Add
						</Text>
					</TouchableOpacity>
				</View>
			);
		} else {
			return(
				<View style={ styles.loadingStyle }>
					<ActivityIndicator size="small" color={ titleColor }/>
				</View>
			)
		}

	}

	renderBackButton() {
		const { themeColor } = this.props;
		const { backIconStyle } = styles;
		if (!this.props.loading) {
			return(
				<View>
					<TouchableOpacity onPress={ this.onBackPress } activeOpacity={ 0.5 }>
						<Icon name={ 'ios-close-outline' } size={ 60 } color={ themeColor } style={ backIconStyle } />
					</TouchableOpacity>
				</View>
			);
		} else {
			return(
				<View>
					<Icon name={ 'ios-close-outline' } size={ 60 } color={ themeColor } style={ backIconStyle } />
				</View>
			)
		}
	}

	render() {
		const {
			inputCardStyle
		} = styles;

		return(
			<Container>
				{ this.renderBackButton() }
				<View style={{ width: 308, alignSelf: 'center', marginTop: 10 }}>
						<ItemCard
							style={ inputCardStyle }>
								<Input
									secureTextEntry={ false } 
									placeholder={ 'https://mysite.com/rss' }
									autoCorrect={ false }
									value={ this.props.rss_url }
									onChangeText={ this.onUrlChange }
									editable= { !this.props.loading }
									maxLength = { 300 }
								/>
						</ItemCard>
						{ this.renderButton() }
				</View>	
			</Container>	
		);
	}
}

const styles = StyleSheet.create({
	backIconStyle:{
		alignSelf: 'flex-end',
		marginRight: 40,
		marginTop: 20,
		marginBottom: 10
	},
	buttonStyle: {
		margin: 3,
		color: 'purple',
		alignSelf: 'flex-end',
		borderRadius: 4,
		borderWidth: 1,
		marginTop: 15,
		marginRight: 8,
		padding: 5,
		paddingLeft: 17,
		paddingRight: 17,
		justifyContent: 'center',
	},
	loadingStyle: {
		alignSelf: 'flex-end',
		marginTop: 15,
		marginRight: 8,
		padding: 5,
		paddingLeft: 20,
		paddingRight: 31,
		justifyContent: 'center',
	},
	inputCardStyle: { 
		width: 300, 
		paddingLeft: 4, 
		paddingRight: 4, 
		padding: 2,
	}
})

const mapStateToProps = state => {
	return {
		rss_title: state.feed.rss_title,
		rss_url: state.feed.rss_url,
		loading: state.feed.loading,
		titleColor: state.themes.titleColor,
		themeColor: state.themes.themeColor
	};
};

export default connect(mapStateToProps, { feedAdd, feedDelete, feedEdit })(AddFeed);
