import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { ScrollView } from 'react-native'
import { KeyboardAvoidingView } from 'react-native'
import { Formik } from 'formik'
import InputField from '../../component/onboard/InputField'
import SelectLocation from '../../component/login/SelectLocation'
import { useState } from 'react'
import * as Yup from 'yup';
import Button from '../../component/login/Button'
import { MaterialIcons } from '@expo/vector-icons';
import { Stack, router } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import { TouchableWithoutFeedback } from 'react-native'
import { userStore } from '../../store/UserStore'
import LoadingAnimation from '../../component/LoadingAnimation'
import { mechanicStore } from '../../store/MechanicStore'

const registerStore = () => {
    const { setFieldValues } = mechanicStore;

    // Initial values
    const initialValues  = {
        name: '',
        email: '',
        password: '',
        lat: '',
        lng: '',
        address: ''
    }
    // Yup validation
    const validationScheme = Yup.object({
        name: Yup.string().required(),
        email: Yup.string().email().required(),
        password: Yup.string().min(3).max(10).required(),
        confirmPassword: Yup.string().required('Please confirm your password.')
            .oneOf([Yup.ref('password')], 'Your passwords do not match.'),
        lat: Yup.number().required(),
        lng: Yup.number().required(),
        address: Yup.string().required(),
        place_id: Yup.string().required(),
    })

    // Register
    const handleRegister = async (values) => {
        setFieldValues(values);
        router.push('/(login)/registerMechanic');
    }

  return (
    <>
    <Stack.Screen options={{ headerShown: false }} />

    <SafeAreaView>
    <ScrollView keyboardShouldPersistTaps='always'>
        <KeyboardAvoidingView>
            <Formik initialValues={initialValues} onSubmit={handleRegister} validationSchema={validationScheme}>
            {({handleChange, handleSubmit, values, setFieldValue}) => (
                <View className="p-5">
                    <TouchableWithoutFeedback onPress={() => router.back()}>
                        <MaterialIcons name="keyboard-backspace" size={26} color="black" />
                    </TouchableWithoutFeedback>

                    <Text className="text-2xl font-bold mt-5">
                        Register your store.
                    </Text>
                    
                    <SelectLocation setFieldValue={setFieldValue} />

                    <InputField name="name" extraClass="mt-3" label="Store name" value={values.name} handleChange={handleChange} /> 
                    <InputField name="address" extraClass="mt-3" label="Address" value={values.address} handleChange={handleChange} /> 
                    <InputField name="email" extraClass="mt-3" label="Login email" value={values.email} handleChange={handleChange} /> 
                    <InputField name="password" extraClass="mt-3" label="Password" secureTextEntry value={values.password} handleChange={handleChange} /> 
                    <InputField name="confirmPassword" extraClass="mt-3" label="Confirm Password" secureTextEntry value={values.confirmPassword} handleChange={handleChange} /> 
                
                    <Button onPress={handleSubmit}>Next</Button>
                </View>
            )}
            </Formik>
        </KeyboardAvoidingView>
    </ScrollView>
    </SafeAreaView>
    </>
  )
}

export default registerStore