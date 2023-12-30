import { View, Text } from 'react-native'
import React from 'react'
import { TextInput } from 'react-native'
import { TouchableOpacity } from 'react-native'
import RNPickerSelect from 'react-native-picker-select';

const InputPicker = ({ title, handleChange, value, items, picker=false, multiline=false, width , placeholder='', keyboardType='default', setFieldValue=null, name='' }) => {
    
    return (
        <TouchableOpacity className={`${width ? width : 'w-[47%]'} p-2 bg-black/30 rounded-xl mt-3`}>
            {/* Title */}
            {title && <Text className="text-gray-400 font-bold">{title}</Text>}
            
            {/* Picker */}
            {picker ? (
                <RNPickerSelect
                    onValueChange={value => setFieldValue(name, value)}
                    placeholder={{ label: placeholder, color: 'gray' }}
                    items={items}
                    style={{ 
                        inputAndroid: {
                            color: 'white',
                            width: '100%',
                            padding: 0
                        }
                    }}
                />
            ) : (
            // Text input
                <TextInput 
                    className="text-white font-bold placeholder:text-white" 
                    value={value}
                    onChangeText={handleChange}
                    keyboardType={keyboardType}
                    placeholder={placeholder} 
                    placeholderTextColor='#ffffff'
                    multiline={multiline}
                />
            )}
        </TouchableOpacity>
    )
}

export default InputPicker