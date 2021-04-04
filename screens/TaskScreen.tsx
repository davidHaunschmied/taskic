import React from 'react';
import {GestureResponderEvent, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {globalStyles} from '../styles/Styles';
import {Button} from 'react-native-elements';
import {TaskList} from '../components/TaskList';
import {Task} from '../model/task';
import {
    getTasks,
    isDayFinished,
    isDayStarted,
    setIsDayFinished,
    setIsDayStarted,
    setTasks
} from '../services/task-service';

interface Props {
    navigation: any;
}

interface State {
    tasks: Task[];
    isDayStarted: boolean;
    isDayFinished: boolean;
}

export class TaskScreen extends React.Component<Props, State> {
    private readonly _unsubscribe;

    constructor(public props: Props) {
        super(props);

        this.state = {
            tasks: [],
            isDayStarted: false,
            isDayFinished: false
        };
        Promise.all([getTasks(), isDayStarted(), isDayFinished()]).then(data => {
            this.setState({
                tasks: data[0],
                isDayStarted: data[1],
                isDayFinished: data[2]
            });
        });
        this.updateTaskState = this.updateTaskState.bind(this);
        this.updateTasks = this.updateTasks.bind(this);
        this.startDay = this.startDay.bind(this);
        this.finishDay = this.finishDay.bind(this);
        this.startOver = this.startOver.bind(this);

        // update data on screen enter
        this._unsubscribe = this.props.navigation.addListener('focus', () => {
            let isMounted = true;
            const loadData = async () => {
                const data = await Promise.all([getTasks(), isDayStarted(), isDayFinished()]);
                // do not update the state of unmounted components
                if (isMounted) {
                    this.setState({
                        tasks: data[0],
                        isDayStarted: data[1],
                        isDayFinished: data[2]
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

    updateTaskState(id: string, e: GestureResponderEvent): void {
        this.setState((state, props) => {
            if (state.tasks === undefined) {
                console.error("Tasks are not defined");
                return {
                    tasks: []
                };
            }

            const updatedTasks = state.tasks.map(value => {
                if (value.id === id) {
                    value.done = !value.done;
                }
                return value;
            });
            setTasks(updatedTasks).then(() => console.log("Updated tasks in database"));

            return {
                tasks: updatedTasks
            };
        });
    }

    updateTasks(tasks: Task[]): void {
        this.setState((state, props) => {
            void setTasks(tasks).then();
            return {
                tasks: tasks
            }
        });
    }

    startDay(): void {
        this.setState((state, props) => {
            void setIsDayStarted(true).then();

            return {
                isDayStarted: true
            }
        });
    }

    finishDay(): void {
        this.setState((state, props) => {
            void setIsDayFinished(true).then();

            return {
                isDayFinished: true
            }
        });
    }

    startOver(): void {
        this.setState((state, props) => {
            const openTasks = state.tasks.filter(task => !task.done);

            void setTasks(openTasks).then();
            void setIsDayStarted(false).then();
            void setIsDayFinished(false).then();

            return {
                tasks: openTasks,
                isDayStarted: false,
                isDayFinished: false
            }
        });
    }

    render() {
        const tasks = this.state.tasks;
        let stateText;
        let actionButton;
        if (tasks?.length < 6) {
            stateText = 'Step 1/4: Plan the 6 most important tasks you want to get done tomorrow.'
            actionButton =
                <Button title="Add task 📝" type='solid'
                        onPress={() => this.props.navigation.navigate('AddTask')}/>
        } else if (!this.state.isDayStarted) {
            stateText = 'Step 2/4: Finalize your prioritization.'
            actionButton =
                <Button title="Start day 🚧" type='solid' onPress={this.startDay}/>
        } else if (!this.state.isDayFinished) {
            stateText = 'Step 3/4: Let\'s start! Focus on the top task in your list before moving to the next one.'
            actionButton =
                <Button title="Finish day 🍻" type='solid' onPress={this.finishDay}/>
        } else {
            stateText = 'Step 4/4: Done for today! 🎉 Celebrate what you have accomplished before starting over.'
            actionButton = <Button title="Repeat 🔁" type='solid' onPress={this.startOver}/>
        }
        return (
            <>
                <SafeAreaView style={globalStyles.screenContainer}>
                    <View style={styles.stateTextContainer}>
                        <Text style={{textAlign: 'center'}}>{stateText}</Text>
                    </View>
                    <TaskList tasks={tasks} handleTaskStateToggled={this.updateTaskState}
                              handleTaskMoved={this.updateTasks}
                              isDayStarted={this.state.isDayStarted} isDayFinished={this.state.isDayFinished}/>
                    <View style={styles.actionButtonContainer}>
                        {actionButton}
                    </View>
                </SafeAreaView>
            </>
        );
    }
}

const styles = StyleSheet.create({
    header: {
        flex: 1,
        alignItems: 'center'
    },
    headerText: {
        fontSize: 16,
        textAlign: 'center'
    },
    actionButtonContainer: {
        flex: 1,
        paddingTop: 5,
        marginTop: 5,
        borderTopWidth: 2,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
    },
    stateTextContainer: {
        paddingBottom: 5,
        marginBottom: 5,
        borderBottomWidth: 2,
        borderBottomRightRadius: 20,
        borderBottomLeftRadius: 20,
    }
});
