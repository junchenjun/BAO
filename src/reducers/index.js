import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import FeedsReducer from './FeedsReducer';
import ErrorReducer from './ErrorReducer';
import ColorReducer from './ColorReducer';

export default combineReducers({
	auth: AuthReducer,
	feed: FeedsReducer,
	error: ErrorReducer,
	themes: ColorReducer
});