<script>
  export let data;
  let roleFilter = '';
  let levelFilter = '';
  let langs = [];
  let tools = [];

  const setRoleFilter = (role) => {
    roleFilter = role
  }
  const setLevelFilter = (level) => {
    levelFilter = level;
  }

  const addLang = (lang) => {
    if (!langs.includes(lang)) {
      langs = [...langs, lang];
    }
  }

  const addTool = (tool) => {
    if (!tools.includes(tool)) {
      tools = [...tools, tool];
    }
  }

  const clearLang = (l) => {
    langs = langs.filter(lang => lang != l);
  }

  const clearTool = (t) => {
    tools = tools.filter(tool => tool != t);
  }

  const clearFilters = () => {
    levelFilter = '';
    roleFilter = '';
    langs = [];
    tools = [];
  }

  $: filterRow = (f) => {
    return ((roleFilter ? f.role === roleFilter : true)
    && (levelFilter ? f.level === levelFilter: true)
    && (langs.length ? f.languages.some(l => langs.includes(l)) : true)
    && (tools.length ? f.tools.some(t => tools.includes(t)) : true)
    );
  }

</script>

<style>
  main {
    width: 1440px;
    margin: 0 auto;
  }
  .job {
    box-sizing: border-box;
    display: grid;
    grid-template-columns: 10% 50% auto;
    gap: 1rem;
    border: 1px solid #999;
    border-radius: 0.5rem;
    padding: 1rem 1rem 0 2rem;
    width: 100%;
  }
  @media screen and (max-width:375px) {
    .job {
      grid-template-columns: 1fr;
      width: 100%;
    }
  }
</style>
<main>
  <div>
    <div class="invisible md:visible">
      <img class="sticky mt-[-1rem] bg-gray-400" src="/images/bg-header-desktop.svg" alt="bg" />
    </div>
    <div class="visible md:hidden">
      <img class="sticky bg-gray-400 w-full" src="/images/bg-header-mobile.svg" alt="bg" />
    </div>
    {#if roleFilter || levelFilter || langs.length || tools.length}
    <div class="absolute shadow-md rounded-md px-4 mt-[-20px] text-2 h-[3rem] md:w-[70%] w-full border mx-12 bg-white mt-6 p-1 flex items-center justify-between">
      <!-- <div class="flex gap-0"> -->
        {#if roleFilter}
          <div class="mr-1 px-2 flex gap-0"><span class="bg-gray-300 px-2 rounded-l-md">{roleFilter}</span><button on:click={() => roleFilter = ''} class="bg-teal-400 hover:bg-teal-600 px-2 text-white rounded-r-md">&times;</button></div>
        {/if}
        {#if levelFilter}
        <div class="mr-1 px-2 flex gap-0"><span class="bg-gray-300 px-2 rounded-l-md">{levelFilter}</span> <button on:click={() => levelFilter = ''} class="bg-teal-400 hover:bg-teal-600 px-2 text-white rounded-r-md">&times;</button></div>
        {/if}
        {#if langs.length}
          {#each langs as l}
          <div class="mr-2 px-2 flex gap-0"><span class="bg-gray-300 px-2 rounded-l-md">{l}</span> <button on:click={() => clearLang(l)} class="bg-teal-400 hover:bg-teal-600 px-2 text-white rounded-r-md">&times;</button></div>
          {/each}
        {/if}
        {#if tools.length}
          {#each tools as t}
          <div class="mr-2">{t} ?<button on:click={() => clearTool(t)} class="btn btn-sm rounded">&times;</button></div>
          {/each}
        {/if}
      <!-- </div>
      <div class="ml-auto"> -->
        <button class="ml-auto" on:click={clearFilters}>Clear</button>
      <!-- </div> -->
    </div>
    {/if}
  </div>
  <div class="my-12">
    {#each data.jobs.filter(f => filterRow(f)) as row}
      <div class="flex gap-2 my-4 shadow-lg {row.featured ? 'border-l-4 border-teal-600': ''} p-4 rounded-l-lg">
        <div class="mr-4">
          <img src={row.logo} alt="logo" />
        </div>
        <div class="w-1/2">
          <div class="flex gap-2 items-center">
            <span class="text-xl ">{row.company}</span>
            {#if row.new}<span class="text-sm uppercase bg-teal-400 p-1 px-2 text-white rounded-2xl">New!</span>{/if}
            {#if row.featured}<span class="text-sm uppercase bg-teal-800 p-1 px-2 text-white rounded-2xl">Featured</span>{/if}
          </div>
          <div class="font-bold">
            {row.position}
          </div>
          <div class="flex gap-4 align-items-center">
            <span>{row.postedAt}</span> &bull; <span>{row.contract}</span> &bull; <span>{row.location}</span>
          </div>
        </div>
        <!-- tools, etc-->
        <div class="flex gap-2 my-8">
          <button class="bg-slate-200 rounded-md px-2 text-teal-500 font-bold" on:click={setRoleFilter(row.role)}>{row.role}</button>
          <button class="bg-slate-200 rounded-md px-2 text-teal-500 font-bold" on:click={setLevelFilter(row.level)}>{row.level}</button>
          {#each row.languages as lang}
          <button class="bg-slate-200 rounded-md px-2 text-teal-500 font-bold" on:click={() => addLang(lang)}>{lang}</button>
          {/each}
          {#each row.tools as tool}
          <button class="bg-slate-200 rounded-md px-2 text-teal-500 font-bold" on:click={() => addTool(tool)}>{tool}</button>
          {/each}
        </div>
      </div>
    {/each}
  </div>
</main>