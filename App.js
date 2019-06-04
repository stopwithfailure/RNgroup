import province_navigator from './pages/province';
import city_navigator from './pages/city';
import details_navigator from './pages/details';
import { createStackNavigator, createAppContainer } from 'react-navigation';

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