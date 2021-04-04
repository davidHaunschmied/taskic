import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {TaskScreen} from '../screens/TaskScreen';
import {AddTaskScreen} from '../screens/AddTaskScreen';

const Stack = createStackNavigator();

export default function Home() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="TaskScreen" options={{title: 'Taskic - The Ivy Lee method'}} component={TaskScreen}/>
            <Stack.Screen name="AddTask" options={{title: 'Add task'}} component={AddTaskScreen}/>
        </Stack.Navigator>
    );
}

