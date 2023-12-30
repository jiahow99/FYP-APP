import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Stack, router, useLocalSearchParams } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import BackButton from '../../../component/BackButton.jsx'
import Steps from '../../../component/tyre/Steps.jsx'
import { inchOptions } from '../../../utils/tyre.js'
import InchOption from '../../../component/tyre/InchOption.jsx'
import ContinueBtn from '../../../component/repair/ContinueBtn.jsx'
import { FlatList } from 'react-native-gesture-handler'

const mechanic = () => {
  const [inchs, setInchs] = useState(inchOptions);
  // Search paramss
  const { tyreChange, place_id } = useLocalSearchParams();
  // Continue
  const handleContinue = () => {
    tyreChange === 'true'
      ? router.push(`/(tabs)/tyre/brand?tyreChange=true&place_id=${place_id}`)
      : router.push('/(tabs)/tyre/brand')
  }
  return (
    <>
    <Stack.Screen options={{ animation: 'slide_from_right' }} />

    <SafeAreaView>
      <View className="bg-[#F6F6F6]">
        <Stack.Screen options={{headerShown: false}} />

        {/* Back button */}
        <View className="w-11/12 mx-auto my-3">
          <BackButton steps={1} onPress={() => router.back()} />
        </View>

        {/* Title */}
        <Text className="w-8/12 mx-auto text-2xl font-bold text-center">
          Choose Tyre Size
        </Text>
        
        {/* Steps */}
        <Steps steps={1} />

        {/* Choose mechanic */}
        <View className="w-11/12 mx-auto">
            <FlatList 
              className="w-full h-fit"
              data={inchs}
              renderItem={({item}) => (<InchOption option={item} />)}
              numColumns={3}
              columnWrapperStyle={{ justifyContent: 'space-between' }}
            />
        </View>

        {/* Next */}
        <ContinueBtn width="mt-5 w-11/12 mx-auto" onPress={handleContinue} />

      </View>
    </SafeAreaView>
    </>
  )
}

export default mechanic