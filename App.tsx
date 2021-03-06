import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Ionicons} from '@expo/vector-icons';
import {StyleSheet} from 'react-native';
import Home from './tabs/Home';
import Info from './tabs/Info';
import Toast from 'react-native-fast-toast';

const Tab = createBottomTabNavigator();

export default function App() {
    return (
        <>
            <NavigationContainer>
                <Tab.Navigator sceneContainerStyle={styles.nav} screenOptions={({route}) => ({
                    tabBarIcon: ({focused, size, color}) => {

                        let iconName: any;
                        // https://icons.expo.fyi/
                        switch (route.name) {
                            case 'Info':
                                iconName = 'information-circle-outline';
                                break;
                            default:
                                iconName = 'home-outline';
                        }
                        return <Ionicons name={iconName} size={size} color={color}/>;
                    }
                })}
                >
                    <Tab.Screen name={'Home'} component={Home}/>
                    <Tab.Screen name={'Info'} component={Info}/>
                </Tab.Navigator>
            </NavigationContainer>
            <Toast ref={(ref) => global['toast'] = ref}/>
        </>
    );
}

const styles = StyleSheet.create({
    nav: {
        backgroundColor: 'white'
    }
});
