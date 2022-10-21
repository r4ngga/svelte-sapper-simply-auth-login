import { writable } from "svelte/store";

export let mystore = writable({
    session: ""
});

export function setSession (session){
    mystore.set({
        session: session
    });
    session = session;
}