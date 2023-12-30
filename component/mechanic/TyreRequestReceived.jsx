import { View, Text, Image } from 'react-native'
import React from 'react'
import Modal from "react-native-modal";
import { Divider } from 'react-native-paper';
import CarInfo from '../repair/CarInfo';
import { TouchableOpacity } from 'react-native';
import { notificationStore } from '../../store/NotificationStore';
import { observer } from 'mobx-react';
import { mechanicStore } from '../../store/MechanicStore';
import { trackingStore } from '../../store/TrackingStore';

const RequestReceived = observer(() => {
    const { tyreModalOpen, requestInfo, toggleWazeModal, toggleTyreModal } = notificationStore;
    const { acceptRequest, rejectRequest } = mechanicStore;
    const { userLocation, setTrackingInfo } = trackingStore;
    
    const handleAccept = async() => {
        // alert(JSON.stringify(requestInfo));
        const requestInfoo = await acceptRequest(requestInfo);
        if (requestInfoo) {
            setTrackingInfo(requestInfoo);
            toggleTyreModal(false);
            toggleWazeModal(true, userLocation?.latitude, userLocation?.longitude);
        }
    }

  return (
    <Modal isVisible={tyreModalOpen}>
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
                    
                <View className="flex flex-row items-center space-x-2">
                    <View>
                        <Text className="text-gray-400 font-semibold">Tyre info</Text>
                        <Text className="font-bold">{requestInfo?.width}/{requestInfo?.inch}</Text>
                    </View>
                    <Image source={{ uri: requestInfo?.image }} className="w-20 h-20 rounded-xl" resizeMode='contain' />
                </View>

                <View className="flex flex-row flex-wrap mt-3">
                    <CarInfo name="Car Brand" value={`${requestInfo?.brand} ${requestInfo?.model}`} />
                    <CarInfo width="ml-2" name="Year Make" value={requestInfo?.yearMake} />
                    <CarInfo width="ml-2" name="Mileage" value={`${requestInfo?.mileage} km`} />
                </View>

                <View className="w-full flex flex-row justify-between mt-6">
                    <TouchableOpacity onPress={() => rejectRequest()} className="w-[48%]">
                        <View className="w-full py-3 rounded-xl bg-red-400 flex justify-center items-center">
                            <Text className="text-lg rounded-xl font-bold text-white">Reject</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={handleAccept} className="w-[48%]">
                        <View className="w-full py-3 rounded-xl bg-[#1FE89C] flex flex-row justify-center items-center">
                            <Text className="text-lg rounded-xl font-bold text-white">Accept</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    </Modal>
  )
})

export default RequestReceived