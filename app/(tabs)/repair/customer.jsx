import { View, Text } from 'react-native'
import React, { useState } from 'react'
import Steps from '../../../component/repair/Steps'
import { ScrollView } from 'react-native'
import { Stack, router, useLocalSearchParams } from 'expo-router'
import BackButton from '../../../component/BackButton'
import { SafeAreaView } from 'react-native-safe-area-context'
import SavedDetails from '../../../component/repair/SavedDetails'
import DifferentDetails from '../../../component/repair/DifferentDetails'
import ContinueBtn from '../../../component/repair/ContinueBtn'

const customer = () => {  
  const [details, setDetails] = useState(null);
  const [type,setType] = useState('saved-details');

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
          Customer Details
        </Text>
        
        {/* Steps */}
        <Steps steps={3} />

        {/* Choose mechanic */}
        {type === 'saved-details' && 
          <SavedDetails details={details} setDetails={setDetails} setType={setType} type={type} />
        }
        
        {type === 'different-details' && 
          <DifferentDetails setType={setType} type={type} />
        }

      </ScrollView>
    </SafeAreaView>
  )
}

export default customer