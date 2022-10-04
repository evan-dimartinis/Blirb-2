import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer, StackActions } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome";
import Auth from "../Screens/Auth";
import Feed from "../Screens/Feed";
import Lists from "../Screens/Lists";
import Colors from "../custom_components/Colors";
import Add from "../Screens/Add";
import PodcastEpisodes from "../Screens/PodcastEpisodes";
import UserSearch from "../Screens/UserSearch";
import User from "../Screens/User";
import Groups from "../Screens/Groups";
import EditGroup from "../Screens/EditGroup";

const Navigator = (props) => {
  const Tabs = createBottomTabNavigator();
  const AddStack = createNativeStackNavigator();
  const SearchStack = createNativeStackNavigator();
  const GroupStack = createNativeStackNavigator();

  const AddStackView = () => {
    return (
      <AddStack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <AddStack.Screen name="AddMain" component={Add} />
        <AddStack.Screen name="AddEpisode" component={PodcastEpisodes} />
      </AddStack.Navigator>
    );
  };

  const GroupStackView = () => {
    return (
      <GroupStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      >
        <GroupStack.Screen component={Groups} name="GroupsMain" />
        <GroupStack.Screen component={EditGroup} name="EditGroup" />
      </GroupStack.Navigator>
    )
  }

  const SearchStackView = () => {
    return (
      <SearchStack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <SearchStack.Screen name={"UserSearchMain"} component={UserSearch} />
        <SearchStack.Screen name="User" component={User} />
      </SearchStack.Navigator>
    );
  };

  const TabView = () => {
    return (
      <NavigationContainer>
        <Tabs.Navigator
          screenOptions={{
            tabBarStyle: {
              backgroundColor: Colors.primary,
            },
            header: ({}) => {
              return false;
            },
          }}
        >
          <Tabs.Screen
            name="Feed"
            component={Feed}
            options={{
              tabBarIcon: ({ focused, color, size }) => (
                <Icon
                  name={"home"}
                  size={30}
                  color={focused ? Colors.secondary : "white"}
                />
              ),
              tabBarLabel: ({}) => {
                return false;
              },
            }}
          />
          <Tabs.Screen
            name="Lists"
            component={Lists}
            options={{
              tabBarIcon: ({ focused, color, size }) => (
                <Icon
                  name={"reorder"}
                  size={30}
                  color={focused ? Colors.secondary : "white"}
                />
              ),
              tabBarLabel: ({}) => {
                return false;
              },
            }}
          />
          <Tabs.Screen
            name="Add"
            component={AddStackView}
            options={{
              tabBarIcon: ({ focused, color, size }) => (
                <Icon
                  name={"plus"}
                  size={30}
                  color={focused ? Colors.secondary : "white"}
                />
              ),
              tabBarLabel: ({}) => {
                return false;
              },
            }}
          />
          <Tabs.Screen
            name="Search"
            component={SearchStackView}
            options={{
              tabBarIcon: ({ focused, color, size }) => (
                <Icon
                  name={"search"}
                  size={30}
                  color={focused ? Colors.secondary : "white"}
                />
              ),
              tabBarLabel: ({}) => {
                return false;
              },
            }}
          />
          <Tabs.Screen
            name="Groups"
            component={GroupStackView}
            options={{
              tabBarIcon: ({ focused, color, size }) => (
                <Icon
                  name={"group"}
                  size={30}
                  color={focused ? Colors.secondary : "white"}
                />
              ),
              tabBarLabel: ({}) => {
                return false;
              },
            }}
          />
        </Tabs.Navigator>
      </NavigationContainer>
    );
  };

  const Main = createSwitchNavigator({
    Tabs: TabView,
    Auth: Auth,
  });

  const Nav = createAppContainer(Main);

  return <Nav />;
};

export default Navigator;
