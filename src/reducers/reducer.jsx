import { createSlice } from '@reduxjs/toolkit'
const initialstate = [];
const  addReducer = createSlice({
    name : "todo",
    initialstate,
    reducers:{
        addTodos : (state=initialstate, action) =>{
            state.push(action.payload);
            return state; 
        },
        deleteTodos : (state=initialstate , action) =>{
            return state.filter(item => item.id!== action.payload);
        },
        EditTodos : (state=initialstate , action) =>{
            return state.map(todo =>{
                if(todo.id === action.payload.id){
                    return{
                        ...todo,
                        item: action.payload.item,
                    }
                }
                return todo;
            })
        }
    }
});

export const {addTodos , deleteTodos , EditTodos} = addReducer.actions;
export const reducer = addReducer.reducer;