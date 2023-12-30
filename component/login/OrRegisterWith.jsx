import { View, Text } from 'react-native'
import React from 'react'
import SocialButton from './SocialButton'
import { Divider } from 'react-native-paper'

const OrRegisterWith = () => {
  const facebookLogo = require('../../assets/icons/facebook.png');
  const googleLogo = require('../../assets/icons/google.png');

  return (
    <View>
        <View className="w-full flex-row justify-between items-center mt-3">
            <Divider className="w-[30%]" />
            <Text className="text-gray-400">Or Register With</Text>
            <Divider className="w-[30%]" />
        </View>

        <View className="mt-3 w-full flex flex-row justify-between">
            <SocialButton logoSrc={facebookLogo} label="Facebook" />
            <SocialButton logoSrc={googleLogo} label="Google" />
        </View>
    </View>
  )
}

export default OrRegisterWith