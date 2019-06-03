import province_navigator from './pages/province';
import city_navigator from './pages/city';
import details_navigator from './pages/details';
import { createStackNavigator, createAppContainer } from 'react-navigation';

//this can change the fetch url
const URL = "http://10.12.33.161/api/api.php?";			//campus network
// const URL="http://245786ka89.zicp.vip/api/api.php?"; //internet

//TabNavigator
const RootTabs = createStackNavigator({
	province: {
		screen: province_navigator,
	},
	city: {
		screen: city_navigator,
	},
	details: {
		screen: details_navigator,
	}
});

const App = createAppContainer(RootTabs);
export default App;
