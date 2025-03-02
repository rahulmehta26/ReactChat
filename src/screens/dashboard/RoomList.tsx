import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  RefreshControl,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getRooms, type Room } from '@/api/room';
import CustomSafeAreaView from '@/components/CustomSafeAreaView';
import COLORS from '@/constant/color';
import { RFValue } from 'react-native-responsive-fontsize';
// import { useAuth } from "../contexts/AuthContext"

const RoomList: React.FC = ({navigation}: any) => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  // const { user, signOut } = useAuth()

  const fetchRooms = useCallback(async () => {
    try {
      setLoading(true);
      const roomsData = await getRooms();
      setRooms(roomsData);
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch rooms. Please try again.');
      console.error(error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchRooms();
  }, [fetchRooms]);

  const onRefresh = () => {
    setRefreshing(true);
    fetchRooms();
  };

  const renderRoomItem = ({ item }: { item: Room }) => (
    <TouchableOpacity
      style={styles.roomItem}
      onPress={() =>
        navigation.navigate('Chat', { roomId: item.id, roomName: item.name })
      }
    >
      <View style={styles.roomIcon}>
        <Text style={styles.roomIconText}>
          {item.name.charAt(0).toUpperCase()}
        </Text>
      </View>
      <View style={styles.roomInfo}>
        <Text style={styles.roomName}>{item.name}</Text>
        <Text style={styles.roomDate}>
          Created: {new Date(item.createdAt).toLocaleDateString()}
        </Text>
      </View>
      <Ionicons name="chevron-forward" size={24} color={COLORS.gray} />
    </TouchableOpacity>
  );

  return (
    <CustomSafeAreaView>

      <View style={styles.header}>
        <Text style={styles.headerTitle}>Chat Rooms</Text>
        <TouchableOpacity
          style={styles.createButton}
          onPress={() => navigation.navigate('CreateRoom')}
        >
          <Ionicons name="add" size={24} color={COLORS.white} />
        </TouchableOpacity>
      </View>

      <View style={styles.userInfo}>
        <Text style={styles.welcomeText}>
          Welcome, {/* <Text style={styles.username}>{user?.username}</Text> */}
        </Text>
      </View>

      {loading && !refreshing ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="red" />
        </View>
      ) : rooms.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons name="chatbubbles-outline" size={60} color={COLORS.gray} />
          <Text style={styles.emptyText}>No rooms available</Text>
          <Text style={styles.emptySubtext}>
            Create a new room to start chatting
          </Text>
          <TouchableOpacity
            style={styles.createRoomButton}
            onPress={() => navigation.navigate('CreateRoom')}
          >
            <Text style={styles.createRoomButtonText}>Create Room</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={rooms}
          renderItem={renderRoomItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.roomsList}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      )}
    </CustomSafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: COLORS.primary,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray,
    borderTopRightRadius :20
  },
  headerTitle: {
    fontSize: RFValue(20),
    fontWeight: '900',
    color: COLORS.white,
  },
  headerButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  createButton: {
    backgroundColor: '#4A90E2',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userInfo: {
    padding: 15,
    backgroundColor: COLORS.primary,
    marginBottom: 10,
    borderStartEndRadius:20,

  },
  welcomeText: {
    fontSize: RFValue(16),
    color: COLORS.white,
    fontWeight:"700"
  },
  username: {
    fontWeight: 'bold',
    color: COLORS.black,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  roomsList: {
    padding: 10,
  },
  roomItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  roomIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#4A90E2',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  roomIconText: {
    color: COLORS.white,
    fontSize: RFValue(20),
    fontWeight: 'bold',
  },
  roomInfo: {
    flex: 1,
  },
  roomName: {
    fontSize: RFValue(16),
    fontWeight: 'bold',
    color: COLORS.black,
    marginBottom: 5,
  },
  roomDate: {
    fontSize: RFValue(12),
    color: COLORS.darkGray,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: RFValue(18),
    fontWeight: 'bold',
    color: COLORS.darkGray,
    marginTop: 20,
  },
  emptySubtext: {
    fontSize: RFValue(14),
    color: COLORS.darkGray,
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  createRoomButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  createRoomButtonText: {
    color: COLORS.white,
    fontWeight: '900',
  },
});

export default RoomList;
