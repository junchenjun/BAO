import { 
	SWITCH_THEMES
} from '../actions/types';

const LIGHT = {
	name: 'light',
	containerBackgroundColor: '#E9E9EF',
	themeColor: '#000',
	itemCardBackgroundColor: '#FCFCFC',
	titleColor: '#333',
	bigTitleColor: '#555',
	borderColor: '#eee',
	headerTitleColor: '#aaa',
	barStyle: "dark-content",
	msgBackgroundColor: '#D2D3D8',
	msgBorderColor: '#D9DADE',
	icon: require("../assets/imgs/icon_light.png")
}

const DARK = {
	name: 'dark',
	containerBackgroundColor: '#242424',
	themeColor: '#ddd',
	itemCardBackgroundColor: '#313131',
	titleColor: '#aaa',
	bigTitleColor: '#aaa',
	borderColor: '#2D2C2E',
	headerTitleColor: '#343336',
	barStyle: "light-content",
	msgBackgroundColor: '#131314',
	msgBorderColor: '#000',
	icon: require("../assets/imgs/icon_dark.png")
}

export default (state = LIGHT, action) => {
	switch (action.type) {
		
		case SWITCH_THEMES:
			if (state.name == 'light') {
				state = DARK;
				global.storage.save({
					key: 'theme',
					data: 'dark',
				});
			}
			else {
				state = LIGHT;
				global.storage.save({
					key: 'theme',
					data: 'light',
				});
			};

		default:
			return state;
	}
};