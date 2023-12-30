import { View, Text } from 'react-native'
import React, { useState } from 'react'
import Steps from '../../../component/repair/Steps'
import ChooseService from '../../../component/repair/ChooseService'
import WhatTroublesYou from '../../../component/repair/WhatTroublesYou'
import ChooseMechanic from '../../../component/repair/ChooseMechanic.jsx'
import { ScrollView } from 'react-native'
import { Stack, router } from 'expo-router'
import BackButton from '../../../component/BackButton'
import { SafeAreaView } from 'react-native-safe-area-context'
import { observer } from 'mobx-react'
import { userStore } from '../../../store/UserStore.js'

const mechanic = observer(() => {
  const { steps } = userStore;

  return (
    <SafeAreaView>
      <ScrollView className="bg-[#F6F6F6]">
        <Stack.Screen options={{headerShown: false}} />

        {/* Back button */}
        <View className="w-11/12 mx-auto my-3">
          <BackButton steps={3} onPress={() => router.back()} />
        </View>

        {/* Title */}
        <Text className="w-8/12 mx-auto text-2xl font-bold text-center">
          What troubles you
        </Text>
        
        {/* Steps */}
        <Steps steps={2} />

        {/* Choose mechanic */}
        <WhatTroublesYou />

      </ScrollView>
    </SafeAreaView>
  )
})

export default mechanic