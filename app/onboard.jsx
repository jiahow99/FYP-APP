import { View } from 'react-native'
import React from 'react'

import Button from '../component/onboard/Button'
import { ImageBackground } from 'react-native'
import { router } from 'expo-router'
import Title from '../component/onboard/Title'


const onboard = () => {
    return (
        <View>
            <ImageBackground source={require('../assets/images/onboard_screen.jpg')} resizeMode='cover'>
                <View className="w-full h-full flex flex-row items-end px-6 pb-10">
                    <View className="w-full">
                        {/* Onsite Repairs */}
                        <Title>Onsite Repairs.</Title>
                        {/* Anywhere you go */}
                        <Title extraClass="mt-1">Anywhere you go</Title>

                        <View className="w-full mt-10">
                            {/* Let's Go */}
                            <Button onPress={() => router.push('/(login)/user')} bgColor="bg-white">
                                Let' Go
                            </Button>
                            {/* I'm Mechanic */}
                            <Button onPress={() => router.push('/(login)/mechanic')} bgColor="bg-[#4B515D]" textColor="text-white" extraClass="mt-4">
                                I'm Mechanic
                            </Button>
                        </View>
                    </View>
                </View>
            </ImageBackground>
        </View>
    )
}

export default onboard