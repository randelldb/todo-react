import InputTask from "../inputTask/InputTask.tsx";
import { Link } from "react-router-dom";
import { useFetchTask } from "../../hooks/useFetchTask.tsx";

import { deleteTask } from "../../helpers/deleteTask.ts";
import { toggleTask } from "../../helpers/toggleTask.ts";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck, faX, faPenToSquare} from "@fortawesome/free-solid-svg-icons";
import {useState} from "react";

const TaskList = () => {
  // useFetchTask Hook
  const { data, loading, error, fetchData } = useFetchTask();
  const [checked, setChecked] = useState(false);
  console.log(checked)

  const handleToggleTask = async (e, state: boolean) =>{
    const {id} = e.target

    // setChecked(!state)
    setChecked((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));

    await toggleTask(id, state);

    await fetchData();
  };
  const handleDelete = async (taskId: string) => {
    await deleteTask(taskId);
    await fetchData();
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <InputTask onTaskCreated={fetchData} />
      <div className={"task-list"}>
        {data.map((task: any, index: number) => (
          <div key={index} className={`task ${task.state ? "done" : ""}`}>
            {/*<span onClick={() => handleToggleTask(task._id, task.state)}>*/}
            {/*    {task.state ? (<FontAwesomeIcon icon={faX}/>) : (<FontAwesomeIcon icon={faCheck}/>)}*/}
            {/*</span>*/}

            <div className={"task-collapsed"}>
              <div className={"checkbox"}>
                <input type="checkbox"  id={task._id} checked={task.state} onChange={(e) => handleToggleTask(e, task.state)}/>
              </div>

              <div className={"task-title"}>{task.task}</div>

              <div className={"task-actions"}>
              <span>
                <Link to={`/details/${task._id}`}><FontAwesomeIcon className={"color-accent"} icon={faPenToSquare}/></Link>
              </span>
                <span onClick={() => handleDelete(task._id)}><FontAwesomeIcon className={"color-alert"} icon={faX}/></span>
              </div>
            </div>

            <div className={"task-desc"}>xxxx</div>

          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskList;
