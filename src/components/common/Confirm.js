import React, { PureComponent } from 'react';
import { Text, View, TouchableOpacity, Dimensions, StyleSheet } from 'react-native';
import Modal from "react-native-modal";

const width = (Dimensions.get('window').width-300)/2;

class Confirm extends PureComponent {
	render() {
		return (
			<Modal
				animationIn="fadeInUpBig"
				animationOut="fadeOutDownBig"
				isVisible={ this.props.visible }
				style={{ position:'relative', margin:0 }}
				onBackButtonPress= { this.props.onDecline }
				onBackdropPress={ this.props.onDecline }
				hideModalContentWhileAnimating = { true }
			>	
				<TouchableOpacity activeOpacity={ 0.5 } onPress={ this.props.onAccept } style={ styles.yesButtonStyle } >
					<Text style={ styles.yesTextStyle }>
						{ this.props.children }
					</Text>
				</TouchableOpacity>
				<TouchableOpacity activeOpacity={ 0.5 } onPress={ this.props.onDecline } style={ styles.noButtonStyle } >
					<Text style={ styles.noTextStyle }>
						Cancel
					</Text>
				</TouchableOpacity>
			</Modal>
		);
	}
}

const styles = StyleSheet.create({
	yesButtonStyle: {
		position: 'absolute',
		bottom: 88,
		left: width,
		right: 0,
		height: 45,
		width: 300,
		backgroundColor:'#FCFCFC',
		borderRadius: 25,
		borderWidth: 1,
		borderColor: 'transparent',
		justifyContent: 'center',
	},
	yesTextStyle:{
		alignSelf: 'center',
		color: 'red',
		fontSize: 18,
	},
	noButtonStyle:{
		position: 'absolute',
		bottom: 35,
		left: width,
		right: 0,
		height: 45,
		width: 300,
		borderRadius: 25,
		borderWidth: 1,
		borderColor: 'transparent',
		backgroundColor:'#FCFCFC',
		justifyContent: 'center',
	},
	noTextStyle:{
		alignSelf: 'center',
		color: '#000',
		fontSize: 18,
	}
});

export { Confirm };