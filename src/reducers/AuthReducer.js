import { 
	CURRENT_USER,
	USERNAME_CHANGED,
	PASSWORD_CHANGED,
	EMAIL_CHANGED,
	LOGIN_USER_SUCCESS,
	LOGIN_USER_FAIL,
	LOGOUT_SUCCESS,
	RESET,
	LOADING,
} from '../actions/types';

const INITIAL_STATE = { 
	username: '',
	password: '',
	email: '',
	currentUser: '',
	loading: false,
	currentForm: 'logInForm',
};

export default (state = INITIAL_STATE, action) => {

	switch (action.type) {
		case USERNAME_CHANGED:
			return { ...state, username: action.payload };

		case PASSWORD_CHANGED:
			return { ...state, password: action.payload };

		case EMAIL_CHANGED:
			return { ...state, email: action.payload };

		case LOGIN_USER_SUCCESS:
			return { ...state, ...INITIAL_STATE, currentUser: action.payload };

		case LOGIN_USER_FAIL:
			return { ...state, loading: false, username: '', password: '', email: ''}

		case LOGOUT_SUCCESS:
			return INITIAL_STATE;

		case CURRENT_USER:
			return { ...state, ...INITIAL_STATE, currentUser: action.payload };

		case RESET:
			return { ...state, username: '', password: '', email: '', loading: false, currentForm: action.payload };

		case LOADING:
			return { ...state, loading: true };

		default:
			return state;
	}
};