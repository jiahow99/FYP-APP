import { View, Text } from 'react-native'
import React from 'react'
import { useRef } from 'react';
import { forwardRef } from 'react';
import { useImperativeHandle } from 'react';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import InputField from './InputField';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { userStore } from '../../store/UserStore';
import { KeyboardAvoidingView } from 'react-native';
import { ActivityIndicator, MD2Colors } from 'react-native-paper';
import { ScrollView } from 'react-native';
import { renderBackdrop, snapPoints } from '../../utils/bottomsheet';
import Button from '../login/Button';
import OrRegisterWith from '../login/OrRegisterWith';
import { router } from 'expo-router';


const Register = forwardRef((props, ref) => {
    useImperativeHandle(ref, () => ({
        expand(){
            modalRef.current?.present();
        }
    }))

    // ref
    const modalRef = useRef(null);

    // Collapse modal
    const collapse = () => {
        modalRef.current?.close();
    }

    // formik
    const initialValues  = {
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    }
    // validation
    const validationScheme = Yup.object({
        username: Yup.string().required(),
        email: Yup.string().email().required(),
        password: Yup.string().min(3).max(10).required(),
        confirmPassword: Yup.string().required('Please confirm your password.')
            .oneOf([Yup.ref('password')], 'Your passwords do not match.')
    })


    const { registerUser } = userStore;

    // Register
    const handleRegister = (values, {setFieldError}) => {
        try {
            const {username, email, password} = values;
            if (registerUser(username, email, password)) {
                collapse();
                router.push("/(tabs)/home");
            }
            
        } catch (error) {
            switch (error.code) {
                case 'auth/email-already-in-use':
                    setFieldError('email', 'Email is already in use.');
                    break;
            }
            alert(JSON.stringify(error));
        }
    }
    
return (
<BottomSheetModal
    ref={modalRef}
    index={0}
    snapPoints={snapPoints(['95%'])}
    backdropComponent={renderBackdrop(0)}
>
    <ScrollView keyboardShouldPersistTaps='handled'>
        <KeyboardAvoidingView>
            <Formik initialValues={initialValues} onSubmit={handleRegister} validationSchema={validationScheme}>
            {({handleChange, handleSubmit, values, isSubmitting}) => (
                <View className="p-5">
                    <MaterialCommunityIcons onPress={collapse} name='keyboard-backspace' size={26} />

                    <Text className="text-2xl font-bold mt-5">
                        Create an account.
                    </Text>

                    <Text className="text-xl text-gray-400 font-bold mt-2">
                        Welcome back
                    </Text>

                    <InputField name="username" extraClass="mt-5" label="Username" value={values.username} handleChange={handleChange} /> 
                    <InputField name="email" extraClass="mt-3" label="Email" value={values.email} handleChange={handleChange} /> 
                    <InputField name="password" extraClass="mt-3" label="Password" secureTextEntry value={values.password} handleChange={handleChange} /> 
                    <InputField name="confirmPassword" extraClass="mt-3" label="Confirm Password" secureTextEntry value={values.confirmPassword} handleChange={handleChange} /> 
                
                    <Button onPress={handleSubmit}>Register</Button>

                    <OrRegisterWith />
                </View>
            )}
            </Formik>
        </KeyboardAvoidingView>
    </ScrollView>
</BottomSheetModal>
)
});

export default Register