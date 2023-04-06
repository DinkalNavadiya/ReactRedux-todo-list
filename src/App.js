import { useRef, useState } from 'react';
import { connect } from 'react-redux';
import './App.css';
import { addTodos, deleteTodos, EditTodos } from './reducers/reducer'

const mapStateToProps = (state) => {
  return {
    todos: state,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addTodo: (obj) => dispatch(addTodos(obj)),
    deleteTodos: (id) => dispatch(deleteTodos(id)),
    EditTodos: (obj) => dispatch(EditTodos(obj)),
  }
}

const getLocalinput = () => {
  let lists = localStorage.getItem('list');
  console.log(lists)
}

const App = (props) => {
  const [input, setInput] = useState(getLocalinput);
  const inputRef = useRef(true);
  const changeFocus = () => {
    inputRef.current.disabled = false;
    inputRef.current.focus();
  }

  const update = (id, value, e) => {
    if (e.which === 13) {
      props.EditTodos({ id, item: value });
      inputRef.current.disabled = true;
    }
  }

  const handleChange = (e) => {
    setInput(e.target.value);
  }

  const add = () => {
    if (input === "") {
      alert("field the data");
    }
    else {
      props.addTodo({
        id: Math.floor(Math.random() * 1000),
        item: input,
      })
      setInput('')
    }
  }
  return (
    <>
    <h1>Redux todo list</h1>
      <input type="text" onChange={handleChange} value={input} />
      <button onClick={() => add()}>Add</button>
      <br />
      <ul>
        {
          props.todos && props.todos.map((item) => {
            return (
              <>
                <li key={item.id}>
                  <button onClick={() => props.deleteTodos(item.id)}>delete</button>
                  <button onClick={() => changeFocus()}>Edit</button>
                  <textarea
                    ref={inputRef}
                    disabled={inputRef}
                    defaultValue={item.item}
                    onKeyPress={(e) => update(item.id, inputRef.current.value, e)}
                  />
                </li> <br />
              </>
            )
          })
        }
      </ul>
    </>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
