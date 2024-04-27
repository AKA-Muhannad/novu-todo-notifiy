import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios'

type Props = {
    email: string,
    todoHeading: string
}

interface TodoItem {
    email: string,
    todoHeading: string
}

const url = process.env.REACT_APP_TODO_URL!

console.log(url)

function App() {
    const [email, setEmail] = useState('')
    const [todoHeading, setTodoHeading] = useState('')
    const [todo, setTodo] = useState<TodoItem[]>([])

    const addTodo = async (e: any) => {
        e.preventDefault();
        try {
             await axios.post(`${url}/add-Todo`, {
                todoHeading: todoHeading,
                email: email
            })
            if (email && todoHeading) setTodo([...todo, {email: email, todoHeading: todoHeading}])

        } catch (error) {
            console.log(error)
        }

    }

    useEffect(() => {
        console.log(todoHeading)
    }, [todoHeading]);

    useEffect(() => {
        console.log(todo)
    }, [todo]);

    useEffect(() => {
        const getTodos = async () => {
            try {
                const res = await axios.get(`${url}/all-Todo`)
                console.log(res)
            } catch (e) {
                console.log(e)
            }
        }
        getTodos().then(result => {
            console.log(result)
        }).catch((error) => console.log(error))
    }, []);

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
                    <form onSubmit={(e: React.FormEvent<HTMLFormElement>) => addTodo(e)}>
                        <input className='input' type="text" placeholder={'Todo'}
                               required
                               onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTodoHeading(e.target.value)}/>
                        <input type="text" placeholder="Email" required
                               onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                        />

                        <button type="submit" className='addButton'>+</button>
                    </form>
                </div>

                <div className='todo_container'>
                    {/* All the todos  */}
                    {todo.map((val: TodoItem, index: number) => {
                        return (
                            <div key={index}>
                                {index + 1} - {val.todoHeading} {val.email}
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>

    );
}

export default App;
