import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addTodo } from "../redux/actions/todoActions";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TodoForm = () => {
  const [formData, setFormData] = useState({ name: "", description: "" });
  const [errors, setErrors] = useState({ name: "", description: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const validate = () => {
    let isValid = true;
    let newErrors = { name: "", description: "" };

    if (!formData.name.trim()) {
      newErrors.name = "Todo Name is required.";
      isValid = false;
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      dispatch(addTodo(formData));
      toast.success("Todo added to the list!");
      setFormData({ name: "", description: "" });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setTimeout(() => {
      navigate("/login");
    }, 0);
  };

  return (
    <div className="relative mx-auto mt-8 p-6 bg-white shadow-lg rounded-lg max-w-4xl">
      <button
        onClick={handleLogout}
        className="absolute top-4 right-4 px-4 py-2 bg-red-500 text-white font-medium rounded-md hover:bg-red-600 focus:outline-none focus:bg-red-700 transition duration-200"
      >
        Logout
      </button>
      <h2 className="text-2xl font-bold mb-6 text-gray-700">Add Todo</h2>
      <form onSubmit={handleSubmit} className="flex flex-wrap gap-4">
        <div className="flex-1 min-w-[200px]">
          <label
            htmlFor="name"
            className="block text-gray-600 font-medium mb-2"
          >
            Todo Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`w-full px-4 py-2 border ${
              errors.name ? "border-red-500" : "border-gray-300"
            } rounded-md focus:outline-none focus:border-blue-500 transition duration-200`}
            placeholder="Enter Todo Name"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name}</p>
          )}
        </div>
        <div className="flex-1 min-w-[200px]">
          <label
            htmlFor="description"
            className="block text-gray-600 font-medium mb-2"
          >
            Description
          </label>
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className={`w-full px-4 py-2 border ${
              errors.description ? "border-red-500" : "border-gray-300"
            } rounded-md focus:outline-none focus:border-blue-500 transition duration-200`}
            placeholder="Enter Description"
          />
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">{errors.description}</p>
          )}
        </div>
        <div className="w-full flex items-center justify-center mt-4">
          <button
            type="submit"
            className="w-full sm:w-auto px-4 py-1.5 bg-green-500 text-white font-medium rounded-md hover:bg-green-600 focus:outline-none focus:bg-green-700 transition duration-200"
          >
            Add Todo
          </button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default TodoForm;
