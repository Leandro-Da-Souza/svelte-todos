import { writable } from 'svelte/store'

export const todosList = writable(
    [
		{
			id: 1,
			title: 'Do anything',
			isComplete: true,
			isEditing: false,
		},
		{
			id: 2,
			title: 'Do something else',
			isComplete: false,
			isEditing: false,
		},
		{
			id: 3,
			title: 'Do Do Do Do',
			isComplete: false,
			isEditing: false,
		},
	]
)