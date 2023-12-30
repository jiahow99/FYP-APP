import { View, Text } from 'react-native'
import React from 'react'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler'

const CardInput = ({ title, placeholder='', inputMode='text', value='', maxLength, handleInput }) => {
    return (
        <TouchableOpacity className='w-full p-2 bg-black/30 rounded-xl mt-3'>
            <Text className="text-gray-400 font-bold">{title}</Text>
            <TextInput 
                className="text-white font-bold placeholder:text-white" 
                onChangeText={handleInput}
                placeholder={placeholder} 
                keyboardType='decimal-pad'
                placeholderTextColor='#C4C4C4'
                maxLength={maxLength}
                value={value}
            />
        </TouchableOpacity>
    ) 
}

export default CardInput