import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { Ionicons } from '@expo/vector-icons'; 
import { Formik } from 'formik';
import * as Yup from 'yup';
import { userStore } from '../../store/UserStore';
import { ScrollView } from 'react-native';
import { KeyboardAvoidingView } from 'react-native';
import { Stack, router } from 'expo-router';
import InputField from '../../component/onboard/InputField';
import Button from '../../component/login/Button';
import OrSignUpWith from '../../component/login/OrSignUpWith';
import AlreadyHave from '../../component/login/AlreadyHave';
import { SafeAreaView } from 'react-native-safe-area-context';
import Register from '../../component/onboard/Register';
import { useRef } from 'react';
import DontHaveStore from '../../component/login/DontHaveStore';
import { mechanicStore } from '../../store/MechanicStore';
import LoadingAnimation from '../../component/LoadingAnimation';

const login = () => {   
    // States
    const [loading, setLoading] = useState(false);
    // Refs
    const registerModal = useRef(null);

    // User Store
    const { login } = mechanicStore;

    // Initial values
    const initialValues  = {
        email: '',
        password: ''
    }
    // Yup validation
    const validationScheme = Yup.object({
        email: Yup.string().email().required(),
        password: Yup.string().min(3).max(10).required()
    })

    // Login
    const handleLogin = async (values, {setFieldError}) => {
        const {email, password} = values;
        setLoading(true);
        try {
            await login(email, password)
                .then(() => router.replace("/(mechanic)/home"));
        } catch (error) {
            // alert(error);
            setFieldError('password', 'Invalid credentials.')
        } finally {
            setLoading(false);
        }
    }
        
return (
<>
<Stack.Screen options={{ headerShown: false }} />
    
<SafeAreaView>
    <ScrollView keyboardShouldPersistTaps='handled'>
        <KeyboardAvoidingView>
            <Formik initialValues={initialValues} onSubmit={handleLogin} validationSchema={validationScheme}>
            {({handleChange, handleSubmit, values}) => (
                <View className="p-5">
                    <Ionicons name="arrow-back" size={26} color="black" />

                    <Text className="text-2xl font-bold mt-5">
                        Mechanic log in.
                    </Text>

                    <Text className="text-xl text-gray-400 font-bold mt-2">
                        Welcome back
                    </Text>

                    <InputField name="email" extraClass="mt-4" label="Email" value={values.email} handleChange={handleChange} /> 
                    <InputField name="password" extraClass="mt-3" label="Password" secureTextEntry value={values.password} handleChange={handleChange} /> 
                
                    <Button onPress={handleSubmit}>Login</Button>

                    <DontHaveStore  />
                </View>
            )}
            </Formik>
        </KeyboardAvoidingView>
    </ScrollView>

    <LoadingAnimation isVisible={loading}>Loading</LoadingAnimation>
</SafeAreaView>

</>
)};

export default login