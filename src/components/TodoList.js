import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTodos, deleteTodo, updateTodo } from "../redux/actions/todoActions";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const TodoList = () => {
  const dispatch = useDispatch();
  const { todos, loading } = useSelector((state) => state.todos);

  const [editTodo, setEditTodo] = useState(null);
  const [formData, setFormData] = useState({ name: "", description: "" });

  useEffect(() => {
    dispatch(getTodos());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteTodo(id));
  };

  const handleEditClick = (todo) => {
    setEditTodo(todo);
    setFormData({ name: todo.name, description: todo.description });
  };

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    dispatch(updateTodo(editTodo._id, formData));
    setEditTodo(null);
    setFormData({ name: "", description: "" });
  };

  const handleCancelEdit = () => {
    setEditTodo(null);
    setFormData({ name: "", description: "" });
  };

  const handleCheckboxChange = (todo) => {
    const updatedTodo = { ...todo, completed: !todo.completed };
    dispatch(updateTodo(todo._id, updatedTodo));
  };

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">All Tasks</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {todos.map((todo) => (
          <div
            key={todo._id}
            className={`bg-white shadow-md border-t-4 rounded-lg p-4 overflow-hidden ${
              todo.completed ? "border-t-green-500" : "border-t-red-500"
            }`}
          >
            {editTodo && editTodo._id === todo._id ? (
              <form onSubmit={handleUpdate} className="space-y-2">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleFormChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="Task Name"
                  required
                />
                <input
                  type="text"
                  name="description"
                  value={formData.description}
                  onChange={handleFormChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="Description"
                />
                <div className="flex justify-end space-x-2">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded-md"
                  >
                    Update
                  </button>
                  <button
                    type="button"
                    onClick={handleCancelEdit}
                    className="px-4 py-2 bg-gray-400 text-white rounded-md"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <>
                <h2 className="text-xl font-semibold mb-2 p-1 rounded-md w-fit text-center text-white bg-gray-500 break-words">
                  {todo.name}
                </h2>
              </>
            )}
            {!editTodo || editTodo._id !== todo._id ? (
              <>
                <p className="text-gray-600 mb-4 overflow-hidden break-words">
                  {todo.description}
                </p>
                <div className="flex justify-end items-center">
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => handleCheckboxChange(todo)}
                    className="form-checkbox h-5 w-5 text-green-500"
                  />
                  <button
                    onClick={() => handleEditClick(todo)}
                    className="px-3 py-1 text-blue-500 hover:underline"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(todo._id)}
                    className="px-3 py-1 text-red-500 hover:underline"
                  >
                    <MdDelete />
                  </button>
                </div>
              </>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodoList;
