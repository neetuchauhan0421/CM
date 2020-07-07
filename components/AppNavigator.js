import { createStackNavigator, createAppContainer } from 'react-navigation';
import SignIn from './SignIn.js';
import SignUp from './Signup1.js';
import EmailConfirmation from './EmailConfirmation';

import NewContactRequest from './NewContactRequest.js';
import NewContactRequestNewUser from './NewContactRequestNewUser.js';
import NewMeetingRequest from './NewMeetingRequest.js';
import ContactSelector from './ContactSelector.js';
import ShareDetails from './ShareDetails.js';

import TaskList from './Task/TaskList.js';
import Card from './Card';

import OptionsMenu from './TinyComponents/OptionsMenuDashboard.js';
import DashboardCard from './TinyComponents/DashboardCard.js';

import BottomNavigator from './BottomNavigator.js';

import Dashboard from './Dashboard';
import Contacts from './Contacts';
import Meetings from './Meetings.js';
import ViewProfile from './ViewProfile.js';
import ViewProfileFromOptionsMenu from './ViewProfileFromOptionsMenu.js';

import EditProfile from './EditProfile.js';
import EditProfileNewUser from './EditProfileNewUser';
import EditProfileNewUser2 from './EditProfileNewUser2';

import AcceptedTaskList from './Task/AcceptedTaskList';
import DeniedTaskList from './Task/DeniedTaskList';

import AcceptedContactList from './ContactList/AcceptedContacts';
import DeniedContactList from './ContactList/DeniedContacts';

import AcceptedMeetings from './MeetingList/AcceptedMeetings';
import DeniedMeetings from './MeetingList/DeniedMeetings';
import CreateProfile from './CreateProfile';
import Temperory from './TinyComponents/Temperory';
import ImagePick from './ImagePick';

const RootStack = createStackNavigator({
SignIn: {
      screen: SignIn,
      navigationOptions: {
         header: null,
      },
   },

   BottomNavigator: {
      screen: BottomNavigator,
      navigationOptions: {
         header: null,
      },
   },

   
   Meetings: {
      screen: Meetings,
      navigationOptions: {
         header: null,
      },
   },

 
   Card: {
      screen: Card,
      navigationOptions: {
         header: null,
      },
   },


 
   ContactSelector: {
      screen: ContactSelector,
      navigationOptions: {
         title: 'Meeting Request',
         headerStyle: {
            backgroundColor: '#000000',
         },
         headerTintColor: '#fff',
         headerTitleStyle: {
            fontWeight: 'bold',
            textAlign: "center",
         },
      },
   },

   ViewProfile: {
      screen: ViewProfile,
      navigationOptions: {
         header: null,
      },
   },

   CreateProfile: {
      screen: CreateProfile,
      navigationOptions: {
         header: null,
      },
   },

   EditProfile: {
      screen: EditProfile,
      navigationOptions: {
         title: 'Edit Profile',
         headerStyle: {
            backgroundColor: '#000000',
         },
         headerTintColor: '#fff',
         headerTitleStyle: {
            fontWeight: 'bold',
            textAlign: "center",
         },
      },
   },                  

   SignUp: {
      screen: SignUp,
      navigationOptions: {
         header: null,
      },
   },


  
   
   ImagePick: {
      screen: ImagePick,
      navigationOptions: {
         title: 'Select Profile image',
         headerStyle: {
            backgroundColor: '#000000',
         },
         headerTintColor: '#fff',
         headerTitleStyle: {
            fontWeight: 'bold',
            textAlign: "center",
         },
      },
   },
  



   ShareDetails: {
      screen: ShareDetails,
      navigationOptions: {
         title: 'Share your Details',
         headerStyle: {
            backgroundColor: '#000000',
         },
         headerTintColor: '#fff',
         headerTitleStyle: {
            fontWeight: 'bold',
            textAlign: "center",
         },
      },
   },


 

   Contacts: {
      screen: Contacts,
      navigationOptions: {
         header: null,
      },
   },

 
   DeniedMeetings: {
      screen: DeniedMeetings,
      navigationOptions: {
         header: null,
      },
   },


   AcceptedMeetings: {
      screen: AcceptedMeetings,
      navigationOptions: {
         header: null,
      },
   },


   DeniedContactList: {
      screen: DeniedContactList,
      navigationOptions: {
         header: null,
      },
   },

   AcceptedContactList: {
      screen: AcceptedContactList,
      navigationOptions: {
         header: null,
      },
   },

   DeniedTaskList: {
      screen: DeniedTaskList,
      navigationOptions: {
         header: null,
      },
   },

    AcceptedTaskList: {
      screen: AcceptedTaskList,
      navigationOptions: {
         header: null,
      },
   },
 
  
   
   Temperory: {
      screen: Temperory,
      navigationOptions: {
         header: null,
      },
   },













   NewMeetingRequest: {
      screen: NewMeetingRequest,
      navigationOptions: {
         title: 'Meeting Request',
         headerStyle: {
            backgroundColor: '#000000',
         },
         headerTintColor: '#fff',
         headerTitleStyle: {
            fontWeight: 'bold',
            textAlign: "center",
         },
      },
   },


   NewContactRequest: {
      screen: NewContactRequest,
      navigationOptions: {
         title: 'Contact Request',

         headerStyle: {
            backgroundColor: '#000000',
         },
         headerTintColor: '#fff',
         headerTitleStyle: {
            fontWeight: 'bold',
            textAlign: 'center',
            alignSelf: 'center'
         },
      },
   },

   NewContactRequestNewUser: {
      screen: NewContactRequestNewUser,
      navigationOptions: {
         title: 'Contact Request',
         header: null,
         headerStyle: {
            backgroundColor: '#000000',
         },
         headerTintColor: '#fff',
         headerTitleStyle: {
            fontWeight: 'bold',
            textAlign: 'center',
            alignSelf: 'center'
         },
      },
   },






   EditProfileNewUser2: {
      screen: EditProfileNewUser2,
      navigationOptions: {
         header: null,
      },
   },



   EditProfileNewUser: {
      screen: EditProfileNewUser,
      navigationOptions: {
         header: null,
      },
   },




   ViewProfileFromOptionsMenu: {
      screen: ViewProfileFromOptionsMenu,
      navigationOptions: {
         title: 'View Profile',
         headerStyle: {
            backgroundColor: '#000000',
         },
         headerTintColor: '#fff',
         headerTitleStyle: {
            fontWeight: 'bold',
            textAlign: "center",
         },
      },
   },



   OptionsMenu: {
      screen: OptionsMenu,
      navigationOptions: {
         header: null,
      },
   },






   DashboardCard: {
      screen: DashboardCard,
      navigationOptions: {
         title: 'Contact List',
      },
   },

   TaskList: {
      screen: TaskList,
      navigationOptions: {
         header: null,
      },
   },



   EmailConfirmation: {
      screen: EmailConfirmation,
      navigationOptions: {
         title: 'Resend Email',
         headerStyle: {
            backgroundColor: '#000000',
         },
         headerTintColor: '#fff',
         headerTitleStyle: {
            fontWeight: 'bold',
            textAlign: "center",
         },
      },
   },


},


);
const AppNavigator = createAppContainer(RootStack);
export default AppNavigator;