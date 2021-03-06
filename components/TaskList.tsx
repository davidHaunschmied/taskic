import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import TaskItem from './TaskItem';
import {Task} from '../model/task';

export default function TaskList() {
    return (
        <View style={styles.container}>

            <View style={{width: 50, height: 30, backgroundColor: 'limegreen'}}/>
            <View style={{width: 100, height: 30, backgroundColor: 'yellowgreen'}}/>
            <View style={{width: 200, height: 30, backgroundColor: 'gold'}}/>

            <FlatList
                data={data} renderItem={item => <TaskItem item={item.item}/>}
                keyExtractor={item => item.id}
                ItemSeparatorComponent={() => <View style={{marginBottom: 5}}/>}/>

            <View style={{width: 200, height: 30, backgroundColor: 'gold'}}/>
            <View style={{width: 100, height: 30, backgroundColor: 'yellowgreen'}}/>
            <View style={{width: 50, height: 30, backgroundColor: 'limegreen'}}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container:
        {
            flex: 10,
            flexDirection: 'column',
            justifyContent: 'space-around',
            alignItems: 'center'
        },
});

const data: Task[] = [
    {
        id: '1',
        desc: 'Create a quick info bar',
        prio: 1,
        done: true
    },
    {
        id: '2',
        desc: 'Build a nice list for the tasks',
        prio: 2,
        done: false
    },
    {
        id: '3',
        desc: 'Go shopping',
        prio: 3,
        done: false
    },
    {
        id: '4',
        desc: 'Chill',
        prio: 4,
        done: false
    },
    {
        id: '5',
        desc: 'Go shopping again',
        prio: 5,
        done: false
    },
    {
        id: '6',
        desc: 'Celebrate the life',
        prio: 6,
        done: false
    }
];
