import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    todos:[],
    completed:0,
    uncompleted:0,
}
const todosSlice = createSlice({
    name:"todo",
    initialState,
    reducers:{
        addTodo:()=>{},
        removeTodo:()=>{},
        changeTodoStatus:()=>{},
        calculateTotal:()=>{},
    }
})
export const {addTodo,removeTodo,changeTodoStatus,calculateTotal} = todosSlice.actions
export default todosSlice.reducer