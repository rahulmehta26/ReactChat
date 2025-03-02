import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { getRoomMessages } from '@/api/messages';
import { createWebSocketConnection } from '@/websocket';
import CustomSafeAreaView from '@/components/CustomSafeAreaView';
import { RFValue } from 'react-native-responsive-fontsize';
import COLORS from '@/constant/color';
// import { useAuth } from "../contexts/AuthContext"

// Define the WebSocketMessage type
type WebSocketMessage = {
  event: string;
  id?: string;
  content?: string;
  username?: string;
  timestamp?: string;
};

// Define the Message type
type Message = {
  id: string;
  content: string;
  username: string;
  roomId: string;
  createdAt: string;
};

// Define the props for the Chat component
type ChatScreenProps = {
  route: {
    params: {
      roomId: string;
      roomName: string;
    };
  };
  navigation: any; 
};

const Chat: React.FC<ChatScreenProps> = ({ route, navigation }) => {
  const { roomId, roomName } = route.params;
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [connecting, setConnecting] = useState<boolean>(true);
  // const { user } = useAuth()
  const username = user?.username || '';
  const webSocketRef = useRef<WebSocket | null>(null);
  const flatListRef = useRef<FlatList<Message>>(null);

  useEffect(() => {
    // Fetch initial messages
    const fetchMessages = async () => {
      try {
        const messagesData = await getRoomMessages(roomId);
        // Only take the last 10 messages
        setMessages(messagesData.slice(-10).reverse());
      } catch (error) {
        Alert.alert('Error', 'Failed to fetch messages');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();

    // Set up WebSocket connection
    const setupWebSocket = () => {
      const ws = createWebSocketConnection(roomId, username);
      webSocketRef.current = ws;

      ws.onopen = () => {
        console.log('WebSocket connection established');
        setConnecting(false);

        // Send join event
        ws.send(JSON.stringify({ event: 'join', username }));
      };

      ws.onmessage = (event) => {
        const data: WebSocketMessage = JSON.parse(event.data);

        if (data.event === 'message') {
          // Add new message to the list
          const newMessage: Message = {
            id: data.id || Date.now().toString(), // Use server-generated ID or fallback to timestamp
            content: data.content,
            username: data.username || '',
            roomId,
            createdAt: data.timestamp || new Date().toISOString(),
          };

          setMessages((prevMessages) => [...prevMessages, newMessage]);

          // Scroll to bottom
          setTimeout(() => {
            flatListRef.current?.scrollToEnd({ animated: true });
          }, 100);
        } else if (data.event === 'join' || data.event === 'leave') {
          // Handle join/leave events
          const systemMessage: Message = {
            id: Date.now().toString(),
            content: `${data.username} has ${
              data.event === 'join' ? 'joined' : 'left'
            } the room`,
            username: 'System',
            roomId,
            createdAt: new Date().toISOString(),
          };

          setMessages((prevMessages) => [...prevMessages, systemMessage]);
        } else if (data.event === 'message_confirmation') {
          // Handle message confirmation
          console.log(`Message with ID ${data.id} was successfully sent`);
        }
      };

      ws.onerror = (error) => {
        console.error('WebSocket error:', error);
        Alert.alert('Connection Error', 'Failed to connect to chat server');
        setConnecting(false);
      };

      ws.onclose = () => {
        console.log('WebSocket connection closed');
      };

      return ws;
    };

    const ws = setupWebSocket();

    // Clean up WebSocket connection on unmount
    return () => {
      if (ws && ws.readyState === WebSocket.OPEN) {
        // Send leave event before closing
        ws.send(JSON.stringify({ event: 'leave', username }));
        ws.close();
      }
    };
  }, [roomId, username]);

  const sendMessage = () => {
    if (
      !inputMessage.trim() ||
      !webSocketRef.current ||
      webSocketRef.current.readyState !== WebSocket.OPEN
    ) {
      return;
    }

    const messageId = Date.now().toString(); // Generate a temporary unique ID
    const messageData: WebSocketMessage = {
      event: 'message',
      id: messageId,
      content: inputMessage.trim(),
      username: username,
    };

    webSocketRef.current.send(JSON.stringify(messageData));
    setInputMessage('');

    // Optimistically add the message to the list
    const newMessage: Message = {
      id: messageId,
      content: inputMessage.trim(),
      username: username,
      roomId,
      createdAt: new Date().toISOString(),
    };
    setMessages((prevMessages) => [...prevMessages, newMessage]);
  };

  const renderMessageItem = ({ item }: { item: Message }) => {
    const isCurrentUser = item.username === username;
    const isSystemMessage = item.username === 'System';

    if (isSystemMessage) {
      return (
        <View style={styles.systemMessageContainer}>
          <Text style={styles.systemMessageText}>{item.content}</Text>
        </View>
      );
    }

    return (
      <View
        style={[
          styles.messageContainer,
          isCurrentUser ? styles.currentUserMessage : styles.otherUserMessage,
        ]}
      >
        {!isCurrentUser && (
          <Text style={styles.messageUsername}>{item.username}</Text>
        )}
        <View
          style={[
            styles.messageBubble,
            isCurrentUser ? styles.currentUserBubble : styles.otherUserBubble,
          ]}
        >
          <Text
            style={[
              styles.messageText,
              isCurrentUser ? styles.currentUserText : styles.otherUserText,
            ]}
          >
            {item.content}
          </Text>
        </View>
        <Text style={styles.messageTime}>
          {new Date(item.createdAt).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </Text>
      </View>
    );
  };

  return (
    <CustomSafeAreaView>
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#4A90E2" />
          <Text style={styles.loadingText}>Loading messages...</Text>
        </View>
      ) : (
        <KeyboardAvoidingView
          style={styles.keyboardAvoidingView}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
        >
          {connecting && (
            <View style={styles.connectingContainer}>
              <Text style={styles.connectingText}>
                Connecting to chat server...
              </Text>
            </View>
          )}

          <FlatList
            ref={flatListRef}
            data={messages}
            renderItem={renderMessageItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.messagesList}
            onLayout={() =>
              flatListRef.current?.scrollToEnd({ animated: false })
            }
          />

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Type a message..."
              value={inputMessage}
              onChangeText={setInputMessage}
              multiline
              disabled={connecting}
            />
            <TouchableOpacity
              style={[
                styles.sendButton,
                (!inputMessage.trim() || connecting) &&
                  styles.sendButtonDisabled,
              ]}
              onPress={sendMessage}
              disabled={!inputMessage.trim() || connecting}
            >
              <Ionicons name="send" size={20} color={COLORS.white} />
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      )}
    </CustomSafeAreaView>
  );
};

const styles = StyleSheet.create({
  keyboardAvoidingView: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    color: COLORS.darkGray,
  },
  connectingContainer: {
    padding: 10,
    backgroundColor: '#FFF9C4',
    alignItems: 'center',
  },
  connectingText: {
    color: '#FFA000',
    fontSize: RFValue(12),
  },
  messagesList: {
    padding: 10,
    paddingBottom: 20,
  },
  messageContainer: {
    marginBottom: 15,
    maxWidth: '80%',
  },
  currentUserMessage: {
    alignSelf: 'flex-end',
  },
  otherUserMessage: {
    alignSelf: 'flex-start',
  },
  messageUsername: {
    fontSize: RFValue(12),
    color: COLORS.darkGray,
    marginBottom: 2,
    marginLeft: 10,
  },
  messageBubble: {
    borderRadius: 18,
    padding: 12,
    marginBottom: 2,
  },
  currentUserBubble: {
    backgroundColor: '#4A90E2',
  },
  otherUserBubble: {
    backgroundColor: '#E5E5EA',
  },
  messageText: {
    fontSize: RFValue(16),
  },
  currentUserText: {
    color: COLORS.white,
  },
  otherUserText: {
    color: COLORS.black,
  },
  messageTime: {
    fontSize: RFValue(10),
    color: '#999',
    alignSelf: 'flex-end',
    marginRight: 5,
  },
  systemMessageContainer: {
    alignItems: 'center',
    marginVertical: 10,
  },
  systemMessageText: {
    fontSize: RFValue(12),
    color: COLORS.darkGray,
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: COLORS.white,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  input: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    maxHeight: 100,
    fontSize: RFValue(16),
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#4A90E2',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  sendButtonDisabled: {
    backgroundColor: '#B0C4DE',
  },
});

export default Chat;
