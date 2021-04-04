import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Ionicons} from '@expo/vector-icons';

export default function QuickStats() {
    return (
        <View style={styles.container}>
            <View style={styles.stat}>

                <Ionicons name={'build-outline' as any} size={20} color={'limegreen'}/>
                <Text style={{marginLeft: 5}}>
                    Ø 3.2/day
                </Text>
            </View>
            <View style={styles.stat}>
                <Ionicons name={'today' as any} size={20} color={'gold'}/>
                <Text style={{marginLeft: 5}}>
                    6 days finished
                </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingBottom: 10,
        borderBottomWidth: 2,
        borderBottomRightRadius: 20,
        borderBottomLeftRadius: 20,
    },
    stat: {
        flexDirection: 'row',
    }
});
