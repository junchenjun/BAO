import React, { Component } from 'react';
import { View, StatusBar, Dimensions, StyleSheet, SafeAreaView } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { BottomAlert } from './BottomAlert';

const { height } = Dimensions.get('window');

class Container extends Component {
	renderMsg() {
		if ( this.props.errorMsg ) {
			return (
				<BottomAlert>{ this.props.errorMsg }</BottomAlert>
			);
		}
	}
	render() {
		const { children, style, containerBackgroundColor, barStyle } = this.props;
		return(
			<SafeAreaView style={{ flex: 1, backgroundColor: containerBackgroundColor }}>
				<View 
					style = { [ styles.containerStyle, { backgroundColor: containerBackgroundColor }, style ] }
				>
					<StatusBar
						hidden = { false } 
						backgroundColor = { containerBackgroundColor }
						translucent = { false }
						barStyle = { barStyle }
						showHideTransition = { "fade" }
					/>
					{ children }
					{ this.renderMsg() }
				</View>
			</SafeAreaView>
		)
	}
}

const styles = StyleSheet.create({
	containerStyle: {
		position: 'relative',
		flex: 1
	}
})

const mapStateToProps = state => {
	return { 
		containerBackgroundColor: state.themes.containerBackgroundColor,
		barStyle: state.themes.barStyle,
		errorMsg: state.error.errorMsg
	};
};

Container = connect(mapStateToProps)(Container);

export { Container };