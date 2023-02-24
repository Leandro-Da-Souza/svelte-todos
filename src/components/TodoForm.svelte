<script>
    import { createEventDispatcher } from "svelte";
    import { todosList } from "../stores/TodosStore";

    // const dispatch = createEventDispatcher()

    let newTitle = ''

    const addTodo = () => {
        if(newTitle === '') {
            return
        }
        let newTodo = {}

        $todosList.forEach(element => {
            newTodo.id = element.id + 1
        });

        newTodo.title = newTitle
        newTodo.isComplete = false
        newTodo.isEditing = false

        todosList.update(todos => {
            return [...todos, newTodo]
        })
        newTitle = ''
    }

</script>

<form action="#" on:submit|preventDefault={addTodo}>
    <input
      type="text"
      class="todo-input"
      placeholder="What do you need to do?"
      bind:value={newTitle}
    />
</form>