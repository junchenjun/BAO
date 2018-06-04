import React, { PureComponent } from 'react';
import AV from 'leancloud-storage'; 
import { connect } from 'react-redux';
import { Text, View, Dimensions, Easing, Animated } from 'react-native';
import { Scene, Router, Stack, Actions, Tabs } from 'react-native-router-flux';
import CardStackStyleInterpolator from 'react-navigation/src/views/CardStack/CardStackStyleInterpolator';
import Feeds from './components/Feeds';
import FeedDetail from './components/FeedDetail';
import ArticleDetail from './components/ArticleDetail';
import AddFeed from './components/AddFeed';
import About from './components/About';
import Drawer from './components/Drawer';
import LoginForm from './components/LoginForm';
import { currentUserCheck, switchThemes } from './actions';
import Icon from 'react-native-vector-icons/Ionicons';
import SplashScreen from 'react-native-splash-screen'

const { width } = Dimensions.get('window');

class RouterComponent extends PureComponent {

	componentWillMount() {
		global.storage.load({ key: 'theme' })
			.then(theme => {
				if (theme == 'dark') this.props.switchThemes();
			});
		AV.User.currentAsync()
			.then((currentUser)=>{
				this.props.currentUserCheck(currentUser);
			})
	}

	componentDidMount() {
		this.timer = setTimeout(() => {
        	SplashScreen.hide();
		}, 1200);
    }

	componentWillUnmount() {
    	clearTimeout(this.timer);
  	}

	render() {
		return (
			<Router>
				<Drawer 
					key={ 'Drawer' } 
					drawer={ true } 
					contentComponent={ Drawer } 
					drawerWidth={ width*0.7 } 
					drawerPosition={ 'left' }
					tapToClose={ true }
				>
					<Stack
						key="root" 
						hideNavBar 
						hideTabBar
						transitionConfig={ () => ({  
							transitionSpec: {
								duration: 450,
								easing: Easing.in(Easing.bezier(0.2833, 0.99, 0.31833, 0.99)),
								timing: Animated.timing,
	        				},
	        				screenInterpolator: CardStackStyleInterpolator.forHorizontal 
	        			}) }
						gestureResponseDistance={{ horizontal: 50 }}
						gesturesEnabled={ true }
					>
						<Scene key="Feeds" component={ Feeds }  initial />
                		<Scene key="FeedDetail" component={ FeedDetail }  drawerLockMode='locked-closed'/>
						<Scene key="ArticleDetail" component={ ArticleDetail }  drawerLockMode='locked-closed'/>
						<Scene key="LoginForm" component={ LoginForm } gesturesEnabled={ false } drawerLockMode='locked-closed'/>
						<Scene key="About" component={ About } drawerLockMode='locked-closed'/>
						<Scene key="AddFeed" component={ AddFeed } gesturesEnabled={ false } drawerLockMode='locked-closed'/>							
					</Stack>
        		</Drawer>
			</Router>
		);
	}
};

export default connect( null, {currentUserCheck, switchThemes } )(RouterComponent);


