import { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import "./style.css";
const Todo = () => {

    const [inputdata, setInputdata] = useState("");
    const [items, setItems] = useState([]);
    const [isEditItem, setIsEditItem] = useState("");
    const [toggleButton, setToggleButton] = useState(false);

    useEffect(() => {
        const savedTodo = JSON.parse(localStorage.getItem('react-todo-app-data'));
        if(savedTodo) {
          setItems(savedTodo);
        }
      }, [])    

    useEffect(() => {
        localStorage.setItem('react-todo-app-data', JSON.stringify(items))
      }, [items])
    

    const addItem = () => {
        if(!inputdata) {
            alert('plz fill');
        }else if(inputdata && toggleButton){
            setItems(items.map((curEle)=>{
                if(curEle.id === isEditItem) {
                    return{...curEle, name:inputdata}
                }
                return curEle;
            }));
            setInputdata([]);
            setIsEditItem(null);
            setToggleButton(false);
        }
        else {
            const myNewInputData = {
                id: nanoid(),
                name: inputdata
            }
            setItems([...items, myNewInputData])
            setInputdata("");
        }
    }

    const deleteItem = (index) => {
        const updatedItems = items.filter((curEle) => {
            return (curEle.id !== index)
        });
        
        setItems(updatedItems);
    }

    const removeAll = (index) => {
        setItems([]);
    }

    const editItem = (index) => {
        const items_edited = items.find((curEle) => {
            return (curEle.id === index)
        });
        setInputdata(items_edited.name);
        setIsEditItem(index);
        setToggleButton(true);
    }

    return (
        <>
            <div className="main-div">
                <div className="child-div">
                    <figure>
                        <img src="./todo.svg" alt="todologo"></img>
                        <figcaption>Add Your List Here ✌</figcaption>
                    </figure>
                    <div className="addItems">
                        <input type="text" placeholder="✍ Add Item" className="form-control" value={inputdata} onChange={(event)=> setInputdata(event.target.value)}/>
                        {toggleButton ? (
                            <i className="far fa-edit add-btn" onClick={addItem}></i>
                        ):
                        (<i className="fa fa-plus add-btn" onClick={addItem}></i>)
                        }
                        
                    </div>
                    <div className="showItems">
                        {items.map((curEle)=>{
                            return(
                                <div className="eachItem" key={curEle.id}>
                                    <h3>{curEle.name}</h3>
                                    <div className="todo-btn">
                                    <i className="far fa-edit add-btn" onClick={()=> editItem(curEle.id)}></i>
                                    <i className="far fa-trash-alt add-btn" onClick={()=> deleteItem(curEle.id)}></i>
                                    </div>
                                </div>
                            )
                        })}
                        
                    </div>
                    <div className="showItems">
                        <button className="btn effect04" data-sm-link-text="Remove all" onClick={removeAll}><span>Check List</span></button>
                    </div>
                </div>   
            </div> 
        </>
    )
}

export default Todo
