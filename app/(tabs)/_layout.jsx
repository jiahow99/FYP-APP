import React, { useEffect } from 'react'
import { Tabs } from 'expo-router'
import HomeTab from '../../component/tabs/HomeTab'
import RepairTab from '../../component/tabs/RepairTab'
import MapTab from '../../component/tabs/MapTab'
import ProfileTab from '../../component/tabs/ProfileTab'
import { observer } from 'mobx-react'
import { trackingStore } from '../../store/TrackingStore'
import messaging from '@react-native-firebase/messaging';
import { userStore } from '../../store/UserStore';

const _layouts = observer(() => {
  const { location } = userStore;
  const { initTracking, completeTracking, setTrackingInfo } = trackingStore;
  // Background message
  messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Message handled in the background!', remoteMessage);
  });
  // Foreground message
  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      const {status, storeName, trackingId, mechanic} = remoteMessage.data;
      // If accepted, show movement modal with tracking info
      // If rejected, show alert
      switch (status) {
        case 'accepted':
          initTracking(trackingId, mechanic);
          break;
        case 'completed':
          completeTracking(trackingId);
          break;
        case 'rejected':
          alert(`${storeName} rejected your request.`)
          break;
      
        default:
          break;
      }
    });

    return unsubscribe;
  }, []);

  return (
    <Tabs screenOptions={{ 
      tabBarStyle: {
        backgroundColor: '#424242',
        height: 70,
      },
      tabBarHideOnKeyboard: true
    }}>
      <Tabs.Screen 
        name="home" 
        options={{ 
          tabBarIcon: ({focused}) => <HomeTab focused={focused} />,
          tabBarShowLabel: false,
        }}     
      />

      <Tabs.Screen 
        name="repair" 
        options={{ 
          tabBarIcon: ({focused}) => <RepairTab focused={focused} />,
          tabBarShowLabel: false,
          headerShown: false
        }}     
      />

      <Tabs.Screen 
        name="map" 
        options={{ 
          headerShown: false,
          tabBarIcon: () => <MapTab />,
          tabBarStyle: {display: 'none'}
        }}     
      />

      <Tabs.Screen 
        name="shopcart" 
        options={{ 
          tabBarIcon: ({focused}) => <ProfileTab focused={focused} />,
          tabBarShowLabel: false,
          headerShown: false,
          tabBarStyle: {display: 'none'}
        }}     
      />

      {/* <Tabs.Screen
        name="shopcart"
        options={{
          href: null,
          headerShown: false,
          tabBarStyle: {display: 'none'},
        }}
      /> */}

      <Tabs.Screen
        name="tyre"
        options={{
          href: null,
          headerShown: false,
          tabBarStyle: {display: 'none'}
        }}
      />

      <Tabs.Screen
        name="parts"
        options={{
          href: null,
          headerShown: false,
          tabBarStyle: {display: 'none'}
        }}
      />
    </Tabs>
  )
})

export default _layouts