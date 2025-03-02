import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import RoomList from '@/screens/dashboard/RoomList';
import CreateRoom from '@/screens/dashboard/CreateRoom';
import Chat from '@/screens/dashboard/Chat';
import Profile from '@/screens/dashboard/Profile';
import Setting from '@/screens/dashboard/Setting';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'react-native';
import Login from '@/screens/auth/Login';
import Register from '@/screens/auth/Register';
import COLORS from '@/constant/color';
import { RFValue } from 'react-native-responsive-fontsize';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="RoomList"
        component={RoomList}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CreateRoom"
        component={CreateRoom}
        options={{ title: 'Create Room' }}
      />
      <Stack.Screen
        name="Chat"
        component={Chat}
        options={({ route }) => ({
          title: route.params?.roomName || 'Chat',
          headerBackTitle: 'Rooms',
        })}
      />
    </Stack.Navigator>
  );
}

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Rooms') {
            iconName = focused ? 'chatbubbles' : 'chatbubbles-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          } else if (route.name === 'Settings') {
            iconName = focused ? 'settings' : 'settings-outline';
          }

          return <Ionicons name={iconName} size={size} color={focused ? COLORS.white : '#E0F7F5'} />;
        },
        tabBarStyle: {
          backgroundColor: COLORS.primary, 
          borderTopWidth: 0,
          borderTopLeftRadius:20,
          borderTopRightRadius:20
        },
        tabBarLabelStyle: {
          fontSize: RFValue(14), 
          fontWeight: 'bold',
          marginBottom:10 
        },
        tabBarActiveTintColor: COLORS.white, 
        tabBarInactiveTintColor: '#E0F7F5',
      })}
    >
      <Tab.Screen
        name="Rooms"
        component={MyStack}
        options={{ headerShown: false }}
      />
      <Tab.Screen name="Profile" component={Profile} />
      <Tab.Screen name="Settings" component={Setting} />
    </Tab.Navigator>
  );
}

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="MainTabs">
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Register"
          component={Register}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="MainTabs"
          component={MainTabs}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
      <StatusBar barStyle={"light-content"} backgroundColor={"black"} animated = {true} />
    </NavigationContainer>
  );
};

export default Navigation;
