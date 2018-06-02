import React, { PureComponent } from 'react';
import { Dimensions, Linking, Text, StyleSheet } from 'react-native';
import HTML from 'react-native-render-html';
import { connect } from 'react-redux';

const { width } = Dimensions.get('window');
const articleWidth = width*0.93;

class HTMLContent extends PureComponent {
	render() {
		const { html, itemCardBackgroundColor, titleColor, themeColor } = this.props;
		return(
			<HTML 
				html = { html } 
				imagesMaxWidth = { articleWidth } 
				allowedStyles = { [] }
				tagsStyles = {{
					p: {
						marginBottom: 6,
						marginTop: 6
					},
					a: {
						textDecorationLine: 'underline',
						textDecorationColor: themeColor,
						color: titleColor,
					},
					h1: {
						fontSize: 20,
						fontWeight: 'bold',
						marginBottom: 6,
						marginTop: 6,
						lineHeight: 35
					},
					h2: {
						fontSize: 20,
						fontWeight: 'bold',
						marginBottom: 6,
						marginTop: 6,
						lineHeight: 35
					},
					h3: {
						fontSize: 20,
						fontWeight: 'bold',
						marginBottom: 6,
						lineHeight: 35,
						marginTop: 6
					},
					h4: {
						fontSize: 20,
						fontWeight: 'bold',
						marginBottom: 6,
						lineHeight: 35,
						marginTop: 6
					},
					h5: {
						fontSize: 20,
						fontWeight: 'bold',
						marginBottom: 6,
						lineHeight: 35,
						marginTop: 6
					},
					h6: {
						fontSize: 20,
						fontWeight: 'bold',
						marginBottom: 6,
						lineHeight: 35,
						marginTop: 6
					},
					img: {
						marginBottom: 7,
						marginTop: 7,
						transform:[{translateX:-12}],
						width: 0,
						height: 0
					},
					iframe: {
						marginBottom: 7,
						marginTop: 7,
						transform:[{translateX:-12}],		
					}
				}}
				containerStyle = {{
					backgroundColor: itemCardBackgroundColor,
					width: articleWidth,
					padding: 12,
					paddingBottom: 20,
					paddingTop: 0					
				}}
				baseFontStyle = {{ 
					fontSize: 15, 
					lineHeight: 27, 
					color: titleColor,
					textAlign: 'left',
					paddingBottom: 5,
					fontFamily: 'Heiti SC',
					fontWeight: 'normal'
				}}
				textSelectable = { true }
				imagesInitialDimensions = {{ 
					width: articleWidth, 
					height: 270 
				}}
				staticContentMaxWidth = { articleWidth }
				ignoredTags = { ['br','hr'] }
				onLinkPress= { (evt, href) => Linking.openURL(href) }
				listsPrefixesRenderers = {{
					ul: (htmlAttribs, children, convertedCSSStyles, passProps) => {
					    return (
					        <Text style={{ color: titleColor, fontSize: 15, fontWeight:'bold', lineHeight: 27, paddingRight: 5 }}>·</Text>
					    );
					}
				}}
			/>
		)
	}
}

const mapStateToProps = state => {
	return { 
		themeColor: state.themes.themeColor,
		titleColor: state.themes.titleColor,
		itemCardBackgroundColor: state.themes.itemCardBackgroundColor
	};
};

HTMLContent = connect(mapStateToProps)(HTMLContent);

export { HTMLContent };