import AsyncStorage from '@react-native-async-storage/async-storage';
import {Task} from '../model/task';

const TASKS_KEY = '@tasks';
const IS_DAY_STARTED_KEY = '@isDayStarted';
const IS_DAY_FINISHED_KEY = '@isDayFinished';

export const MAX_TASKS = 6;

export async function getTasks(): Promise<Task[]> {
    return getItem<Task []>(TASKS_KEY, []);
}

export async function setTasks(tasks: Task[]): Promise<void> {
    if (!tasks || tasks.length > MAX_TASKS) {
        // @ts-ignore
        toast.show('Focus on the remaining tasks before adding new ones!');
        throw new Error("INVALID_ARGS: tasks undefined or more than 6: " + tasks);
    }

    return setItem(TASKS_KEY, tasks);
}

export async function addTask(desc: string, insertFirst: boolean): Promise<void> {
    return getTasks().then(storedTasks => {
        const newTask: Task = {
            id: generateUuid(),
            desc: desc,
            done: false
        };

        if (insertFirst) {
            storedTasks.unshift(newTask);
        } else {
            storedTasks.push(newTask);
        }

        return setTasks(storedTasks);
    });
}

export async function isDayStarted(): Promise<boolean> {
    return getItem<boolean>(IS_DAY_STARTED_KEY, false);
}

export async function setIsDayStarted(isDayStarted: boolean): Promise<void> {
    return setItem(IS_DAY_STARTED_KEY, isDayStarted);
}

export async function isDayFinished(): Promise<boolean> {
    return getItem<boolean>(IS_DAY_FINISHED_KEY, false);
}

export async function setIsDayFinished(isDayFinished: boolean): Promise<void> {
    return setItem(IS_DAY_FINISHED_KEY, isDayFinished);
}

/* PRIVATE METHODS */
async function getItem<T>(key: string, def: T): Promise<T> {
    try {
        const value = await AsyncStorage.getItem(key);
        if (value !== null) {
            return JSON.parse(value) as T;
        }
    } catch (e) {
        console.log("Could not get item: [key = '" + key + "', exception= '" + e + "'");
    }
    return def;
}

async function setItem<T>(key: string, item: T): Promise<void> {
    const itemString = JSON.stringify(item);
    try {
        await AsyncStorage.setItem(key, JSON.stringify(item));
    } catch (e) {
        console.log("Could not save item: [key = '" + key + "', JSON.stringify(item) = '" + itemString + "'");
    }
}

function generateUuid(): string {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}
