import { ScrollView, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import BackButton from '../../../component/BackButton'
import FilterBtn from '../../../component/FilterBtn'
import SearchBtn from '../../../component/SearchBtn'
import BrandSelect from '../../../component/parts/BrandSelect';
import axios from 'axios'
import LoadingAnimation from '../../../component/LoadingAnimation'
import { toast } from '@backpackapp-io/react-native-toast'
import { Stack, router } from 'expo-router'
import { partStore } from '../../../store/PartStore'
import PartResults from '../../../component/parts/PartResult'

const shop = () => {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);

  const { fetchParts } = partStore;

  const fetchPartsFromAPI = async (filters=null) => {
    setLoading(true);
    try {      
      const { data } = await fetchParts(filters || null);
      setResults(data);
    } catch (error) {
      toast.error("Error fetching results.")
    } finally {
      setLoading(false);
    }
  }

  // Fetch tyres
  useEffect(() => {
    fetchPartsFromAPI();
  },[]);


  return (
    <>    
    <Stack.Screen options={{ animation: 'slide_from_right', headerShown: false }} />

    <SafeAreaView>
      <View className="bg-[#F6F6F6]">
        <ScrollView className="w-11/12 mx-auto">
          <View className="mt-3 flex flex-row justify-between items-center">
            {/* Back */}
            <BackButton onPress={() => router.back()} />
            {/* Search */}
            <SearchBtn />
          </View>
          {/* Brand filter */}
          <BrandSelect fetchPartsFromAPI={fetchPartsFromAPI} />
          {/* Parts */}
          <PartResults results={results} />
        </ScrollView>
      </View>

      <LoadingAnimation isVisible={loading}>Fetching results</LoadingAnimation>
    </SafeAreaView>
    </>
  )
}

export default shop