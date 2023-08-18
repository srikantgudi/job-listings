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
    margin: auto;
  }
  .company {
    display: flex;
    align-items: center;
    justify-content: space-around;
    border-radius: 50%;
    box-shadow: 0 0 4px #666;
    width: 6rem;
    height: 6rem;
    padding: 1rem;
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
  .job.active {
    border-left: 6px solid teal;
    border-radius: 1rem auto auto 1rem;
  }
  .tools {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: flex-end;
  }
  @media screen and (max-width:375px) {
    .job {
      grid-template-columns: 1fr;
      width: 100%;
    }
  }
</style>
<main>
  <div class="row p-2 mx-2 border rounded-5">
    <div class="col">
      {#if roleFilter}
        {roleFilter} <button on:click={() => roleFilter = ''} class="btn btn-sm rounded">&times;</button>
      {/if}
      {#if levelFilter}
        {levelFilter} <button on:click={() => levelFilter = ''} class="btn btn-sm rounded">&times;</button>
      {/if}
      {#if langs.length}
        {#each langs as l}
        {l} <button on:click={() => clearLang(l)} class="btn btn-sm rounded">&times;</button>
        {/each}
      {/if}
      {#if tools.length}
        {#each tools as t}
        {t} <button on:click={() => clearTool(t)} class="btn btn-sm rounded">&times;</button>
        {/each}
      {/if}
    </div>
    <div class="col-1">
      <button class="btn btn-sm rounded-pill" on:click={clearFilters}>Clear</button>
    </div>
  </div>
  <div>
    {#each data.jobs.filter(f => filterRow(f)) as row}
      <div class="d-flex my-md-2">
        <div class="job" class:active={row.featured}>
          <div>
            <img src={row.logo} alt="logo" />
          </div>
          <div class="d-flex flex-column gap-2">
            <div class="d-flex gap-1 gap-md-2 align-items-center">
              <span class="fs-5">{row.company}</span>
              {#if row.new}<span class="badge badge-primary rounded-pill">New!</span>{/if}
              {#if row.featured}<span class="badge badge-primary rounded-pill">Featured</span>{/if}
            </div>
            <div class="fs-5 fw-bold">
              {row.position}
            </div>
            <div class="d-flex gap-4 align-items-center">
              <span>{row.postedAt}</span> &bull; <span>{row.contract}</span> &bull; <span>{row.location}</span>
            </div>
          </div>
          <!-- tools, etc-->
          <div class="d-flex justify-content-end fs-5 gap-2 py-5">
            <button class="btn badge badge-primary rounded-pill" on:click={setRoleFilter(row.role)}>{row.role}</button>
            <button class="btn badge badge-primary rounded-pill" on:click={setLevelFilter(row.level)}>{row.level}</button>
            {#each row.languages as lang}
            <button class="btn badge badge-primary rounded-pill" on:click={() => addLang(lang)}>{lang}</button>
            {/each}
            {#each row.tools as tool}
            <span class="btn badge badge-primary rounded-pill" on:click={() => addTool(tool)}>{tool}</span>
            {/each}
          </div>
        </div>
      </div>
    {/each}
  </div>
</main>