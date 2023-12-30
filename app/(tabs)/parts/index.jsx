import { View, Text } from 'react-native'
import React from 'react'
import Steps from '../../../component/repair/Steps'
import ChooseService from '../../../component/repair/ChooseService'
import { ScrollView } from 'react-native'
import { Stack, router } from 'expo-router'
import BackButton from '../../../component/BackButton'
import { SafeAreaView } from 'react-native-safe-area-context'
import CategoryCard from '../../../component/parts/CategoryCard'

const index = () => {
  return (
    <SafeAreaView>
      <ScrollView className="bg-[#F6F6F6]">
        <Stack.Screen options={{headerShown: false}} />

        {/* Back button */}
        <View className="w-11/12 mx-auto my-3">
          <BackButton onPress={() => router.back()} />
        </View>

        {/* Title */}
        <Text className="w-8/12 mx-auto text-2xl font-bold text-center">
          Choose the product you need
        </Text>

        <View className="mt-5 w-11/12 mx-auto">
          {/* Spare Part */}
          <CategoryCard 
              name="Spare Part" 
              src={require('../../../assets/images/spare_parts.png')} 
              href="(tabs)/parts/shop"
          />
          {/* Tyre */}
          <CategoryCard 
              name="Tyres" 
              src={require('../../../assets/images/tyre_change.png')} 
              href="(tabs)/tyre"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default index