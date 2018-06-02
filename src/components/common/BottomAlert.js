import React, { PureComponent } from 'react';
import { View, Text, Dimensions, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { clearError } from '../../actions';

const { width, height } = Dimensions.get('window');

class BottomAlert extends PureComponent {
	componentWillMount() {
		this.timer = setTimeout(() => {
			this.props.clearError()
		}, 1500);
  	}

	componentWillUnmount() {
    	clearTimeout(this.timer);
  	}

	render() {
		const { msgBackgroundColor, themeColor, msgBorderColor } = this.props;
		return(
			<View style={ [ styles.containerStyle, { backgroundColor: msgBackgroundColor, borderColor: msgBorderColor } ] } >
				<Text style={ [ styles.textStyle, { color: themeColor } ] }>{ this.props.children }</Text>
			</View>
		);		
	}
};

const styles = StyleSheet.create({
	containerStyle: {
		position: 'absolute',
		bottom: 0,
		width: width,
		height: height*0.1,
		justifyContent: 'center',
		borderTopWidth: 1,
		borderColor: '#000000'
	},
	textStyle:{
		alignSelf: 'center',
		fontSize: 16
	}
});

const mapStateToProps = state => {
	return { 
		themeColor: state.themes.themeColor,
		msgBackgroundColor: state.themes.msgBackgroundColor,
		msgBorderColor: state.themes.msgBorderColor
	};
};

BottomAlert = connect(mapStateToProps, { clearError })(BottomAlert);

export { BottomAlert }







