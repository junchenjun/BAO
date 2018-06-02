import React, { PureComponent } from 'react';
import { Text, ScrollView, TouchableOpacity, View, Linking, StyleSheet, BackHandler, Image, Dimensions } from 'react-native';
import { ItemCard, Container } from './common';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';

const { height } = Dimensions.get('window');

class About extends PureComponent{

	onGithubPress() {
		Linking.openURL('https://github.com/jaychenjun')
	}

	onEmailPress() {
		Linking.openURL("mailto:jaychen97@foxmail.com")
	}

	onBlogPress() {
		Linking.openURL('http://mountaincity.me/')
	}

	onBackPress() {
		Actions.pop()
	}

	render() {
		const { themeColor, titleColor, icon } = this.props;
		const { headerContainerStyle, buttonContainerStyle, buttonStyle, textStyle, iconStyle } = styles;
		return(
			<Container>
				<TouchableOpacity 
					onPress={ this.onBackPress } 
					style={ headerContainerStyle } 
				>
					<Icon name={'ios-arrow-back-outline'} size={ 40 } color={ themeColor }/>
				</TouchableOpacity>

				<ScrollView>
					<ItemCard style={{ flexDirection: 'column', alignItems: 'center',  paddingBottom: height*0.06 }}>
						<Image style={ iconStyle } source={ icon } resizeMode="cover" />
						<Text style={{ fontSize: 30, color: themeColor }}>BAO</Text>
						<Text style={ [ textStyle, { color: titleColor } ] }>
								A pure RSS reader
						</Text>
					</ItemCard>
					<ItemCard style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
						<Text style={ [ textStyle, { color: '#777' } ] }>
							CONTACT
						</Text>
						<View style={ buttonContainerStyle }>
							<TouchableOpacity
								onPress={  this.onGithubPress } 
								style ={ buttonStyle }
							>
								<Icon 
									name={'logo-github'} 
									size={ 30 } 
									color={ titleColor }
								/> 
							</TouchableOpacity>
							<TouchableOpacity
								onPress={ this.onEmailPress }
								style ={ buttonStyle } 
							>
								<Icon 
									name={'ios-mail-outline'} 
									size={ 40 } 
									color={ titleColor }
								/> 
							</TouchableOpacity>
							<TouchableOpacity 
								onPress={  this.onBlogPress }
								style ={ buttonStyle }								
							>
								<Icon 
									name={'ios-person-outline'} 
									size={ 40 } 
									color={ titleColor }
								/> 							
							</TouchableOpacity>
						</View>
					</ItemCard>
				</ScrollView>
			</Container>
		)		
	}
}

const styles = StyleSheet.create({
	headerContainerStyle: {
		alignSelf: 'flex-start',
		paddingLeft: 22,
		paddingRight: 30,
		paddingTop: 10,
		paddingBottom: 10,
	},
	textStyle: {
		color:'#333',
		fontSize: 16, 
		lineHeight: 26,
	},
	buttonContainerStyle: {
		flexDirection: 'row',
		justifyContent: 'flex-start', 
		alignItems: 'center',
		alignSelf: 'center',
	},
	buttonStyle: {
		paddingLeft: 25
	},
    iconStyle: {
        width: 200,
        height: 200,
        margin: 30,
        marginBottom: height*0.09
    }
})

const mapStateToProps = state => {
	return {
		titleColor: state.themes.titleColor,
		themeColor: state.themes.themeColor,
        icon: state.themes.icon
	};
};

export default connect(mapStateToProps)(About);
