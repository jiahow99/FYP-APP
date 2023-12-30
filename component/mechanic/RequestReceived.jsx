import { View, Text, Image } from 'react-native'
import React, { useState } from 'react'
import Modal from "react-native-modal";
import { Divider } from 'react-native-paper';
import CarInfo from '../repair/CarInfo';
import { TouchableOpacity } from 'react-native';
import { notificationStore } from '../../store/NotificationStore';
import { observer } from 'mobx-react';
import { mechanicStore } from '../../store/MechanicStore';
import useMap from '../../utils/useMap';
import { trackingStore } from '../../store/TrackingStore';
import { useEffect } from 'react';

const RequestReceived = observer(() => {
    const [distance, setDistance] = useState(0);

    const { modalOpen, requestInfo, toggleModal, toggleWazeModal } = notificationStore;
    const { acceptRequest, rejectRequest, location } = mechanicStore; 
    const { userLocation, setTrackingInfo } = trackingStore;
    const { calculateDistance } = useMap();   

    // Accept request
    const handleAccept = async() => {
        const requestInfoo = await acceptRequest(requestInfo);
        if (requestInfoo) {
            setTrackingInfo(requestInfoo);
            toggleModal(false);
            toggleWazeModal(true, requestInfoo.userLocation.latitude, requestInfoo.userLocation.longitude);
        }
    }

    const handleReject = async () => {
        if(rejectRequest(requestInfo?.userId, requestInfo?.token)) {
            toggleModal(false);
        }
    }

    // Set distance
    useEffect(() => {
        if (userLocation) {
            setDistance(calculateDistance({
                lat: location.latitude,
                lng: location.longitude
            }, {
                latitude: userLocation.latitude,
                longitude: userLocation.longitude,
            }));
        }
    }, [userLocation, location, calculateDistance]);

  return (
    <Modal isVisible={modalOpen}>
        <View className="w-full h-full flex flex-row justify-center items-end pb-5">
            <View className="rounded-2xl p-3 bg-white">
                <View className="flex flex-row">
                    <Image source={require('../../assets/images/user-receive-request.png')} className="w-10 h-10" resizeMode='contain' />
                    <View className="ml-3">
                        <Text className="text-lg font-bold">{requestInfo?.name}</Text>
                        <Text className="text-gray-400 font-semibold">request mechanic from you</Text>
                    </View>
                </View>

                <Divider className="my-1" />
                    
                <View>
                    <Text className="text-gray-400 font-semibold">Problem</Text>
                    <Text className="font-bold">{requestInfo?.problems}</Text>
                </View>

                <View className="flex flex-row flex-wrap mt-3">
                    <CarInfo name="Car Brand" value={`${requestInfo?.brand} ${requestInfo?.model}`} />
                    <CarInfo width="ml-2" name="Year Make" value={requestInfo?.yearMake} />
                    <CarInfo width="ml-2" name="Mileage" value={`${requestInfo?.mileage} km`} />
                </View>

                <View className="w-full flex flex-row justify-between mt-6">
                    <TouchableOpacity onPress={handleReject} className="w-[48%]">
                        <View className="w-full py-3 rounded-xl bg-red-400 flex justify-center items-center">
                            <Text className="text-lg rounded-xl font-bold text-white">Reject</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={handleAccept} className="w-[48%]">
                        <View className="w-full py-3 rounded-xl bg-[#1FE89C] flex flex-row justify-center items-center">
                            <Text className="text-lg rounded-xl font-bold text-white">Accept</Text>
                            <Text className="text-lg ml-1 font-bold text-white">({distance} km)</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    </Modal>
  )
})

export default RequestReceived