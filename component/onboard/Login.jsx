import { View, Text } from 'react-native'
import React from 'react'
import { useRef } from 'react';
import { forwardRef } from 'react';
import { useImperativeHandle } from 'react';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import InputField from './InputField';
import { Formik } from 'formik';
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as Yup from 'yup';
import { renderBackdrop, snapPoints } from '../../utils/bottomsheet';
import { userStore } from '../../store/UserStore';
import { ScrollView } from 'react-native';
import { KeyboardAvoidingView } from 'react-native';
import { router } from 'expo-router';

const Login = forwardRef((props, ref) => {
    useImperativeHandle(ref, () => ({
        expand(){
            loginModalRef.current?.present();
        }
    }))
    
    // Ref
    const loginModalRef = useRef(null);

    const {login} = userStore;

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

    // Collapse modal
    const collapse = () => {
        loginModalRef.current?.close();
    }

    // Login
    const handleLogin = async (values, {setFieldError}) => {
        const {email, password} = values;
        try {
            await login(email, password)
                .then(() => router.replace("/(tabs)/home"));
        } catch (error) {
            // setFieldError('password', 'Invalid credentials.')
            alert(error);
        }
    }
    
return (
<BottomSheetModal
    ref={loginModalRef}
    index={0}
    snapPoints={snapPoints(['95%'])}
    backdropComponent={renderBackdrop(0)}
>
    <ScrollView>
        <KeyboardAvoidingView>
            <Formik initialValues={initialValues} onSubmit={handleLogin} validationSchema={validationScheme}>
            {({handleChange, handleSubmit, values}) => (
                <View className="p-5">
                    <MaterialCommunityIcons onPress={collapse} name='keyboard-backspace' size={26} />

                    <Text className="text-2xl font-bold mt-5">
                        Let's Sign you in.
                    </Text>

                    <Text className="text-xl text-gray-400 font-bold mt-2">
                        Welcome back
                    </Text>

                    <InputField name="email" extraClass="mt-5" label="Email" value={values.email} handleChange={handleChange} /> 
                    <InputField name="password" extraClass="mt-3" label="Password" secureTextEntry value={values.password} handleChange={handleChange} /> 
                
                    <TouchableOpacity onPress={handleSubmit} className="w-52 mt-8 mx-auto rounded-xl bg-gray-800 py-3 flex justify-center items-center">
                        <Text className="text-xl font-bold text-white">
                            Login
                        </Text>
                    </TouchableOpacity>
                </View>
            )}
            </Formik>
        </KeyboardAvoidingView>
    </ScrollView>
</BottomSheetModal>
)
});

export default Login