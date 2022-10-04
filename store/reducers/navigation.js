//import GroupFeedScreen from '../../screens/GroupScreen';
//import { GET_USER_GROUPS } from '../actions/types';
//import MainFeedScreen from '../../screens/MainFeedScreen';
//import { LoginNavigator, GroupPageNav } from '../../navigation/Navigation';
//import { createDrawerNavigator } from "react-navigation-drawer";
//import { LOGOUT } from '../auth/authActions'


/* const initialState = {
    navigationConfig: {
        MainFeed: LoginNavigator
    }    
}

const NavigationReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_USER_GROUPS:
            let navObject = {
                MainFeed: LoginNavigator
            };
            action.data.forEach(group => {
                navObject[group.groupName] = {
                    screen: GroupPageNav,
                }
            })
            
            return {
                navigationConfig: navObject
            }
        case LOGOUT:
            return initialState;
        default:
            return state
    }
}

export default NavigationReducer; */