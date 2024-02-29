import React, { useEffect, useState } from 'react';
import './App.css';
import { IoTrashBinSharp } from "react-icons/io5";
import { BsClipboard2Check } from "react-icons/bs";
import { RiEditLine } from "react-icons/ri";



function App() {
  const [isComplete, setIsComplete] = useState(false);
  const [allToDo, setAllToDo] = useState([]);
  const [newToDo, setNewToDo] = useState("");
  const [newDes, setNewDes] = useState("");
  const [completedToDo, setCompletedToDo] = useState([]);
  const [currentEdit, setCurrentEdit] = useState("");
  const [currentEditedItem, setCurrentEditedItem] = useState("");

  const handleAddTask = () => {
    let newTodoItem = {
      title: newToDo,
      description: newDes
    }

    let updatedToDoArray = [...allToDo];
    updatedToDoArray.push(newTodoItem);
    setAllToDo(updatedToDoArray);
    localStorage.setItem('todolist', JSON.stringify(updatedToDoArray));

    setNewToDo("");
    setNewDes("");
  };

  const handleDelete = (index) => {
    let reduced = [...allToDo];
    reduced.splice(index, 1);

    localStorage.setItem('todolist', JSON.stringify(reduced));
    setAllToDo(reduced);
  }

  const handleCompleted = (index) => {
    let now = new Date();
    let dd = now.getDate();
    let mm = now.getMonth() + 1;
    let yyyy = now.getFullYear();
    let h = now.getHours();
    let m = now.getMinutes();
    let s = now.getSeconds();

    let completedOn =
      dd + '-' + mm + '-' + yyyy + ' at ' + h + ':' + m + ':' + s;

    let filItem = {
      ...allToDo[index],
      completedOn: completedOn
    }

    let updateCompleted = [
      ...completedToDo
    ];
    updateCompleted.push(filItem);
    setCompletedToDo(updateCompleted);

    handleDelete(index);
    localStorage.setItem('completedItems', JSON.stringify(updateCompleted))
  }
  const handleDeleteCompleted = index => {
    let reduced = [...completedToDo];
    reduced.splice(index);

    localStorage.setItem('completedItems', JSON.stringify(reduced));
    setCompletedToDo(reduced);
  };


  const handleEdit = (ind, item) => {
    console.log(ind);
    setCurrentEdit(ind);
    setCurrentEditedItem(item);
  }
  const handleUpdate = (value) => {
    setCurrentEditedItem((prev) => {
      return { ...prev, title: value }
    })
  }
  const handleUpdateDes = (value) => {
    setCurrentEditedItem((prev) => {
      return { ...prev, description: value }
    })
  }

  const handleUpdateToDo = () => {
    let newToDo = [...allToDo];
      newToDo[currentEdit] = currentEditedItem;
      setAllToDo(newToDo);
      setCurrentEdit("");
  }

  useEffect(() => {
    let savedTodo = JSON.parse(localStorage.getItem('todolist'));
    let savedCompleted = JSON.parse(localStorage.getItem('completedItems'));
    if (savedTodo) {
      setAllToDo(savedTodo);
    }
    if (savedCompleted) {
      setCompletedToDo(savedCompleted);
    }
  }, [])

  return (
    <div>
      <div className='overlay'></div>
    <div className="App">
      <div className='to-do-wrapper'>
        <div className='top-section'>
    <h1 className='title-top'>Duties for today</h1>
    </div>
        <div className='container'>
        <div className='to-do-input'>
          <div className='to-do-input-item'>
            <label>Task Name</label>
            <input type='text' value={newToDo} onChange={(e) => setNewToDo(e.target.value)} placeholder="What's Today's Mission?"></input>
          </div>
          <div className='to-do-input-item'>
            <label>Task Details</label>
            <input type='text' value={newDes} onChange={(e) => setNewDes(e.target.value)} placeholder="Task Clarification.."></input>
          </div>
          <div className='to-do-input-item'>
            <button type='button' onClick={handleAddTask} className='primaryBtn'>Add Task</button>
          </div>
        </div>
        <div className='btn-area'>
          <button className={`secondaryBtn  ${isComplete === false && 'active'}`} onClick={() => setIsComplete(false)}>Active Tasks</button>
          <button className={`secondaryBtn  ${isComplete === true && 'active'}`} onClick={() => setIsComplete(true)}>Done</button>
        </div>
        <div className='to-do-list'>
          {isComplete === false && allToDo.map((item, index) => {
            if (currentEdit === index) {
              return(
              <div className='edit__wrapper' key={index}>
                <input placeholder='Updated'
                  onChange={(e) => handleUpdate(e.target.value)}
                  value={currentEditedItem.title} />
                <textarea placeholder='Updated'
                rows={4}
                  onChange={(e) => handleUpdateDes(e.target.value)}
                  value={currentEditedItem.description} />
                  <button type='button' onClick={handleUpdateToDo} className='primaryBtn'>Update</button>
              </div>
              )
            } else {
              return (
                <div className='to-do-list-item' key={index}>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </div>
                  <div>
                    <IoTrashBinSharp className='icon' onClick={() => handleDelete(index)} title='Delete?' />
                    <BsClipboard2Check className='check-icon' onClick={() => handleCompleted(index)} title='Completed?' />
                    <RiEditLine
                      className='check-icon' onClick={() => handleEdit(index,item)} title='Edit?' />
                  </div>
                </div>
              )
            }
          })}

          {isComplete === true && completedToDo.map((item, index) => {
            return (
              <div className='to-do-list-item' key={index}>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <p>You completed this on: {item.completedOn}</p>
                </div>
                <div>
                  <IoTrashBinSharp className='icon' onClick={() => handleDeleteCompleted(index)} title='Delete?' />
                </div>
              </div>
            )
          })}
        </div>
        </div>
      </div>
    </div>
    </div>
  );
}

export default App;
