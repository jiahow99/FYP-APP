import { ScrollView, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import BackButton from '../../../component/BackButton'
import FilterBtn from '../../../component/FilterBtn'
import SearchBtn from '../../../component/SearchBtn'
import InchSelect from '../../../component/tyre/InchSelect'
import BrandSelect from '../../../component/tyre/BrandSelect'
import TyreResults from '../../../component/tyre/TyreResults'
import axios from 'axios'
import LoadingAnimation from '../../../component/LoadingAnimation'
import { toast } from '@backpackapp-io/react-native-toast'
import { Stack, router } from 'expo-router'

const shop = () => {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [filterOn, setFilterOn] = useState(false);

  const fetchTyres = async (filters=null) => {
    setLoading(true);
    try {      
      // Filter fetch
      if(filters !== null) {
        const { data } = await axios.get('https://f76d-113-23-129-82.ngrok-free.app/api/tyres', {params: filters});
        setResults(data);
        return ;
      }
      // Normal fetch
      const { data } = await axios.get('https://f76d-113-23-129-82.ngrok-free.app/api/tyres');
      setResults(data);
    } catch (error) {
      toast.error("Error fetching results.")
      alert(JSON.stringify(error));
    } finally {
      setLoading(false);
    }
  }

  // Fetch tyres
  useEffect(() => {
    fetchTyres();
  },[]);


  return (
    <>    
    <Stack.Screen options={{ animation: 'slide_from_right' }} />

    <SafeAreaView>
      <View className="bg-[#F6F6F6]">
        <ScrollView className="w-11/12 mx-auto">
          <View className="mt-3 flex flex-row justify-between">
            {/* Back */}
            <BackButton onPress={() => router.back()} />
            {/* Search */}
            <SearchBtn />
          </View>
          {/* Filter toggle */}
          <FilterBtn setFilterOn={setFilterOn} filterOn={filterOn} />
          {/* Filters */}
          {filterOn && (
            <>
            <InchSelect fetchTyres={fetchTyres} />
            <BrandSelect fetchTyres={fetchTyres} />
            </>
          )}
          {/* Tyres */}
          <TyreResults results={results} />
        </ScrollView>
      </View>

      <LoadingAnimation isVisible={loading}>Fetching results</LoadingAnimation>
    </SafeAreaView>
    </>
  )
}

export default shop