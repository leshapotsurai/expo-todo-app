import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  FlatList,
  StyleSheet,
  TextInput,
} from "react-native";

function TodoList({ todo, updateTodoStatus, deleteTodo, updateTodoTitle }) {
  const [editingId, setEditingId] = useState(null);
  const [editingValue, setEditingValue] = useState("");

  function startEditing(id, currentTitle) {
    setEditingId(id);
    setEditingValue(currentTitle);
  }

  async function saveEdit(id) {
    if (editingValue.trim()) {
      await updateTodoTitle(id, editingValue);
      setEditingId(null);
      setEditingValue("");
    } else {
      alert("Title cannot be empty!");
    }
  }

  return (
    <FlatList
      data={todo}
      keyExtractor={(item) => item._id}
      renderItem={({ item }) => (
        <View style={styles.todoItem}>
          <Text style={styles.todoText}>
            {item._id === editingId ? (
              <TextInput
                value={editingValue}
                onChangeText={setEditingValue}
                style={styles.input}
                autoFocus
              />
            ) : (
              item.title
            )}
          </Text>
          {item._id === editingId ? (
            <View style={styles.buttonsContainer}>
              <Button
                title="Сохранить"
                onPress={() => saveEdit(item._id)}
                style={styles.button}
              />
              <Button
                title="Отмена"
                onPress={() => setEditingId(null)}
                style={styles.button}
              />
            </View>
          ) : (
            <View style={styles.buttonsContainer}>
              <Button
                title={item.status ? "Не выполнено" : "Выполнено"}
                onPress={() => updateTodoStatus(item._id, !item.status)}
                style={styles.button}
              />
              <Button
                title="Редактировать"
                onPress={() => startEditing(item._id, item.title)}
                style={styles.button}
              />
              <Button
                title="Удалить"
                color="red"
                onPress={() => deleteTodo(item._id)}
                style={styles.button}
              />
            </View>
          )}
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  todoItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  todoText: {
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    fontSize: 18,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    marginBottom: 10,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  button: {
    marginBottom: 5,
  },
});

export default TodoList;
