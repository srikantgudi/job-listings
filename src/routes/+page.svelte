<script>
  export let data;
  let roleFilter = '';
  let levelFilter = '';
  let langs = [];
  let tools = [];
  let hasFilter = true;

  const setRoleFilter = (role) => {
    hasFilter = !hasFilter || true;
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
    hasFilter = false;
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
  header {
    position: sticky;
    background: url(images/bg-header-desktop.svg) no-repeat 50% 50% #099;
    background-size: cover;
    height: 8rem;
  }
  main {
    position: absolute;
    top: 20%;
    left: 12.5%;
    width: 1440px;
    margin: 0 auto;
  }
  .filter-nav {
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    position: relative;
    top: -1rem;
    width: 1440px;
    margin: auto;
    padding: 1rem;
    background-color: aliceblue;
    align-items: center;
    justify-content: space-between;
    box-shadow: 0 0 4px #999;
    border-radius: 0.5rem;
    background-color: none;
  }
  @media screen and (max-width:375px) {
  }
</style>
<header>
  &nbsp;
</header>
{#if hasFilter}
<div class="filter-nav">
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
    <button class="ml-auto" on:click={clearFilters}>Clear</button>
</div>
{/if}
<main>
  <div class="job-list">
    {#each data.jobs.filter(f => filterRow(f)) as row}
      <div class="flex items-center gap-1 h-[8rem] mb-4 bg-gray-100 shadow-lg {row.featured ? 'border-l-4 border-l-teal-600': ''} p-4 rounded-l-sm">
        <div class="mx-2">
          <img src={row.logo} width="50" alt="logo" align="middle" />
        </div>
        <div class="w-1/2 mr-8">
          <div class="flex gap-2 items-center">
            <span class="text-xs text-teal-800">{row.company}</span>
            {#if row.new}<span class="text-[8px] uppercase bg-teal-600 p-[1px] px-2 text-white rounded-xl">New!</span>{/if}
            {#if row.featured}<span class="text-[8px] uppercase bg-black p-[1px] px-2 text-white rounded-xl">Featured</span>{/if}
          </div>
          <div class="font-bold text-sm">
            {row.position}
          </div>
          <div class="flex gap-2 align-items-center text-[10px] font-bold text-slate-600">
            <span>{row.postedAt}</span> &bull; <span>{row.contract}</span> &bull; <span>{row.location}</span>
          </div>
        </div>
        <!-- tools, etc-->
        <div class="flex gap-2 my-8 ml-auto">
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