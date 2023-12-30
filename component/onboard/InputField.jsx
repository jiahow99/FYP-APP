import { View, Text } from 'react-native'
import React from 'react'
import { TextInput } from 'react-native'
import { useField } from 'formik';
import { mechanicStore } from '../../store/MechanicStore';

const InputField = ({ name, extraClass='' , label, handleChange, ...props }) => {
    const { fieldErrors } = mechanicStore;
    const [field, meta, helpers] = useField(name);
    
    return (
        <View className={extraClass}>
            {/* Label */}
            <Text className="font-bold">{label}</Text>
            {/* Input */}
            <TextInput 
                {...props} 
                onChangeText={handleChange(name)}
                className="mt-1 w-full px-3 py-2 rounded-xl bg-transparent border-2 border-gray-300 focus:border-gray-600 font-bold tracking-wider" 
            />

            {/* Error msg */}
            {fieldErrors && fieldErrors[name] && (
                <Text className="font-semibold text-red-600">{fieldErrors[name]}</Text>
            )}
            {meta.touched && meta.error && (
                <Text className="font-semibold text-red-600">{meta.error}</Text>
            )}
        </View>
    )
}

export default InputField