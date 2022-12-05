<script>
  import { get } from 'svelte/store';
    import { sessionCheck } from '../stores';

    let checksession;
    let getdata;
    let username;
    let key;
    if(typeof window !== 'undefined'){
        checksession = JSON.parse(localStorage.getItem('user'));
    }
    

    function handleLogout() {
        localStorage.setItem('user', null);
    }
    // import { store } from '../auth/auth';

    // import { mystore, setSession } from '../mystore';

	// let session = setSession("A_SESSION");

	// const unsubscribeMyStore = mystore.subscribe(value => {
    //     session = session;
    // });

    // $store = null;
</script> 

<svelte:head>
    <title>Dashboard</title>
</svelte:head>
{#if checksession != null}
<p>this dashboaard</p>
<h3>You are logged in as: {checksession.username}</h3>
<button on:click={handleLogout} type="submit" class="relative flex justify-center w-full px-4 py-2 mt-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md  group hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Logout</button>

{/if}
