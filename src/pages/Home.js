import React from "react";
import TodoList from "../components/TodoList";
import TodoForm from "../components/TodoForm";

const Home = () => {
  return (
    <div>
      <TodoForm />
      <TodoList />
    </div>
  );
};

export default Home;
