import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';

timeCal = (str) => { 
    let tempStrs = str.split(" ");
    let dateStrs = tempStrs[0].split("-");
    let year = parseInt(dateStrs[0], 10);
    let month = parseInt(dateStrs[1], 10) - 1;
    let day = parseInt(dateStrs[2], 10);
    let timeStrs = tempStrs[1].split(":");
    // rss2json api is in 0 time zone 
    let hour = parseInt(timeStrs [0], 10) + 8;
    let minute = parseInt(timeStrs[1], 10);
    let second = parseInt(timeStrs[2], 10);
    let date = new Date(year, month, day, hour, minute, second);
    let NowDate = new Date();

    let diff = NowDate - date; 

    let diffDays=Math.floor(diff/(24*3600*1000));
    
    if (diffDays >= 1) {
        return diffDays + 'd';
    }

    let diffHours=Math.floor(diff/(3600*1000));

    if (diffHours >= 1) {
        return diffHours + 'h';
    }

    let diffMinutes=Math.floor(diff/(60*1000));

    if (diffMinutes >= 0) {
        return diffMinutes + 'm';
    }


};

class Timer extends Component {
	render() {
		return (
			<View>
				<Text style={ styles.timerStyle }>
				    { timeCal(this.props.children) }
				</Text>
			</View>
		);
	}
}

const styles = StyleSheet.create({
    timerStyle:{
        textAlign: 'right', 
        color: '#777', 
        fontSize: 12
    }
});

export { Timer };