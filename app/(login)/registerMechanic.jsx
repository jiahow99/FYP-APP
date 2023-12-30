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
import { Stack, router, useGlobalSearchParams, useLocalSearchParams } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import { TouchableWithoutFeedback } from 'react-native'
import { userStore } from '../../store/UserStore'
import LoadingAnimation from '../../component/LoadingAnimation'
import { mechanicStore } from '../../store/MechanicStore'
import ImageUpload from '../../component/mechanic/ImageUpload'
import { useEffect } from 'react'

const registerStore = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { registerStore, setFieldValues, setFieldError } = mechanicStore;
    
    // Initial values
    const initialValues  = {
        mechanic_name: '',
        mechanic_phone: '',
        mechanic_image: '',
    }
    // Yup validation
    const validationScheme = Yup.object({
        mechanic_name: Yup.string().required(),
        mechanic_phone: Yup.string().required(),
        mechanic_image: Yup.string().required(),
    })

    // Go back
    const handleBack = () => {
        setFieldValues(null);
        router.back();
    }

    // Register
    const handleRegister = async (values) => {
        try {
            setIsSubmitting(true);
            await registerStore(values)
                .then(() => {
                    router.push('/(mechanic)/home');
                })
                .finally(() => {
                    setIsSubmitting(false);
                });
                
        } catch (error) {
            if (error && error.code === 'auth/email-already-in-use'){
                setFieldError({email: 'This email is registered'})
                router.back();
            } else {
                alert(error);
                setFieldError({password: 'Invalid credentials'})
                router.back();
            }
        } finally {
            setIsSubmitting(false);
        }
    }

  return (
    <>
    <Stack.Screen options={{ headerShown: false, animation: 'slide_from_right' }} />

    <SafeAreaView>
    <ScrollView keyboardShouldPersistTaps='always'>
        <KeyboardAvoidingView>
            <Formik initialValues={initialValues} onSubmit={handleRegister} validationSchema={validationScheme}>
            {({handleChange, handleSubmit, values}) => (
                <View className="p-5">
                    <TouchableWithoutFeedback onPress={handleBack}>
                        <MaterialIcons name="keyboard-backspace" size={26} color="black" />
                    </TouchableWithoutFeedback>

                    <Text className="text-2xl font-bold mt-5">
                        Mechanic Details.
                    </Text>
                    
                    <ImageUpload value={values.mechanic_image} />
                    <InputField name="mechanic_name" extraClass="mt-3" label="Mechanic name" value={values.mechanic_name} handleChange={handleChange} /> 
                    <InputField name="mechanic_phone" extraClass="mt-3" label="Contact No" value={values.mechanic_phone} handleChange={handleChange} placeholder="01xxxxxxxx" keyboardType="decimal-pad"  /> 
                                    
                    <Button onPress={handleSubmit}>Register</Button>
                </View>
            )}
            </Formik>
        </KeyboardAvoidingView>
    </ScrollView>

    {/* Loading animation */}
    <LoadingAnimation isVisible={isSubmitting}>
        Creating account
    </LoadingAnimation>
    </SafeAreaView>
    </>
  )
}

export default registerStore