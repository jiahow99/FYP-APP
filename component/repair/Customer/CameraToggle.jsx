import { TouchableOpacity } from 'react-native'
import React from 'react'
import Entypo from 'react-native-vector-icons/Entypo'
import * as ImagePicker from 'expo-image-picker';

const CameraToggle = ({ addImages }) => {
    // Pick Image
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 1,
        });
        // Set images
        if (!result.canceled) {
            addImages(result.assets);
        }
    }

return (
    <TouchableOpacity onPress={pickImage} className="w-full h-24 bg-black/30 rounded-xl mt-2 flex items-center justify-center">
        <Entypo name='camera' size={25} color='#ffffff' />
    </TouchableOpacity>
  )
}

export default CameraToggle