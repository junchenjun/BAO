import { Actions } from 'react-native-router-flux';
import { 
	SWITCH_THEMES
} from './types';

export const switchThemes = () => {
	return ({
		type: SWITCH_THEMES
	})
}