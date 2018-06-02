import {
	ERROR_MESSAGE,
	CLEAR_ERROR
} from '../actions/types';

const INITIAL_STATE = { 
	errorMsg: '',
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case ERROR_MESSAGE:
			return { errorMsg: action.payload };

		case CLEAR_ERROR:
			return { errorMsg: ''};

		default:
			return state;
	}
};