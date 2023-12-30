import { View, Text, TouchableOpacity } from 'react-native'
import React, { forwardRef, useImperativeHandle, useRef } from 'react'
import { renderBackdrop, snapPoints } from '../../utils/bottomsheet';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { userStore } from '../../store/UserStore';
import { router } from 'expo-router';

const LogoutModal = forwardRef((props, ref) => {
    useImperativeHandle(ref, () => ({
        present(){
            logoutModal.current?.present();
        },
        dismiss(){
            logoutModal.current?.dismiss();
        }
    }))
    // Ref
    const logoutModal = useRef(null);

    const { logout } = userStore;

    handleLogout = () => {
        logout();
        logoutModal.current?.dismiss();
        router.replace('onboard');
    };

    return (
        <BottomSheetModal
            ref={logoutModal}
            index={0}
            snapPoints={snapPoints(['20%'])}
            backdropComponent={renderBackdrop(0,-1,'close')}
        >
            <View className="flex items-center justify-center">
                <TouchableOpacity onPress={handleLogout} className="w-11/12 mx-auto py-4 bg-red-500 rounded-xl">
                    <Text className="text-white font-bold w-fit mx-auto">Logout</Text>
                </TouchableOpacity>
            </View>
        </BottomSheetModal>
    )
})

export default LogoutModal