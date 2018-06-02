import React, { PureComponent } from 'react';
import { Text, View, TouchableOpacity, ActivityIndicator, BackHandler, StyleSheet } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Container, Input, ItemCard } from './common';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import { 
	usernameChanged, 
	passwordChanged, 
	emailChanged, 
	logInUser, 
	signUpUser, 
	reset,
} from '../actions';

const logIn = "logInForm";
const SignUp = 'SignUpForm';

class LoginForm extends PureComponent {

	constructor(props){
		super(props);
		this.onSignUpButtonPress = this.onSignUpButtonPress.bind(this);
		this.onLogInButtonPress = this.onLogInButtonPress.bind(this);
		this.onUsernameChange = this.onUsernameChange.bind(this);
		this.onPasswordChange = this.onPasswordChange.bind(this);
		this.onEmailChange = this.onEmailChange.bind(this);
	}

	componentWillMount() {
		BackHandler.addEventListener('hardwareBackPress', this.onBackAndroid);
	}

	componentWillUnmount() {
    	this.props.reset(logIn);
		BackHandler.removeEventListener('hardwareBackPress', this.onBackAndroid);
  	}

	onBackAndroid = () => {
		return this.props.loading? true: false;
	}

	onUsernameChange(text) {
		if (!this.props.loading) {
			this.props.usernameChanged(text);
		}
	}

	onPasswordChange(text) {
		if (!this.props.loading) {
			this.props.passwordChanged(text);
		}
	}

	onEmailChange(text) {
		if (!this.props.loading) {
			this.props.emailChanged(text);
		}
	}

	onLogInButtonPress(){
		if (!this.props.loading) {
			const { username, password } = this.props;
			this.props.logInUser({ username, password });
		}
	}

	onSignUpButtonPress(){
		if (!this.props.loading) {
			const { username, email ,password } = this.props;
			this.props.signUpUser({ username, email ,password });
		}
	}

	renderSignUpSubmit() {
		const {
			loadingStyle,
			loginBottonStyle
		} = styles;
		const { titleColor } = this.props;

		if (this.props.loading) {
			return(
				<View style={ loadingStyle } >
					<ActivityIndicator size="small" color={ titleColor }/>
				</View>				
			);
		} else {
			return(
				<TouchableOpacity onPress={ this.onSignUpButtonPress }>
					<Text style={ [ loginBottonStyle, { color: titleColor, borderColor: titleColor } ] } >
						Submit
					</Text>
				</TouchableOpacity>
			);
		}
	}

	renderLogInSubmit() {
		const {
			loadingStyle,
			loginBottonStyle
		} = styles;
		const { titleColor } = this.props;

		if (this.props.loading) {
			return(
				<View style={ loadingStyle } >
					<ActivityIndicator size="small" color={ titleColor }/>
				</View>				
			);
		} else {
			return(
				<TouchableOpacity onPress={ this.onLogInButtonPress }>
					<Text style={ [ loginBottonStyle, { color: titleColor, borderColor: titleColor } ] } >
						Log In
					</Text>
				</TouchableOpacity>
			);
		}
	}

