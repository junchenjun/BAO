import React, { PureComponent } from 'react';
import { TextInput, View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

class Input extends PureComponent {
	render() {
		const { label, value, onChangeText, placeholder, secureTextEntry, editable, maxLength, titleColor, themeColor } = this.props;
		const { inputStyle, labelStyle, containerStyle } = styles;

		if (label) {
			return (
				<View style={ containerStyle }>

					<Text style={ labelStyle }>{ label }</Text>

					<TextInput
						secureTextEntry={ secureTextEntry }
						autoCapitalize="none"
						placeholder={ placeholder }
						autoCorrect={ false }
						style={ [ inputStyle, { color: titleColor } ] }
						value={ value }
						onChangeText={ onChangeText }
						editable = { editable }
						maxLength = { maxLength }
						selectionColor = { themeColor }
						clearButtonMode = "while-editing"
						textAlignVertical = "center"
						underlineColorAndroid = "transparent"
					/>
				</View>
			);		
		}
		else {
			return(
				<View style={ containerStyle }>
					<TextInput
						secureTextEntry={ secureTextEntry }
						autoCapitalize="none"
						placeholder={ placeholder }
						autoCorrect={ false }
						style={ [ inputStyle, { color: titleColor } ] }
						value={ value }
						onChangeText={ onChangeText }
						editable = { editable }
						maxLength = { maxLength }
						selectionColor = { themeColor }
						clearButtonMode = "while-editing"
						textAlignVertical = "center"
						underlineColorAndroid = "transparent"
					/>
				</View>
			)
		}
	}
};

const styles = StyleSheet.create({
	inputStyle:{
		paddingRight: 5,
		paddingLeft: 5,
		fontSize: 14,
		flex: 8,
		alignSelf:'center'
	},
	labelStyle: {
		fontSize: 18,
		paddingLeft: 10,
		flex: 1,
		alignSelf: 'center'
	},
	containerStyle: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'flex-start',
		minHeight: 42
	}
});

const mapStateToProps = state => {
	return { 
		titleColor: state.themes.titleColor,
		themeColor: state.themes.themeColor,
	};
};

Input = connect(mapStateToProps)(Input);

export { Input }; 
