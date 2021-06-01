import AsyncStorage from '@react-native-async-storage/async-storage';
import {Task} from '../model/task';

const TASKS_KEY = '@tasks';
const IS_DAY_STARTED_KEY = '@isDayStarted';
const IS_DAY_FINISHED_KEY = '@isDayFinished';
const FINISHED_TASKS_COUNT = '@finishedTasksCount';
const FINISHED_DAYS_COUNT = '@finishedDaysCount';
const FINISHED_PROD_DAYS_COUNT = '@finishedProdDaysCount';

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
    await setItem(IS_DAY_FINISHED_KEY, isDayFinished);
}

export async function getFinishedTasksCount(): Promise<number> {
    return getItem<number>(FINISHED_TASKS_COUNT, 0);
}

export async function setFinishedTasksCount(finishedTasksCount: number): Promise<void> {
    await setItem(FINISHED_TASKS_COUNT, finishedTasksCount);
}

export async function getFinishedDaysCount(): Promise<number> {
    return getItem<number>(FINISHED_DAYS_COUNT, 0);
}

export async function setFinishedDaysCount(finishedDaysCount: number): Promise<void> {
    await setItem(FINISHED_DAYS_COUNT, finishedDaysCount);
}

export async function getFinishedProdDaysCount(): Promise<number> {
    return getItem<number>(FINISHED_PROD_DAYS_COUNT, 0);
}

export async function setFinishedProdDaysCount(finishedProdDaysCount: number): Promise<void> {
    await setItem(FINISHED_PROD_DAYS_COUNT, finishedProdDaysCount);
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
