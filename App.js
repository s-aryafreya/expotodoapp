import React, { useState } from 'react';
import { StyleSheet, View, FlatList, SafeAreaView, Dimensions } from 'react-native';
import { Text, Input, Button, CheckBox, Icon } from '@rneui/themed';

const { width } = Dimensions.get('window');

export default function App() {
  const [tasks, setTasks] = useState([
    { key: '1', description: 'finish project', completed: false, deadline: 'mar 06, 2026' },
    { key: '2', description: 'do AR concept', completed: false, deadline: 'mar 06, 2026' },
    { key: '3', description: 'finish todo app', completed: true, deadline: 'mar 05, 2026' },
  ]);

  const [input, setInput] = useState('');

  // Function to add a new task to the list
  const addTask = () => {
    if (input.trim().length > 0) {
      const newTask = {
        key: Date.now().toString(),
        description: input,
        completed: false,
        deadline: new Date().toLocaleDateString('en-US', { 
          month: 'short', 
          day: '2-digit', 
          year: 'numeric' 
        }).toLowerCase(),
      };
      setTasks([...tasks, newTask]);
      setInput(''); // Clear input after adding
    }
  };

  // COMPLETE TASK FUNCTIONALITY: 
  // This toggles the 'completed' boolean when the checkbox is clicked
  const toggleTask = (key) => {
    setTasks(prevTasks => 
      prevTasks.map(item => 
        item.key === key ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const renderItem = ({ item }) => (
    <View style={styles.taskCard}>
      <CheckBox
        checked={item.completed}
        onPress={() => toggleTask(item.key)} // Trigger toggle here
        checkedColor="#c5b3e3"
        uncheckedColor="#ddd"
        containerStyle={{ padding: 0, margin: 0 }}
      />
      <View style={styles.taskTextContainer}>
        <Text style={[
          styles.taskDescription, 
          item.completed && styles.completedText // Strikethrough logic
        ]}>
          {item.description}
        </Text>
        <Text style={styles.dateText}>{item.deadline}</Text>
      </View>
    </View>
  );

  // Dynamic stats calculation
  const activeCount = tasks.filter(t => !t.completed).length;
  const completedCount = tasks.filter(t => t.completed).length;

  return (
    <SafeAreaView style={styles.outerContainer}>
      <View style={styles.innerContainer}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text h2 style={styles.titleText}>todo</Text>
            <Text style={styles.userSubtext}>Salem Freya</Text>
          </View>
          <Icon name="account-circle" type="material" color="#757575" size={30} />
        </View>

        {/* Dashboard Stats */}
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

        {/* Input Area */}
        <View style={styles.inputArea}>
          <Input
            placeholder="Add a new task..."
            value={input}
            onChangeText={setInput}
            onSubmitEditing={addTask} // Adds task when 'Enter' is pressed
            inputContainerStyle={{ borderBottomWidth: 0 }}
            containerStyle={{ height: 50 }}
          />
          <View style={styles.inputButtons}>
            <Button 
              title="Add Task" 
              onPress={addTask} 
              buttonStyle={styles.addButton}
              titleStyle={{ fontSize: 14, fontWeight: 'bold' }}
            />
          </View>
        </View>

        {/* Task List */}
        <FlatList
          data={tasks}
          renderItem={renderItem}
          keyExtractor={(item) => item.key}
          contentContainerStyle={{ paddingBottom: 40 }}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  outerContainer: { 
    flex: 1, 
    backgroundColor: '#fdfbfb', 
    alignItems: 'center' 
  },
  innerContainer: { 
    width: width > 600 ? 500 : '90%', 
    flex: 1,
    paddingTop: 40
  },
  header: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    marginBottom: 30 
  },
  titleText: { 
    color: '#ee9ca7', 
    fontWeight: '900', 
    letterSpacing: -1 
  },
  userSubtext: { 
    color: '#a0a0a0', 
    fontSize: 14, 
    marginTop: -5 
  },
  statsRow: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    marginBottom: 30 
  },
  statBox: { 
    width: '47%', 
    padding: 20, 
    borderRadius: 25, 
    elevation: 2
  },
  pinkBox: { backgroundColor: '#fff0f3' },
  purpleBox: { backgroundColor: '#f3f0ff' },
  statLabel: { color: '#888', fontSize: 13, fontWeight: '600' },
  statNumber: { fontSize: 32, fontWeight: 'bold', color: '#444' },
  inputArea: { 
    backgroundColor: '#fff', 
    borderRadius: 20, 
    padding: 15, 
    marginBottom: 25,
    elevation: 3
  },
  inputButtons: { 
    alignItems: 'flex-end',
    marginTop: 5 
  },
  addButton: { 
    backgroundColor: '#c5b3e3', 
    borderRadius: 15, 
    paddingHorizontal: 20 
  },
  taskCard: { 
    flexDirection: 'row', 
    backgroundColor: '#fff', 
    padding: 18, 
    borderRadius: 22, 
    marginBottom: 12, 
    alignItems: 'center',
    elevation: 1
  },
  taskTextContainer: { flex: 1, marginLeft: 10 },
  taskDescription: { fontSize: 16, color: '#444', fontWeight: '500' },
  completedText: { 
    textDecorationLine: 'line-through', 
    textDecorationStyle: 'solid', 
    color: '#ccc' 
  },
  dateText: { fontSize: 11, color: '#bbb', marginTop: 2 }
});