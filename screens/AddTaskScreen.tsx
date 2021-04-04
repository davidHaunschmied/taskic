import React from 'react';
import {Dimensions, SafeAreaView, StyleSheet, Switch, Text, View} from 'react-native';
import {Button, Input} from 'react-native-elements';
import {globalStyles} from '../styles/Styles';
import {addTask} from '../services/task-service';

interface Props {
    navigation: any;
}

interface State {
    desc: string;
    insertFirst: boolean;
    triedToSave: boolean;
}

export class AddTaskScreen extends React.Component<Props, State> {
    constructor(public props: Props) {
        super(props);
        this.state = {
            desc: '',
            insertFirst: false,
            triedToSave: false
        };
        this.save = this.save.bind(this);
    }


    private save(): void {
        if (this.state.desc.length < 1) {
            // @ts-ignore
            toast.show('Too fast!', {type: 'danger'});
            this.setState({triedToSave: true});
            return;
        }
        addTask(this.state.desc, this.state.insertFirst).then(() => this.props.navigation.navigate('TaskScreen'));
    }

    render() {
        return (
            <SafeAreaView style={globalStyles.screenContainer}>
                <View style={styles.inputContainer}>
                    <Input placeholder={'Briefly state what needs to be done'} value={this.state.desc}
                           onChangeText={text => this.setState({desc: text})}
                           errorMessage={this.state.triedToSave ? 'Describe your task before saving' : ''}/>
                </View>
                <View style={styles.toggleContainer}>
                    <Text>{this.state.insertFirst ? 'Insert as first task' : 'Insert as last task'}</Text>
                    <Switch
                        onValueChange={() => this.setState((state, props) => {
                            return {insertFirst: !state.insertFirst}
                        })}
                        value={this.state.insertFirst}
                    />
                </View>
                <View style={[styles.inputContainer, {marginTop: 20}]}>
                    <Button title={'Save'} onPress={this.save}/>
                </View>
                <Text style={styles.tbdHint}>Please be aware that editing task descriptions is not possible yet!</Text>
            </SafeAreaView>
        );
    }

}

const styles = StyleSheet.create({
    inputContainer: {
        width: Dimensions.get('window').width - 50,
        alignSelf: 'center'
    },
    inputLabel: {
        fontSize: 16,
        alignSelf: 'center'
    },
    toggleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    tbdHint: {
        marginTop: 10,
        fontSize: 11,
        fontStyle: 'italic',
        textAlign: 'center'
    }
})
