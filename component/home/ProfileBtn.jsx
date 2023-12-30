import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { observer } from 'mobx-react'
import { userStore } from '../../store/UserStore'

const ProfileBtn = observer(({ onPress }) => {
    const { user } = userStore;

    return (
        <View className="w-full px-5 mx-auto flex flex-row justify-end items-center">
            <TouchableOpacity onPress={onPress} className="flex flex-row items-center bg-[#6B707A] px-3 py-1 rounded-xl">
                <Text className="text-white font-bold mr-2">{user?.username}</Text>
                <Image 
                    source={require('../../assets/images/profile-pic.jpeg')}
                    className="w-10 h-10 rounded-full"
                    resizeMode='cover'
                />
            </TouchableOpacity>
        </View>
    )
})

export default ProfileBtn