<script>
	import { sessionCheck } from '../stores';
	import ErrorPage from '../components/ErrorPage.svelte';

	let checksession;

	if(typeof window !==  'undefined'){
		checksession = JSON.parse(localStorage.getItem('user'));
	}
</script>

<svelte:head>
	<title>About</title>
</svelte:head>

{#if checksession != null}
<h1>About this site</h1>

<p>This is the 'about' page. There's not much here.</p>
{:else}
<ErrorPage />
{/if}

