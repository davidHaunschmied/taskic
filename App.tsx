import React from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import QuickStats from './components/QuickStats';
import TaskList from './components/TaskList';

export default function App() {
    return (
        <SafeAreaView style={styles.container}>
            <QuickStats/>
            <View style={styles.header}>
                <Text style={styles.headerText}>Deine Aufgaben für heute</Text>
            </View>
            <TaskList/>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flex: 1
    },
    headerText: {
        fontSize: 20
    }
});
