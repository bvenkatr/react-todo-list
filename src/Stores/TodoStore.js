import {dispatcher, createStore} from "@nsisodiya/flux";

let TodoStore = createStore({
    INIT(state) {
        state.currentValue = "";
        state.todoItems = [];
    },
    TODO_REQUEST_DATA(state) {
        fetch("http://localhost:8001/posts").then((data) => {
            return data.json();
        }).then((res) => {
            dispatcher.publish("TODO_DATA_AVAILABLE", res);
        });
    },
    TODO_DATA_AVAILABLE(state, data) {
        state.todoItems = data;
    }
});

export default TodoStore;
