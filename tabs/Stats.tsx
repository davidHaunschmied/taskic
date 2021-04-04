import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import StatsScreen from '../screens/StatsScreen';

const Stack = createStackNavigator();

export default function Stats() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="StatsScreen" options={{title: 'Stats'}}  component={StatsScreen}/>
        </Stack.Navigator>
    );
}

