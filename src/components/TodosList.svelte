<script>
    import { fade, fly } from 'svelte/transition'
    import { createEventDispatcher } from "svelte";
    import { todosList } from '../stores/TodosStore'

    // const dispatch = createEventDispatcher()

    let currentFilter = 'all'

    $: filteredTodos = currentFilter === 'all' ?
        $todosList : currentFilter === 'active' ?
            $todosList.filter(todo => !todo.isComplete) : $todosList.filter(todo => todo.isComplete)

    $: remainingTodos = $todosList.filter(todo => !todo.isComplete).length


    const checkAllTodos = () => {
        todosList.update((todos) => {
            return todos.map(todo => {
                todo.isComplete = true
                return todo
            })
        })
    }

    const clearCompletedTodos = () => {
        todosList.update(todos => {
            return todos.filter(todo => !todo.isComplete)
        })
    }

    const deleteTodo = (id) => {
        todosList.update(todos => {
            return todos.filter(todo => todo.id !== id)
        })
    }

    const updateFilter = (filter) => {
        currentFilter = filter
    }

    let beforeEditCache;

    const editTodo = (todo) => {
		beforeEditCache = todo.title
		todo.isEditing = true
        todosList.update(todos => todos)
    }

	const doneEditing = (todo) => {		
		if(todo.title.trim().length === 0) {
			todo.title = beforeEditCache
		}
		todo.isEditing = false
		todosList.update(todos => todos)
	}

	const doneEditKeydown = (e, todo) => {
		if(e.key === 'Enter') {
			doneEditing(todo)
		}

		if(e.key === 'Escape') {
			todo.title = beforeEditCache
			doneEditing(todo)
		}
	} 


</script>

<section>
    <ul class="todo-list">
    {#each filteredTodos as todo (todo.id)}
    <li 
        class="todo-item-container" 
        in:fly={{x: 50}}
        out:fade
    >
        <div class="todo-item">
            <input type="checkbox" bind:checked={todo.isComplete}/>
            {#if todo.isEditing}
                <input
                    type="text"
                    class="todo-item-input"
                    bind:value={todo.title}
                    on:blur={doneEditing(todo)}
                    on:keydown={e => doneEditKeydown(e, todo)}
                    autofocus
                />
            {:else}
            <span class="todo-item-label" class:line-through={todo.isComplete} on:dblclick={editTodo(todo)}>{todo.title}</span>
            {/if}
        </div>
        <button class="x-button" on:click={deleteTodo(todo.id)}>
            <svg
            class="x-button-icon"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
            />
            </svg>
        </button>
    </li>
    {/each}
    </ul>
    
    <div class="check-all-container">
    <div>
        <button class="button" on:click={checkAllTodos}>Check All</button>
    </div>
        <div>
            {#key remainingTodos}
                <span in:fly={{y: -20}}>{remainingTodos}</span>
                <span> items remaining</span>
            {/key}
        </div>

    </div>

    <div class="other-buttons-container">
        <div>
            <button class="button filter-button" class:filter-button-active={currentFilter === 'all'} on:click={() => updateFilter('all')}>All</button>
            <button class="button filter-button" class:filter-button-active={currentFilter === 'active'} on:click={() => updateFilter('active')}>Active</button>
            <button class="button filter-button" class:filter-button-active={currentFilter === 'completed'} on:click={() => updateFilter('completed')}>Completed</button>
        </div>
        <div>
            <button class="button" on:click={clearCompletedTodos}>Clear completed</button>
        </div>
    </div>
</section>