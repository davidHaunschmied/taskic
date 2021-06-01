import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {InfoScreen} from '../screens/InfoScreen';

const Stack = createStackNavigator();

export default function Info() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="InfoScreen" options={{title: 'Stats and information'}} component={InfoScreen}/>
        </Stack.Navigator>
    );
}