	renderForm() {
		const {
			username,
			loading,
			password,
			email,
			titleColor,
		} = this.props;

		const {
			textStyle,
			bottonContainer,
			signupBottonStyle,
			inputCardStyle
		} = styles;

		if (this.props.currentForm === logIn) {
			return(
				<View style={{ width: 300, alignSelf: 'center' }} >
					<Text style={ [ textStyle, { color: titleColor } ] }>
						Log In
					</Text>
					
					<ItemCard style={ inputCardStyle }>
						<Input
							label = { <Icon name={'ios-contact-outline'} size={25} color={'grey'}/> } 
							placeholder = "username"
							onChangeText = { this.onUsernameChange }
							value = { username }
							editable = { !loading }
							autoCapitalize = "none"
							maxLength = { 10 }
						/>
					</ItemCard>

					<ItemCard style={ inputCardStyle }>
						<Input
							label = { <Icon name={'ios-lock-outline'} size={25} color={'grey'}/> } 
							placeholder="******"
							secureTextEntry
							onChangeText={ this.onPasswordChange }
							value={ password }
							editable= { !loading }
							autoCapitalize = "none"
							maxLength = { 15 }
						/>
					</ItemCard>
					

					<View style={ bottonContainer }>
						<TouchableOpacity onPress={ () => {
								if (!loading) {
									this.props.reset(SignUp);
								}
							} 
						}>
							<Text style={ signupBottonStyle }>
								Sign Up
							</Text>
						</TouchableOpacity>
						{ this.renderLogInSubmit() }
					</View>
				</View>		
			);			
		} 

		else{
			return (
				<View style={{width: 300, alignSelf: 'center'}}>
					<Text style={ [ textStyle, { color: titleColor } ] }>
						Sign Up
					</Text>

					<ItemCard style={ inputCardStyle }>
						<Input
							label = { <Icon name={'ios-contact-outline'} size={25} color={'grey'}/> } 
							placeholder="username"
							onChangeText={ this.onUsernameChange }
							value={ username }
							editable= { !loading }
							autoCapitalize = "none"
							maxLength = { 10 }
						/>
					</ItemCard>

					<ItemCard style={ inputCardStyle }>
						<Input
							label = { <Icon name={'ios-mail-outline'} size={25} color={'grey'}/> } 
							placeholder="user@user.com"
							onChangeText={ this.onEmailChange }
							value={ email }
							editable= { !loading }
							autoCapitalize = "none"
						/>
					</ItemCard>

					<ItemCard style={ inputCardStyle }>
						<Input
							label = { <Icon name={'ios-lock-outline'} size={25} color={'grey'}/> } 
							placeholder="******"
							secureTextEntry
							onChangeText={ this.onPasswordChange }
							value={ password }
							editable= { !loading }
							autoCapitalize = "none"
							maxLength = { 15 }
						/>
					</ItemCard>

					<View style={ bottonContainer }>
						<TouchableOpacity onPress={ () => {
								if (!loading) {
									this.props.reset(logIn);
								}
							} 
						}>
							<Text style={ signupBottonStyle }>
								Log In
							</Text>
						</TouchableOpacity>
						{ this.renderSignUpSubmit() }
					</View>
				</View>				
			);
		}
	}

	onBackPress() {
		Actions.pop()
	}

	renderBackButton() {
		const { themeColor } = this.props;
		const { backIconStyle } = styles;
		if (!this.props.loading) {
			return(
				<View>
					<TouchableOpacity onPress={ this.onBackPress } activeOpacity={ 0.5 }>
						<Icon name={ 'ios-close-outline' } size={ 60 } color={ themeColor } style={ backIconStyle } />
					</TouchableOpacity>
				</View>
			);
		} 
		else {
			return(
				<View>
					<Icon name={ 'ios-close-outline' } size={ 60 } color={ themeColor } style={ backIconStyle } />
				</View>
			)
		}
	}

	render() {
		return (
			<Container>

				{ this.renderBackButton() }

				{ this.renderForm() }

			</Container>
		);
	}
};

const styles = StyleSheet.create({
	bottonContainer:{
		width: 300,
		flexDirection: 'row',
		justifyContent: 'flex-end',
		marginTop: 15
	},
	loginBottonStyle:{
		fontSize: 14,
		color: 'purple',
		alignSelf: 'stretch',
		borderRadius: 4,
		borderWidth: 1,
		width: 70,
		marginRight: 7,
		paddingTop: 4,
		paddingBottom: 4,
		textAlign: 'center',
	},
	signupBottonStyle:{
		fontSize: 14,
		color: '#555',
		width: 65,
		paddingTop: 4,
		paddingBottom: 44,
	},
	textStyle:{
		fontSize: 40,
		alignSelf: 'flex-start',
		marginLeft: 10,
		marginBottom: 10,
	},
	loadingStyle: {
		alignSelf: 'stretch',
		width: 70,
		marginRight: 7,
		paddingTop: 4,
		paddingBottom: 4,
	},
	headerContainerStyle: {
		marginLeft: 12,
		marginBottom: 40,
		marginTop: 10
	},
	backIconStyle:{
		alignSelf: 'flex-end',
		marginRight: 40,
		marginTop: 20,
		marginBottom: 10
	},
	inputCardStyle: { 
		width: 290, 
		paddingLeft: 2, 
		paddingRight: 2, 
		padding: 2,
		marginTop: 4
	}
});

const mapStateToProps = state => {
	return {
		username: state.auth.username,
		password: state.auth.password,
		email: state.auth.email,
		user: state.auth.currentUser.attributes,
		loading: state.auth.loading,
		currentForm: state.auth.currentForm,
		currentForm: state.auth.currentForm,
		themeColor: state.themes.themeColor,
		titleColor: state.themes.titleColor
	};
};

export default connect(
	mapStateToProps, 
	{ 
		usernameChanged, 
		passwordChanged, 
		logInUser,
		signUpUser,
		reset,
		emailChanged,
	}
)(LoginForm);