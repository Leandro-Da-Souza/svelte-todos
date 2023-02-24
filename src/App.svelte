<script>
	import NoTodosContainer from './components/NoTodosContainer.svelte';
	import TodoFormMiddle from './components/TodoFormMiddle.svelte';
    import TodosList from './components/TodosList.svelte';
	import { todosList } from './stores/TodosStore';
	import "./css/reset.css";
	import "./css/style.css";

</script>

<div class="todo-app-container">
	<div class="todo-app">
	  	<h2>Todo App</h2>
		<TodoFormMiddle />
		{#if $todosList.length > 0 }
			<TodosList />
		{:else}
			<NoTodosContainer/>
		{/if}
  </div>
</div>
