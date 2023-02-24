<script>
    import { fade } from 'svelte/transition'
    let noTodosContainer;
</script>

<div class="no-todos-container"
    bind:this={noTodosContainer} 
    transition:fade 
    on:introstart={() => {noTodosContainer.style = "display:none"}}
    on:introend={() => {noTodosContainer.style = 'display:block'}}
> 
    <div class="no-todos-text-container">
    No todos at the moment.
    </div>
</div>