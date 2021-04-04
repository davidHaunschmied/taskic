import React from 'react';
import {SafeAreaView, Text} from 'react-native';
import {globalStyles} from '../styles/Styles';

export default function StatsScreen() {
    return (
        <SafeAreaView style={globalStyles.screenContainer}>
            <Text style={{textAlign: 'center'}}>You will see something here soon</Text>
        </SafeAreaView>
    );
}
