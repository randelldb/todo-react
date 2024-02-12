import React, {useState, useEffect} from 'react';
import {useParams, Link} from 'react-router-dom';
import Header from "../../components/header/Header.tsx";

export const DetailPage = () => {
    const params = useParams<{ taskId: string }>();
    const [task, setTask] = useState<{ id?: string, task?: string }>({});

    useEffect(() => {
        const fetchTask = async () => {

            const response = await fetch(`http://localhost:8080/task/${params.taskId}`);
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const data = await response.json();
            setTask(data);
        };

        fetchTask();
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = e.target;
        setTask(prev => ({...prev, [name]: value}));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
    };

    return (
        <div className={"detail-page"}>
            <Header/>
            <form onSubmit={handleSubmit}>
                <label>
                    <span>Task</span>
                    <input
                        type="text"
                        name="title"
                        value={task.task || ''}
                        onChange={handleInputChange}
                    />
                </label>
                <label>
                    <span>Description</span>
                    <textarea
                        name="description"
                        value=""
                        onChange={handleInputChange}
                    />
                </label>
                <button type="submit">Save</button>
                <button type="button" onClick={() => {/* handle cancel */
                }}>Cancel
                </button>
            </form>
            <Link to={"/"}> Home </Link>
        </div>
    );
};
