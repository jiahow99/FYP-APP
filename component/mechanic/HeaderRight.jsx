import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'react-native';
import { mechanicStore } from '../../store/MechanicStore';
import { GOOGLE_API_KEY } from '@env';
import { useState } from 'react';
import { observer } from 'mobx-react';

const HeaderRight = observer(() => {
    const { user } = mechanicStore;
    const [image, setImage] = useState();

    useEffect(() => {
        if (user) {
            const uri = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${user.photo_reference}&key=${GOOGLE_API_KEY}`;
            setImage(uri);
        }
    }, [user]);

    return (
        <View className="flex flex-row items-center">
            <Ionicons name="notifications-outline" size={22} color="black" />
            {image && (
                <Image source={{ uri: image }} className="ml-3 w-10 h-10 rounded-full" resizeMode='cover' />
            )}
        </View>
    )
})

export default HeaderRight