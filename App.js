import React, { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import axios from "axios";
import TodoList from "./components/TodoList";
import AddTodo from "./components/AddTodo";

export default function App() {
  const [todo, setTodo] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    async function fetchTodos() {
      try {
        const response = await axios.get("http://localhost:5000/todos");
        setTodo(response.data);
      } catch (error) {
        console.error("Ошибка при получении задач:", error);
      }
    }

    fetchTodos();
  }, []);

  async function addTodo() {
    if (newTodo.trim()) {
      try {
        const response = await axios.post("http://localhost:5000/todos", {
          title: newTodo,
          status: false,
        });
        setTodo((prevTodos) => [...prevTodos, response.data]);
        setNewTodo("");
      } catch (error) {
        console.error("Ошибка при добавлении задачи:", error);
      }
    }
  }

  async function updateTodoTitle(id, title) {
    try {
      const response = await axios.put(`http://localhost:5000/todos/${id}`, {
        title,
      });
      setTodo(todo.map((item) => (item._id === id ? response.data : item)));
    } catch (error) {
      console.error("Ошибка при обновлении задачи:", error);
    }
  }

  async function updateTodoStatus(id, status) {
    try {
      const response = await axios.put(`http://localhost:5000/todos/${id}`, {
        status,
      });
      setTodo(todo.map((item) => (item._id === id ? response.data : item)));
    } catch (error) {
      console.error("Ошибка при обновлении задачи:", error);
    }
  }

  async function deleteTodo(id) {
    try {
      await axios.delete(`http://localhost:5000/todos/${id}`);
      setTodo(todo.filter((item) => item._id !== id));
    } catch (error) {
      console.error("Ошибка при удалении задачи:", error);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>ToDo List</Text>

      <AddTodo addTodo={addTodo} newTodo={newTodo} setNewTodo={setNewTodo} />

      <TodoList
        todo={todo}
        updateTodoTitle={updateTodoTitle}
        updateTodoStatus={updateTodoStatus}
        deleteTodo={deleteTodo}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "flex-start",
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 30,
    textAlign: "center",
    marginBottom: 20,
  },
});
