import Layout from "@/components/Layout";
import { useState } from "react";

const Home = () => {
    const [todos, setTodos] = useState([]);

    const addTodo = (text) => {
        setTodos([
            ...todos,
            { id: Math.random(), text, status: TODO_STATUSES.TODO },
        ]);
    };

    const updateTodo = (id, text) => {
        const todoIndex = todos.findIndex((todo) => todo.id === id);
        const updatedTodos = [...todos];
        updatedTodos[todoIndex] = { ...updatedTodos[todoIndex], text };
        setTodos(updatedTodos);
    };

    const deleteTodo = (id) => {
        const updatedTodos = todos.filter((todo) => todo.id !== id);
        setTodos(updatedTodos);
    };
    return (
        <Layout>
            <h1>Simple Todo App</h1>
            <AddTodo addTodo={addTodo} />
            {todos.map(({ id, text }) => (
                <Todo
                    key={id}
                    text={text}
                    id={id}
                    updateTodo={updateTodo}
                    deleteTodo={deleteTodo}
                />
            ))}
        </Layout>
    );
};

const AddTodo = ({ addTodo }) => {
    const [text, setText] = useState("");

    const onAddTodo = () => {
        addTodo(text);
        setText("");
    };

    const onKeyDown = ({ which }) => {
        if (which === 13 && text) onAddTodo();
    };

    return (
        <div className="flex space-between">
            <input
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyDown={onKeyDown}
            />
            <button onClick={onAddTodo}>Add Todo</button>
        </div>
    );
};

const Todo = ({ text, id, updateTodo, deleteTodo }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [newText, setNewText] = useState(text);

    const onSave = () => {
        if (text !== newText) updateTodo(id, newText);
        setIsEditing(false);
    };

    const onKeyDown = ({ which }) => {
        if (which === 13 && newText) onSave();
    };

    const onCancel = () => {
        setIsEditing(false);
        setNewText(text);
    };

    if (!isEditing) {
        return (
            <div className="flex space-between">
                {text}
                <div>
                    <button onClick={() => setIsEditing(true)}>Edit</button>
                    <button onClick={() => deleteTodo(id)}>Delete</button>
                </div>
            </div>
        );
    }
    return (
        <div className="flex space-between">
            <input
                value={newText}
                onChange={(e) => setNewText(e.target.value)}
                onKeyDown={onKeyDown}
                autoFocus
            />
            <div>
                <button onClick={onCancel}>Cancel</button>
                <button onClick={onSave}>Save</button>
            </div>
        </div>
    );
};

export default Home;

const TODO_STATUSES = Object.freeze({
    TODO: "todo",
    PROGRESS: "progress",
    DONE: "done",
});
