import { writable } from 'svelte/store';

const user = 'admin';
const pass = 'admin';

export const store = writable(null);

let sessions = [];
export const sessionData = async (username, password) => {
    if(username === user && password === pass)
    {
        return 1;
    }
}