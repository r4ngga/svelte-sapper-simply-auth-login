<script >
    import { sessionCheck } from '../../stores';
    import ErrorPage from '../../components/ErrorPage.svelte';
    import fetch from 'node-fetch';
  import About from '../about.svelte';


    let checksession;
    let getbeer = Array();
    let currentPage = 1;
    let totalPages = 13;
    let pages = [];
    if(typeof window !== 'undefined'){
        checksession = JSON.parse(localStorage.getItem('user'));
    }

    function createPagesArray(total){
        let arr = [];

        for(let i = 1; i <= total; i++){
            arr.push(i);
        }

        return arr;
    }

    function changesPage(page){
    fetch(`https://api.punkapi.com/v2/beers?page=${page}&per_page=25`)
       .then(res => {
         return res.json();
       }).then( result => {
          getbeer = result;
          currentPage = page;
       })
    }

    function callProductBeer(){
        const getApiProd = "https://api.punkapi.com/v2/beers?page=1&per_page=25";
        
        fetch(getApiProd)
         .then(response => response.json())
         .then((data) => {
            for(let i = 0; i < data.length; i++){
                getbeer = data;
                // console.log(data[i].name);
            }

            pages = createPagesArray(totalPages);
         } );

        return getbeer;
    }

    // const trimContent = (content) => {

    // }

    callProductBeer();
</script>
<!-- <link rel="stylesheet" href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css"> -->

<svelte:head>
    <title>Product</title>
</svelte:head>

{#if checksession != null}



<div class="bg-gray-50 p-10 rounded">
    <h1 class="text-3xl font-bold tracking-tight text-gray-900 ">
        <span class="block">List Product</span>
    </h1>
    <!-- <div class="mx-auto max-w-7xl py-12 px-4 sm:px-6 lg:flex lg:items-center lg:justify-between lg:py-16 lg:px-8"> -->
        <div class=" mx-auto max-w-7xl px-4 py-12 grid grid-cols-3 gap-4  lg:py-16 lg:px-8">
            
        
            {#each getbeer as product}
                
            <div class="max-w-sm m-2 rounded overflow-hidden shadow-lg">
                <img class="w-14 h-auto object-cover items-center mx-auto" src="{product.image_url}" alt="image_product">
                <div class="px-6 py-4">
                  <div class="font-bold text-xl mb-2">{product.name}</div>
                  <p class="text-gray-700 text-base">
                    {#if product.description.length > 100}
                        {product.description.substring(0, 100)}....
                    {:else}
                        {product.description}
                    {/if}
                  </p>
                </div>
                <div class="px-6 pt-4 pb-2">
                    {#each product.ingredients.malt as beermalt}
                    <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#{beermalt.name}</span>
                {/each}                 
                </div>
              </div>
            
            {/each}
        </div>

    <!-- </div> -->
</div>



<div class="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
    <div class="flex flex-1 justify-between sm:hidden">
      <!-- <a href="#" class="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">Previous</a>
      <a href="#" class="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">Next</a> -->
    </div>
    <div class="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
      <div>
        <p class="text-sm text-gray-700">
          Showing
          <span class="font-medium">25</span>
          to
          <span class="font-medium">{currentPage}</span>
          of
          <span class="font-medium">{totalPages}</span>
          results
        </p>
      </div>
      <div>
        <nav class="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
          
          {#each pages as page}
          <!-- Current: "z-10 bg-indigo-50 border-indigo-500 text-indigo-600", Default: "bg-white border-gray-300 text-gray-500 hover:bg-gray-50" -->
          <button on:click={ () => changesPage(page) } aria-current="page" class="relative z-10 inline-flex items-center border border-indigo-500 bg-indigo-50 px-4 py-2 text-sm font-medium text-indigo-600 focus:z-20">{page}</button>
          {/each}
        </nav>
      </div>
    </div>
  </div>
  
 
{:else}
<ErrorPage />
  
{/if}