import React, { useState } from 'react';
import { StyleSheet, View, FlatList, SafeAreaView } from 'react-native';
import { Text, Input, Button, CheckBox, Icon } from '@rneui/themed';

export default function App() {
  // Part 3: Default tasks based on your mockup state
  const [tasks, setTasks] = useState([
    { key: '1', description: 'finish project', completed: false, deadline: 'mar 06, 2026' },
    { key: '2', description: 'do AR concept', completed: false, deadline: 'mar 06, 2026' },
    { key: '3', description: 'finish todo app', completed: true, deadline: 'mar 05, 2026' },
  ]);

  const [input, setInput] = useState('');
  const [hideCompleted, setHideCompleted] = useState(false);

  // Add Task Logic
  const addTask = () => {
    if (input.trim().length > 0) {
      const newTask = {
        key: Date.now().toString(),
        description: input,
        completed: false,
        deadline: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }).toLowerCase(),
      };
      setTasks([...tasks, newTask]);
      setInput('');
    }
  };

  const toggleTask = (key) => {
    setTasks(tasks.map(item => 
      item.key === key ? { ...item, completed: !item.completed } : item
    ));
  };

  // Logic to determine "Overdue" status (Simple comparison for demo)
  const isOverdue = (dateStr) => {
    const taskDate = new Date(dateStr);
    const today = new Date();
    return taskDate < today.setHours(0,0,0,0);
  };

  // Part 2: renderItem function for FlatList
  const renderItem = ({ item }) => (
    <View style={styles.taskCard}>
      <CheckBox
        checked={item.completed}
        onPress={() => toggleTask(item.key)}
        checkedColor="#a29bfe"
        containerStyle={{ padding: 0, margin: 0 }}
      />
      <View style={styles.taskTextContainer}>
        <Text style={[
          styles.taskDescription,
          item.completed && styles.completedText // Part 3: Strikethrough style
        ]}>
          {item.description}
        </Text>
        <View style={styles.dateRow}>
          <Text style={styles.dateText}>{item.deadline}</Text>
          {isOverdue(item.deadline) && !item.completed && (
            <Text style={styles.overdueTag}>Overdue</Text>
          )}
        </View>
      </View>
    </View>
  );

  const activeCount = tasks.filter(t => !t.completed).length;
  const completedCount = tasks.filter(t => t.completed).length;

  return (
    <SafeAreaView style={styles.container}>
      {/* Header section from mockup */}
      <View style={styles.header}>
        <View>
          <Text h3 style={styles.titleText}>TaskFlow</Text>
          <Text style={styles.userSubtext}>Salem Freya</Text>
        </View>
        <Icon name="logout" type="material" color="#757575" />
      </View>

      {/* Stats Dashboard */}
      <View style={styles.statsRow}>
        <View style={[styles.statBox, styles.pinkBox]}>
          <Text style={styles.statLabel}>Active</Text>
          <Text style={styles.statNumber}>{activeCount}</Text>
        </View>
        <View style={[styles.statBox, styles.purpleBox]}>
          <Text style={styles.statLabel}>Completed</Text>
          <Text style={styles.statNumber}>{completedCount}</Text>
        </View>
      </View>

      {/* Input Section */}
      <View style={styles.inputArea}>
        <Input
          placeholder="What do you need to do?"
          value={input}
          onChangeText={setInput}
          inputContainerStyle={{ borderBottomWidth: 0 }}
        />
        <View style={styles.inputButtons}>
          <Button 
            title="Pick a Deadline" 
            type="clear" 
            titleStyle={{ color: '#757575', fontSize: 14 }}
            icon={{ name: 'calendar-today', color: '#757575', size: 18 }}
          />
          <Button 
            title="Add" 
            onPress={addTask} 
            buttonStyle={styles.addButton}
          />
        </View>
      </View>

      {/* Visibility Toggle */}
      <CheckBox
        title="Hide completed tasks"
        checked={hideCompleted}
        onPress={() => setHideCompleted(!hideCompleted)}
        containerStyle={styles.hideToggle}
        textStyle={{ color: '#757575', fontWeight: 'normal' }}
      />

      {/* Part 2: FlatList Implementation */}
      <FlatList
        data={tasks.filter(t => hideCompleted ? !t.completed : true)}
        renderItem={renderItem}
        keyExtractor={(item) => item.key}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f9f9f7', paddingHorizontal: 20 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 20, marginBottom: 20 },
  titleText: { color: '#ee9ca7', fontWeight: 'bold' },
  userSubtext: { color: '#757575', fontSize: 14 },
  statsRow: { flexDirection: 'row', gap: 15, marginBottom: 25 },
  statBox: { flex: 1, padding: 15, borderRadius: 20, elevation: 2 },
  pinkBox: { backgroundColor: '#ffe4e8' },
  purpleBox: { backgroundColor: '#f0ebff' },
  statLabel: { color: '#757575', fontSize: 14 },
  statNumber: { fontSize: 24, fontWeight: 'bold', color: '#333' },
  inputArea: { backgroundColor: '#fff', borderRadius: 20, padding: 10, marginBottom: 10, elevation: 1 },
  inputButtons: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  addButton: { backgroundColor: '#c5b3e3', borderRadius: 12, paddingHorizontal: 25 },
  hideToggle: { backgroundColor: 'transparent', borderWidth: 0, padding: 0, marginBottom: 15 },
  taskCard: { flexDirection: 'row', backgroundColor: '#fff', padding: 15, borderRadius: 20, marginBottom: 10, alignItems: 'center', elevation: 1 },
  taskTextContainer: { flex: 1, marginLeft: 10 },
  taskDescription: { fontSize: 16, color: '#333' },
  completedText: { textDecorationLine: 'line-through', textDecorationStyle: 'solid', color: '#aaa' },
  dateRow: { flexDirection: 'row', alignItems: 'center' },
  dateText: { fontSize: 12, color: '#757575' },
  overdueTag: { color: '#ff4d4d', fontSize: 12, fontWeight: 'bold', marginLeft: 10 }
});