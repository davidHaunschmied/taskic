import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {Task} from '../model/task';

export default function TaskItem(props: { item: Task }) {
    return (
        <View style={styles.container}>
            <View style={styles.prio}>
                <Text>
                    {props.item.prio}
                </Text>
            </View>
            <View style={styles.content}>
                <Text>
                    {props.item.desc}
                </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container : {
        width: 300,
        height: 50,
        borderWidth: 1,
        borderRadius: 10,
        justifyContent: 'space-around',
        alignItems: 'center',

        flexDirection: 'row'
    },
    prio: {
        // TODO some flexing
    },
    content: {
        // TODO some flexing
    }
});
