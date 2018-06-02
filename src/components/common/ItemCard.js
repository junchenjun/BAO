import React, { PureComponent } from 'react';
import { View, Dimensions, Text, StyleSheet } from 'react-native';
import ElevatedView from 'react-native-elevated-view';
import { connect } from 'react-redux';

const cardWidth = Dimensions.get('window').width*0.9;

class ItemCard extends PureComponent {
	render() {
		const { children, elevation = 3, style, itemCardBackgroundColor } = this.props;
		return (
			<ElevatedView 
				style = { [ styles.cardStyle, { backgroundColor: itemCardBackgroundColor }, style ] } 
				elevation={ elevation }
			>
				{ children }
			</ElevatedView>
		)
	}
}
const styles = StyleSheet.create({
	cardStyle:{
		width: cardWidth,
		padding: 9,
		paddingLeft: 14,
		paddingRight: 14,
		justifyContent: 'center',
		flexDirection: 'row',
		alignSelf: 'center',
		margin: 4,
		marginTop: 2,
		borderRadius: 2			
	}
})


const mapStateToProps = state => {
	return { 
		itemCardBackgroundColor: state.themes.itemCardBackgroundColor,
	};
};

ItemCard = connect(mapStateToProps)(ItemCard);

export { ItemCard };