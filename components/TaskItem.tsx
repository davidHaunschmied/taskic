import React from 'react';
import {Dimensions, GestureResponderEvent, Image, StyleSheet, Text, View} from 'react-native';
import {Task} from '../model/task';
import {CheckBox} from 'react-native-elements';
import {Ionicons} from '@expo/vector-icons';

interface Props {
    task: Task;
    prio: number;
    isDayStarted: boolean;
    isDayFinished: boolean;

    handleTaskStateToggled(id: string, e: GestureResponderEvent): void;
}

interface State {
}

export class TaskItem extends React.Component<Props, State> {
    constructor(public props: Props | Readonly<Props>) {
        super(props);
    }

    render() {
        return (
            <View style={[styles.container, this.props.task.done ? styles.done : styles.open]}>
                <View style={styles.prio}>
                    {
                        this.props.prio === 1 ? <Image source={require('../assets/images/frog.png')}/>
                            : <Text> {this.props.prio}</Text>
                    }
                </View>
                <View style={styles.content}>
                    <Text>
                        {this.props.task.desc}
                    </Text>
                </View>

                <View style={styles.action}>
                    {
                        // TODO: Find a better icon
                        !this.props.isDayStarted &&
                        <Ionicons name={'move-outline' as any} size={16} style={{alignSelf: 'center'}}/>

                    }
                    {
                        (this.props.isDayStarted && !this.props.isDayFinished) &&
                        <CheckBox checked={this.props.task.done}
                                  onPress={e => this.props.handleTaskStateToggled(this.props.task.id, e)}
                        />
                    }
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: Dimensions.get('window').width - 50,
        height: 55,
        borderWidth: 1,
        borderRadius: 5,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'center',

        // shadow
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 7,
        },
        shadowOpacity: 0.2,
        shadowRadius: 2,

        elevation: 3,
    },
    done: {
        opacity: 0.3
    },
    open: {
        opacity: 1
    },
    prio: {
        alignSelf: 'center',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    content: {
        alignSelf: 'center',
        flex: 3
    },
    action: {
        alignSelf: 'center',
        flex: 1
    }
});
