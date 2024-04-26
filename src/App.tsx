import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';

type Props = {
    email: string,
    todoHeading: string
}

interface TodoItem {
    email: string,
    todoHeading: string
}

function App() {
    const [email, setEmail] = useState('')
    const [todoHeading, setTodoHeading] = useState('')
    const [todo, setTodo] = useState<TodoItem[]>([])

    const addTodo = () => {
        if (!email || !todoHeading) {
            setTodo([...todo, {email: email, todoHeading: todoHeading}])
        }
    }

    useEffect(() => {
        console.log(todoHeading)
    }, [todoHeading]);
    return (
        <div className='parent'>
            {/*<div className='headers'>*/}
            {/*    <h1>NotifyTodo</h1>*/}
            {/*    <div>*/}
            {/*        Manage your team efficiently by notifying workers about the latest updates/tasks through email*/}
            {/*        notifications.*/}
            {/*    </div>*/}
            {/*</div>*/}
            <div className="todo_wrapper">
                <div>
                    <form onSubmit={addTodo}>
                        <input className='input' type="text" placeholder={'Todo'}
                               onChange={(e) => setTodoHeading(e.target.value)}/>
                        <input type="text" placeholder="Email" onChange={(e) => setEmail(e.target.value)}
                        />

                        <button type="submit" className='addButton'>+</button>
                    </form>
                </div>

                <div className='todo_container'>
                    {/* All the todos  */}
                    {todo.map((val, index) => {
                        return(
                            <div>
                                {val.email} {val.todoHeading}
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>

    );
}

export default App;
