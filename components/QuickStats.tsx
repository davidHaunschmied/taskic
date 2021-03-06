import React from 'react';
import {View, StyleSheet, Text, Image} from 'react-native';

export default function QuickStats() {
    return (
      <View style={styles.container}>
          <View style={styles.stat}>
              <Image source={require('../assets/images/splash.png')} style={{height: 20, width: 20, backgroundColor: 'gold'}} />
              <Text style={{marginLeft: 5}}>
                  5 tasks left
              </Text>
          </View>
          <View style={styles.stat}>
              <Image source={require('../assets/images/splash.png')} style={{height: 20, width: 20, backgroundColor: 'limegreen'}} />
              <Text style={{marginLeft: 5}}>
                  1 task done
              </Text>
          </View>
      </View>
    );
};

const styles = StyleSheet.create({
    container : {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 10
    },
    stat: {
        flexDirection: 'row',
    }
});
