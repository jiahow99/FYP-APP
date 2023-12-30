import { View, Text } from 'react-native'
import React from 'react'
import { Image } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { router, useLocalSearchParams } from 'expo-router'

const ChooseService = () => {
    // Search params
    const { place_id } = useLocalSearchParams();
    
    // Service Component
    const ServiceComponent = ({ name, src, href }) => (
        <TouchableOpacity onPress={() => router.push(href)}>
            <LinearGradient
                colors={['#7C8089', '#4B515D']}
                className="w-full h-44 rounded-lg relative py-2 px-5 mb-4"
            >
                <Image source={src} className="ml-auto w-[150px] h-[130px]" />
                <Text className="absolute bottom-5 left-3 text-xl text-white font-bold tracking-widest">
                    {name}
                </Text>
            </LinearGradient>
        </TouchableOpacity>
    )
        

return (
    <View className="w-11/12 mx-auto flex flex-col">
        <ServiceComponent 
            href={place_id === undefined ? `/(tabs)/repair/problems` : `/(tabs)/repair/problems?place_id=${place_id}`}
            name="Car Repair" 
            src={require('../../assets/images/choose_car_repair.png')} 
        />

        <ServiceComponent 
            href={place_id === undefined ? `/(tabs)/tyre` : `/(tabs)/tyre?place_id=${place_id}&tyreChange=true`}
            name="Tyre Change" 
            src={require('../../assets/images/tyre_change.png')} 
        />
    </View>
)
}

export default ChooseService