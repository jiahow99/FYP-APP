import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import auth from '@react-native-firebase/auth';
import { Stack, router, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Octicons } from '@expo/vector-icons'; 
import { Feather } from '@expo/vector-icons'; 
import { Image } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import RequestReceived from '../../component/mechanic/RequestReceived';
import { notificationStore } from '../../store/NotificationStore';
import messaging from '@react-native-firebase/messaging';
import StoreInfo from '../../component/mechanic/StoreInfo';
import Ongoing from '../../component/mechanic/Ongoing';
import Completed from '../../component/mechanic/Completed';
import Pending from '../../component/mechanic/Pending';
import PendingRequest from '../../component/mechanic/PendingRequest';
import HeaderRight from '../../component/mechanic/HeaderRight';
import TyreRequestReceived from '../../component/mechanic/TyreRequestReceived';
import MovementTracking from '../../component/mechanic/MovementTracking';
import { useRef } from 'react';
import { trackingStore } from '../../store/TrackingStore';
import { observer } from 'mobx-react';
import WazeModal from '../../component/WazeModal';

const home = observer(() => {
  // Ref
  const modalRef = useRef(null);

  const { toggleModal, toggleTyreModal, setRequestInfo } = notificationStore;
  const { setUserLocation, setTrackingInfo } = trackingStore;
  
  // Listen to request
  messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Message handled in the background!', remoteMessage);
  });
  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      setUserLocation({
        latitude: remoteMessage.data.userLatitude,
        longitude: remoteMessage.data.userLongitude
      });
      setRequestInfo(remoteMessage.data);
      setTrackingInfo(remoteMessage.data);
      if (remoteMessage.data.inch) {
        toggleTyreModal(true, remoteMessage.data);
      } else {
        toggleModal(true, remoteMessage.data);
      }
    });

    return unsubscribe;
  }, []);

  return (
    <>
    <Stack.Screen options={{ 
      headerStyle: {
        backgroundColor: '#FFFFFF'
      },
      headerTitle: 'Mechanic Dashboard',
      headerTitleStyle: {
        fontWeight: 'bold',
        fontSize: 16,
      },
      headerBackVisible: false,
      headerRight: (props) => (<HeaderRight {...props} />)
     }} />

    <View className="bg-[#F6F6F6] p-5">
      {/* Store info */}
      <StoreInfo />

      {/* Request info */}
      <View className="mt-3 flex flex-row justify-between items-center">
        <Pending />
        <View className="w-[53%]">
          <Completed />
          <Ongoing />
        </View>
      </View>

      {/* Pending request */}
      <PendingRequest />

      {/* Request modal */}
      <RequestReceived />

      <TyreRequestReceived />
      
      {/* Waze modal */}
      <WazeModal />

      {/* <MovementTracking ref={modalRef} /> */}
    </View>
    </>
  )
})

export default home