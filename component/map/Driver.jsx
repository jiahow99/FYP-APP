import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Image } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Feather from 'react-native-vector-icons/Feather'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { observer } from 'mobx-react'
import { trackingStore } from '../../store/TrackingStore'
import storage from '@react-native-firebase/storage';
import * as Linking from "expo-linking";

const Driver = observer(() => {
    // State
    const [mechanicImg, setMechanicImg] = useState(null);
    const { placeId, mechanicInfo } = trackingStore;
    // Fetch mechanic image from firestore
    if (placeId) {
        storage().ref(`mechanic/${placeId}`).getDownloadURL()
        .then((img) => setMechanicImg(img));
    }
    
    return (
        <View className="w-full absolute bottom-3 flex items-center justify-center">
            <View className="w-80 px-3 py-1 bg-white rounded-3xl flex flex-row justify-between">
                {/* Image */}
                {mechanicImg && (
                <Image 
                    source={{ uri: mechanicImg }} 
                    className="w-[20%] aspect-square rounded-2xl"
                    resizeMode='contain'
                />
                )}

                {/* Name */}
                <View className="w-5/12 flex flex-col justify-center">
                    <Text className="font-extrabold text-lg">{mechanicInfo.name}</Text>
                    <Text className="text-gray-400 font-bold text-xs">{mechanicInfo.contact}</Text>
                </View>

                {/* Phone */}
                <View className="w-4/12 flex flex-row justify-between items-center space-x-1">
                    <Chat />
                    <Contact contact={mechanicInfo.contact} />
                </View>
            </View>
        </View>
    )
})

// Chat
const Chat = () => (
    <TouchableOpacity className="w-12 h-12 rounded-xl border-4 border-[#1FE89C] bg-[#1FE89C]/50 flex justify-center items-center">
        <Ionicons name='chatbubble-ellipses-outline' size={28} />
    </TouchableOpacity>
)

// Contact
const Contact = ({ contact }) => {
    const handlePress = () => {
        Linking.openURL(`tel:${contact}`);  
    }
    return (
        <TouchableOpacity onPress={handlePress} className="w-12 h-12 rounded-xl bg-[#1FE89C] flex justify-center items-center">
            <Feather name='phone-call' size={28} />
        </TouchableOpacity>
    )
}

export default Driver