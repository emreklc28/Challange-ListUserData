import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Button,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import axios from 'axios';

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
}

export default function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [shouldFetch, setShouldFetch] = useState<boolean>(false); // Buton kontrolü

  useEffect(() => {
    if (!shouldFetch) return;
      setLoading(true);
    const fetchUsers = async () => {
      try {
        const response = await axios.get<User[]>('https://jsonplaceholder.typicode.com/users');
        setUsers(response.data);
      } catch (error) {
        console.error('Veri çekme hatası:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [shouldFetch]);

  const renderItem = ({ item }: { item: User }) => (
    <View style={styles.item}>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.email}>{item.email}</Text>
      <Text style={styles.phone}>{item.phone}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.listContainer}>
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <FlatList
            data={users}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderItem}
            ListEmptyComponent={
              <Text style={styles.infoText}>Henüz veri yüklenmedi.</Text>
            }
          />
        )}
      </View>

      <View style={styles.buttonContainer}>
        <Button title="Verileri Getir" onPress={() => setShouldFetch(true)} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  listContainer: {
    flex: 1,
    padding: 16,
  },
  item: {
    padding: 12,
    marginBottom: 10,
    backgroundColor: '#f2f2f2',
    borderRadius: 8,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  email: {
    color: '#007BFF',
    marginTop: 4,
  },
  phone: {
    color: '#28a745',
    marginTop: 2,
  },
  infoText: {
    textAlign: 'center',
    color: '#888',
    marginTop: 20,
  },
  buttonContainer: {
    padding: 16,
    borderTopWidth: 1,
    borderColor: '#eee',
    backgroundColor: '#fff',
  },
});
