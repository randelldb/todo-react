import Header from "./components/header/Header.tsx";
import InputTask from "./components/inputTask/InputTask.tsx";
import TaskList from "./components/taskList/TaskList.tsx";
function App() {
  return (
    <div className='container'>
        <Header />
        <InputTask />
        <TaskList />
    </div>
  )
}

export default App
