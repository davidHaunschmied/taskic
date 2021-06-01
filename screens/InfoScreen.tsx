import React from 'react';
import {Linking, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {globalStyles} from '../styles/Styles';
import {getFinishedDaysCount, getFinishedProdDaysCount, getFinishedTasksCount} from '../services/task-service';

interface Props {
    navigation: any;
}

interface State {
    finishedTasksCount: number;
    finishedDaysCount: number;
    finishedProdDaysCount: number;
}

export class InfoScreen extends React.Component<Props, State> {
    private readonly _unsubscribe;

    constructor(public props: Props) {
        super(props);

        // initialize state
        this.state = {
            finishedTasksCount: 0,
            finishedDaysCount: 0,
            finishedProdDaysCount: 0
        };

        // load data
        Promise.all([getFinishedTasksCount(), getFinishedDaysCount(), getFinishedProdDaysCount()]).then(data => {
            this.setState({
                finishedTasksCount: data[0],
                finishedDaysCount: data[1],
                finishedProdDaysCount: data[2]
            });
        });

        // update data on screen enter
        this._unsubscribe = this.props.navigation.addListener('focus', () => {
            let isMounted = true;
            const loadData = async () => {
                const data = await Promise.all([getFinishedTasksCount(), getFinishedDaysCount(), getFinishedProdDaysCount()]);
                // do not update the state of unmounted components
                if (isMounted) {
                    this.setState({
                        finishedTasksCount: data[0],
                        finishedDaysCount: data[1],
                        finishedProdDaysCount: data[2]
                    })
                }
            }

            void loadData();

            return () => {
                isMounted = false;
            }
        });
    }

    componentWillUnmount() {
        this._unsubscribe();
    }

    render() {
        return (
            <SafeAreaView style={globalStyles.screenContainer}>
                <View style={styles.statsContainer}>
                    <View style={styles.statContainer}>
                        <Text style={styles.statName}>Overall productivity *</Text>
                        <Text
                            style={styles.statValue}>{Number(this.state.finishedProdDaysCount / this.state.finishedDaysCount * 100).toFixed(1)} %</Text>
                    </View>
                    <View style={styles.statContainer}>
                        <Text style={styles.statName}>Finished days</Text>
                        <Text style={styles.statValue}>{this.state.finishedDaysCount}</Text>
                    </View>
                    <View style={styles.statContainer}>
                        <Text style={styles.statName}>Total tasks done</Text>
                        <Text style={styles.statValue}>{this.state.finishedTasksCount}</Text>
                    </View>
                    <View style={styles.statContainer}>
                        <Text style={styles.statName}>Ø tasks per finished day</Text>
                        <Text
                            style={styles.statValue}>{Number(this.state.finishedTasksCount / this.state.finishedDaysCount).toFixed(1)}
                        </Text>
                    </View>
                </View>

                <View style={styles.infoContainer}>
                    <View style={styles.infoContent}>
                        <Text style={styles.infoContent}>* The overall productivity is calculated by dividing the number
                            of finished days on which at least one task was done through the number of total finished
                            days.
                        </Text>
                        <Text style={styles.infoContent}>
                            Open source project made with ❤ by&nbsp;
                            <Text style={{color: 'blue'}}
                                  onPress={() => Linking.openURL('https://github.com/davidHaunschmied/taskic')}>
                                davidHaunschmied/taskic
                            </Text>.
                        </Text>
                        <Text style={{...styles.infoContent, ...styles.italic}}>
                            Your data never leaves this device. This app requires no remote connection. If you
                            uninstall this app or clear the app's local storage, the data is removed.
                        </Text>
                    </View>
                </View>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    statsContainer: {
        flex: 1,
        backgroundColor: 'white',
        margin: 30,
        borderRadius: 20,
        borderColor: '#89DF8F',
        borderWidth: 3
    },
    statContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 20
    },
    statName: {
        flex: 3
    },
    statValue: {
        flex: 1,
        fontWeight: 'bold'
    },
    infoContainer: {
        flex: 1,
        flexDirection: 'column',
        margin: 10,
    },
    infoContent: {
        flex: 1,
        textAlign: 'center'
    },
    italic: {
        fontStyle: 'italic'
    }
});
