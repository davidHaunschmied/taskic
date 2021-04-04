import React from 'react';
import {FlatList, GestureResponderEvent, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Task} from '../model/task';
import {TaskItem} from './TaskItem';
import {MAX_TASKS} from '../services/task-service';
import DraggableFlatList, {RenderItemParams} from 'react-native-draggable-flatlist';

interface Props {
    tasks: Task[];
    isDayStarted: boolean;
    isDayFinished: boolean;

    handleTaskStateToggled(id: string, e: GestureResponderEvent): void;

    handleTaskMoved(tasks: Task[]): void;
}

interface State {
}

export class TaskList extends React.Component<Props, State> {

    constructor(public props: Readonly<Props> | Props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={{flex: this.props.tasks.length}}>
                    {this.props.tasks.length < 1 &&
                        <Text>No tasks added yet.</Text>

                    }
                    {
                        // TODO: Code deduplication
                        this.props.isDayStarted &&
                        <FlatList data={this.props.tasks}
                                  keyExtractor={item => item.id}
                                  contentContainerStyle={{flexGrow: 1, justifyContent: 'space-around'}}
                                  renderItem={item =>
                                      <TaskItem task={item.item}
                                                prio={item.index + 1}
                                                isDayStarted={this.props.isDayStarted}
                                                isDayFinished={this.props.isDayFinished}
                                                handleTaskStateToggled={this.props.handleTaskStateToggled}/>}/>
                    }
                    {
                        !this.props.isDayStarted &&
                        <DraggableFlatList
                            data={this.props.tasks}
                            keyExtractor={item => item.id}
                            contentContainerStyle={{flexGrow: 1, justifyContent: 'space-around'}}
                            onDragEnd={params => this.props.handleTaskMoved(params.data)}
                            renderItem={({item, index, drag, isActive}: RenderItemParams<Task>) => {
                                return <TouchableOpacity onLongPress={drag}>
                                    <TaskItem task={item} prio={(index ? index : 0) + 1}
                                              isDayStarted={this.props.isDayStarted}
                                              isDayFinished={this.props.isDayFinished}
                                              handleTaskStateToggled={this.props.handleTaskStateToggled}/>
                                </TouchableOpacity>
                            }}/>
                    }


                </View>
                <View style={{flex: MAX_TASKS - this.props.tasks.length}}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 10,
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    taskListContainer: {
        flex: 12,
    }
});
