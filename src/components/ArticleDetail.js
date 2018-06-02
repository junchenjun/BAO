import React, { PureComponent } from 'react';
import { Text, TouchableOpacity, View, ScrollView, Dimensions, Linking, StyleSheet } from 'react-native';
import { Container, HTMLContent, Confirm } from './common';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
import ElevatedView from 'react-native-elevated-view';

const { width } = Dimensions.get('window');
const articleWidth = width*0.93;
const headerPadding = width*0.05;

class ArticleDetail extends PureComponent {

    constructor(props){
        super(props);
        this.state = { 
			showContent: false,
			showModal: false 
		};
        this.onAccept = this.onAccept.bind(this);
        this.onDecline = this.onDecline.bind(this);
        this.onOpenButtonPress = this.onOpenButtonPress.bind(this);
        this.onFooterPress = this.onFooterPress.bind(this);
    }

	componentDidMount() {
	    this.timer = setTimeout(  
	      () => { this.setState({ ...this.state, showContent: true }) },  
	      100 
	    );  
	}

	componentWillUnmount() {  
		clearTimeout(this.timer);  
	}  

    onAccept() {
        this.setState({ showModal: false });
        Linking.openURL(this.props.item.url);
    }

    onDecline() {
        this.setState({ showModal: false });
    }

    onOpenButtonPress() {
        this.setState({ showModal: true })
    }

	onHeaderTitlePress() {
		Actions.pop()
	}

	onFooterPress() {
		Linking.openURL(this.props.item.url)
	}

	renderUnderTitle() {
		const {
			author,
			sourceTitle,
		} = this.props.item;
		
		const { articleAuthorsStyle } = styles;

		if (this.props.item.author) {
			return(
				<View>
					<Text 
						style={ articleAuthorsStyle }
						numberOfLines = { 1 }
						ellipsizeMode = 'tail'
					>
						{ sourceTitle } / by { author } 			
					</Text>
				</View>
			)			
		} 
		else {
			return(
				<View>
					<Text 
						style={ articleAuthorsStyle }
						numberOfLines = { 1 }
						ellipsizeMode = 'tail'
					>
						{ sourceTitle } 			
					</Text>
				</View>
			)	
		}
	}

	renderTitle() {
		const {
			articleTitleContainerStyle,
			articleTitleStyle,
		} = styles;

		const { itemCardBackgroundColor, titleColor } = this.props;

		const {
			sourceTitle,
			title,
			content
		} = this.props.item;
		return(
			<View style= { [ articleTitleContainerStyle, { backgroundColor: itemCardBackgroundColor } ] }>
				<View>
					<Text style= { [ articleTitleStyle, { color: titleColor } ] } selectable = { true }>
						{ title.trim() }
					</Text>
				</View>
				{ this.renderUnderTitle() }	
			</View>
		)
	}

	renderHTML() {
		if (this.state.showContent) {
			return(
				<HTMLContent 
					html = { this.props.item.content } 
				/>
			)			
		}
	}

	renderArticleFooter() {
		const { footterContainerStyle, footterButtonStyle, footterTextStyle } = styles;
		const { itemCardBackgroundColor, themeColor } = this.props;
		if (this.state.showContent) {
			return(
				<View style = { [ footterContainerStyle, { backgroundColor: itemCardBackgroundColor } ]} >
					<TouchableOpacity 
						style = { [ footterButtonStyle, { borderColor: themeColor } ] } 
						onPress={ this.onFooterPress  } 
					>
						<Text style = { [ footterTextStyle, { color: themeColor } ] }>Visit Website</Text>
					</TouchableOpacity>
				</View>			
			)
		}
	}

	render() {
		const {
			headerContainerStyle,
			headerTitleStyle,
			headerTitleTextStyle,
			buttonStyle,
			contentContainerStyle,
			elevatedViewStyle
		} = styles;

		const {
			sourceTitle,
			title,
			content
		} = this.props.item;

		const {
			themeColor, titleColor, headerTitleColor
		} = this.props;

		return (
			<Container>
				<View style={ headerContainerStyle }>
					<View>
						<TouchableOpacity onPress={ this.onHeaderTitlePress }  style={ headerTitleStyle } activeOpacity={ 0.5 }>
							<Icon name={ 'ios-arrow-back-outline' } size={30} color={ themeColor }/>
							<Text 
								style={ [ headerTitleTextStyle, { color: headerTitleColor } ]  }
								numberOfLines = { 1 }
								ellipsizeMode = 'tail'
							>
								{ sourceTitle }
							</Text>
						</TouchableOpacity>
					</View>
					<View>
						<TouchableOpacity style={ buttonStyle } onPress={ this.onOpenButtonPress } activeOpacity={ 0.5 }>
							<Icon name={'ios-open-outline'} size={30} color={ themeColor }/>
						</TouchableOpacity>
					</View>
				</View>
				<ScrollView contentContainerStyle={ contentContainerStyle } >
					<ElevatedView elevation={ 2 } style={ elevatedViewStyle }>
						{ this.renderTitle() }
						{ this.renderHTML() }
						{ this.renderArticleFooter() }
					</ElevatedView>
		   		</ScrollView>
			    <Confirm
                    visible={ this.state.showModal }
                    onAccept={ this.onAccept }
                    onDecline={ this.onDecline }
                >
                	<Text>Open in Browser</Text>
                </Confirm>
			</Container>
		);
	}	

};
const styles = StyleSheet.create({
	contentContainerStyle: {
		width: articleWidth+6,
		alignSelf:'center'
	},
	elevatedViewStyle: {
		margin: 3,
		marginTop: 2, 
		marginBottom: 16, 
		borderRadius: 5
	},
	headerTitleStyle:{
		flexDirection: 'row',
		padding: 2,
		paddingLeft: headerPadding,
		paddingRight: headerPadding,
		alignItems: 'center'
	},
	headerTitleTextStyle: {
		fontSize: 20,
		lineHeight: 30,
		paddingLeft: 10,
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
	articleTitleContainerStyle: {
		width: articleWidth,
		padding: 12,
		paddingBottom: 20
	},
	articleTitleStyle: {
		fontSize: 25,
		lineHeight: 36,
		marginBottom: 10,
		fontWeight: 'bold'
	},
	articleAuthorsStyle: {
		fontSize: 14,
		color: '#888',
	},
	footterContainerStyle: {
		justifyContent: 'center',
		alignItems: 'stretch',
		width: articleWidth
	},
	footterButtonStyle: {
		borderWidth: 1,
		borderRadius: 5,
		height: 46,
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		margin: 20,
	},
	footterTextStyle: {
		fontSize: 14,
	}	
});

const mapStateToProps = state => {
	return { 
		themeColor: state.themes.themeColor,
		titleColor: state.themes.titleColor,
		headerTitleColor: state.themes.headerTitleColor,
		itemCardBackgroundColor: state.themes.itemCardBackgroundColor
	};
};

export default connect(mapStateToProps)(ArticleDetail);