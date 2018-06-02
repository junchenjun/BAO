import React, { PureComponent } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Dimensions, StyleSheet, Image } from 'react-native';
import { connect } from 'react-redux';
import { Container, Confirm } from './common';
import { Actions } from 'react-native-router-flux';
import LoginForm from './LoginForm'; 
import Icon from 'react-native-vector-icons/Ionicons';
import { logOut, switchThemes } from '../actions';

const { width, height } = Dimensions.get('window');

class Drawer extends PureComponent {

    constructor(props){
        super(props);
        this.state = { showModal: false};
        this.onLogOutButtonPress = this.onLogOutButtonPress.bind(this);
        this.onAccept = this.onAccept.bind(this);
        this.onDecline = this.onDecline.bind(this);
        this.onSwitchThemesPress = this.onSwitchThemesPress.bind(this)
    }

    onAccept() {
        this.props.logOut();
        this.setState({ showModal: false });
    }

    onDecline() {
        this.setState({ showModal: false });
    }

    onLogOutButtonPress() {
        this.setState({ showModal: true })
    }

    onSwitchThemesPress() {
        this.props.switchThemes()
    }

    onHomePress() {
        Actions.drawerClose()
    }

    onAboutPress() {
        Actions.push('About')
    }

    onLoginPress() {
        Actions.LoginForm()
    }

    renderUserStatus() {
        const {
            userInfoContainerStyle,
            userInfoTextStyle,
            logInIconStyle
        } = styles;
        const { currentUser, themeColor, borderColor } = this.props;

        if (currentUser) {
            return (
                <View style={ [ styles.userInfoContainerStyle, { borderColor: borderColor } ] }>
                    <Text style={ [ styles.userInfoTextStyle, { color: themeColor } ] } >
                        { currentUser.attributes.username }
                    </Text>
                </View>
            );  
        } 

        else {
            return (
                <View >
                    <TouchableOpacity 
                        onPress={ this.onLoginPress  } 
                        style = { [ styles.userInfoContainerStyle, { borderColor: borderColor } ] }
                        activeOpacity={ 0.5 }
                    >
                        <Text style={ [ styles.userInfoTextStyle, { color: themeColor } ] }>
                            Log In
                        </Text>
                        <Icon name={ 'ios-log-in-outline' } size={ 30 } color={ themeColor } style = { logInIconStyle } />
                    </TouchableOpacity>
                </View>
            );
        }
    }

    renderAfterLoggedIn() {
        const {
            containerStyle,
            textStyle
        } = styles;
        const { titleColor } = this.props;
        if (this.props.currentUser) {
            return (
                <View>
                    <View>
                        <TouchableOpacity  style={ containerStyle } onPress={ this.onSwitchThemesPress } activeOpacity={ 0.5 }>    
                            <Text style={ [ textStyle, { color: titleColor } ] }>Switch themes</Text>
                        </TouchableOpacity>
                    </View>    
                    <View>
                        <TouchableOpacity  style={ containerStyle } onPress={ this.onLogOutButtonPress } activeOpacity={ 0.5 }>  
                            <Text style={ [ textStyle, { color: titleColor } ] }>Log out</Text>
                        </TouchableOpacity>
                    </View>
                    <Confirm
                        visible={ this.state.showModal }
                        onAccept={ this.onAccept }
                        onDecline={ this.onDecline }
                    >
                        <Text>Log Out</Text>
                    </Confirm>
                </View>
            );             
        }
    }

    render() {
        const {
            containerStyle,
            textStyle,
            iconStyle
        } = styles;
        const { titleColor, icon } = this.props;
        return(
            <Container>
                <ScrollView>
                    { this.renderUserStatus() }
                    <View>
                         <TouchableOpacity  style={ containerStyle } onPress={ this.onHomePress } activeOpacity={ 0.5 }>    
                            <Text style={ [ textStyle, { color: titleColor } ] }>Home</Text>
                        </TouchableOpacity>
                    </View>
                    { this.renderAfterLoggedIn() }
                    <View>
                        <TouchableOpacity  style={ containerStyle } onPress={ this.onAboutPress } activeOpacity={ 0.5 }>  
                            <Text style={ [ textStyle, { color: titleColor } ] }>About</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
                <View>
                    <Image style={ iconStyle } source={ icon } resizeMode="cover" />
                </View>
            </Container>
        );
    };
};

const styles = StyleSheet.create({
    userInfoContainerStyle:{
        marginTop: height*0.15,
        marginBottom: height*0.17,
        marginLeft: 10,
        marginRight: 10,
        paddingLeft: 15,
        paddingBottom: height*0.05,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1
    },
    userInfoTextStyle:{
        fontSize: 30,
    },
    logInIconStyle: {
        marginLeft: 7,
        marginTop: 6
    },
    containerStyle:{
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        margin: 10,
        marginLeft: 30,
        width: 150,
        flex:1,
    },
    textStyle: {
        color: '#444',
        fontSize: 16
    },
    iconStyle: {
        width: 35,
        height: 35,
        position: 'absolute',
        bottom: 30,
        right: 30,
    }
})

const mapStateToProps = state => {
    return { 
        currentUser: state.auth.currentUser,
        themeColor: state.themes.themeColor,
        titleColor: state.themes.titleColor,
        borderColor: state.themes.borderColor,
        icon: state.themes.icon
    } ;
};

export default connect(mapStateToProps, { logOut, switchThemes })(Drawer);