import React, {Component} from "react";
import TodoStore from "../Stores/TodoStore";
import {dispatcher} from "@nsisodiya/flux";

class Todo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentValue: "",
            todoItems: []
        };
        // add a listener for state change
        TodoStore.onChange(() => {
            this.setState(TodoStore.getState());
        });
    };

    //================Start List of instance methods===================

    onChangeInputTextField(event) {
        console.log(event.target.value);
        this.setState({
            currentValue: event.target.value
        });
    }

    handleOnSubmit() {
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        fetch("http://localhost:8001/posts", {
            method: 'post',
            headers: myHeaders,
            body: JSON.stringify({title: this.state.currentValue, author: this.state.currentValue}),
        }).then((res) => {
            return res.json();
        }).then((data) => {
            dispatcher.publish("TODO_REQUEST_DATA");
        }).catch((err) => {
            throw new Error("There was a error while creating post");
        });
    }

    //================End of instace methods===================

    //=================Start List of life cycle methods================
    componentWillMount() {
        dispatcher.publish("TODO_REQUEST_DATA");
    }

    componentDidMount() {
        //dispatcher.publish("TODO_REQUEST_DATA");
    }

    //=================End List of life cycle methods================

    render() {
        console.log("TODO list render", this.state);
        return (
            <div>
                <input
                    type="text"
                    onChange={(event) => {
                        this.onChangeInputTextField(event);
                    }}
                />
                <input
                    type="button"
                    value="Submit"
                    onClick={() => {
                        this.handleOnSubmit();
                    }}
                />
                {
                    this.state.todoItems.map((item, index) => {
                        return <div key={index}>
                            <input
                                type="checkbox"
                            />
                            {item.title}
                        </div>
                    })
                }
            </div>
        );
    }
}

export default Todo;
