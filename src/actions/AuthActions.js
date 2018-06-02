import AV from 'leancloud-storage'; 
import { Actions } from 'react-native-router-flux';
import { 
	CURRENT_USER,
	USERNAME_CHANGED,
	PASSWORD_CHANGED,
	LOGIN_USER_SUCCESS,
	LOGIN_USER_FAIL,
	RESET,
	EMAIL_CHANGED,
	LOGOUT_SUCCESS,
	LOADING,
	ERROR_MESSAGE,
	CLEAR_ERROR
} from './types';

export const reset = (currentForm) => {
	return {
		type: RESET,
		payload: currentForm
	}
}

export const currentUserCheck = (currentUser) => {
	return (dispatch) => {
		if (currentUser) {
			currentUserChecked(dispatch, currentUser);
		}
	}
}

export const currentUserChecked = (dispatch, user) =>{
	dispatch({
		type: CURRENT_USER,
		payload: user
	})
}

export const usernameChanged = (text) => {
	return {
		type: USERNAME_CHANGED,
		payload: text
	};
};

export const passwordChanged = (text) => {
	return {
		type: PASSWORD_CHANGED,
		payload: text
	}
};

export const emailChanged = (text) => {
	return {
		type: EMAIL_CHANGED,
		payload: text
	}
}

export const logInUser = ({ username, password }) => {
	return (dispatch) => {
		dispatch({ type: LOADING });
		if ( username === '' || password === '' ) {
			loginUserFail(dispatch);
			authErrorMessage(dispatch, "error");
		}
		AV.User.logIn(username, password)
			.then(user => {
				loginUserSuccess(dispatch, user)
			})
			.catch((error) => {
				authErrorMessage(dispatch, "error") 
				loginUserFail(dispatch);
			});
	};
};

export const signUpUser = ({ username, email, password }) => {
	return (dispatch) => {
		dispatch({ type: LOADING });
		if ( username == '' || email == '' || password == '') {
			loginUserFail(dispatch);
			authErrorMessage(dispatch, "error");
		} 
		else {
			let user = new AV.User();
			const RSSFeeds = [];
			user.setUsername(username);
			user.setPassword(password);
			user.setEmail(email);

			user.signUp()
				.then( user => {
					user.set('RSSFeeds', RSSFeeds);
					user.save()
						.then(() => loginUserSuccess(dispatch, user) )
						.catch(() => {
							loginUserFail(dispatch);
							authErrorMessage(dispatch, "error") 
						})
				})
				.catch( () => {
					loginUserFail(dispatch);
					authErrorMessage(dispatch, "error") 
				});
		}
	}
}

export const logOut = () => {
	return (dispatch) => {
		AV.User.logOut()
			.then( () => logOutSuccess(dispatch) )
			.catch( () => authErrorMessage(dispatch, "error") )
	}
}

export const logOutSuccess = (dispatch) => {
	Actions.pop({refresh: {test: Math.random()}})
	dispatch({
		type: LOGOUT_SUCCESS
	});
}

const loginUserSuccess = (dispatch, user) => {
	Actions.pop({refresh: {test: Math.random()}})
	dispatch({
		type: LOGIN_USER_SUCCESS,
		payload: user
	});
};

const loginUserFail = (dispatch) => {
	dispatch({
		type: LOGIN_USER_FAIL
	})
}

const authErrorMessage = (dispatch, error) => {
	dispatch({
		type: ERROR_MESSAGE,
		payload: error
	})
}

export const clearError = () => {
	return {
		type: CLEAR_ERROR 
	}
}




