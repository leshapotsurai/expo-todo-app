import React from "react";
import { TextInput, Button, View, StyleSheet } from "react-native";

function AddTodo({ addTodo, newTodo, setNewTodo }) {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={newTodo}
        onChangeText={setNewTodo}
        placeholder="Введите задачу"
      />
      <Button title="Добавить задачу" onPress={addTodo} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 8,
  },
});

export default AddTodo;
