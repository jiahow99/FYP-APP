import { View, Text, TouchableHighlight, TextInput, KeyboardAvoidingView } from 'react-native'
import React, { useState } from 'react'
import { Image } from 'react-native'
import { FlatList } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import ContinueBtn from './ContinueBtn';
import { router, useLocalSearchParams } from 'expo-router';

const WhatTroublesYou = () => {
  const [selectedProblems, setSelectedProblems] = useState([]);
  const [others, setOthers] = useState();

  // Check if have selected store
  const { place_id } = useLocalSearchParams();
  // Problems
  const problems = [
    {
      name: 'Engine unable start',
      slug: 'engine-unable-start',
      src: require('../../assets/images/engine_unable_start.png')
    },
    {
      name: 'Break Failure',
      slug: 'break-failure',
      src: require('../../assets/images/brake_failure.png')
    },
    {
      name: 'Strange noise from engine',
      slug: 'strange-noise-from-engine',
      src: require('../../assets/images/strange_noise_engine.png')
    },
    {
      name: 'Strange noise from brake',
      slug: 'strange-noise-from-brake',
      src: require('../../assets/images/strange_noise_brake.png')
    },
    {
      name: 'Cooling system',
      slug: 'cooling-system',
      src: require('../../assets/images/cooling_system.png')
    },
    {
      name: 'Engine lights on',
      slug: 'engine-lights-on',
      src: require('../../assets/images/engine_lights_on.png')
    },
    {
      name: 'Suspension problem',
      slug: 'suspension-problem',
      src: require('../../assets/images/suspension_problem.png')
    },
    {
      name: 'Others',
      slug: 'others',
    },
    {}
  ];

  // Add problems when clicked
  const addProblems = (name) => {
    // Remove
    if (selectedProblems.includes(name)) {
      setSelectedProblems((prevSelectedProblems) =>
        prevSelectedProblems.filter((item) => item !== name)
      );
      return ;
    }
    // Add
    setSelectedProblems([...selectedProblems, name]);
  }

  // Handle continue
  const handleContinue = () => {    
    let problemParams = '';
    // Other problem
    if (others && others.length > 0) {
      problemParams = [...selectedProblems.filter(x => x !== 'Others'), others].join(', ');
    } else {
      problemParams = selectedProblems.join(', ');
    }
    if (selectedProblems.length > 0) {
      place_id === undefined
        ? router.push(`/(tabs)/repair/mechanic?problems=${problemParams}`)
        : router.push(`/(tabs)/repair/customer?problems=${problemParams}&place_id=${place_id}`)
    }
  }

  // Component
  const TroubleComponent = ({ trouble }) => {
    return trouble.name ? (
      <TouchableHighlight 
        onPress={() => addProblems(trouble.name)} 
        className={`w-[32%] mt-3 bg-[#4B515D] aspect-square rounded-2xl relative transition-all duration-200
          ${selectedProblems.includes(trouble.name) && 'border-4 border-[#1FE89C]'}`}
      >
        <View className={`w-full h-full p-3 flex items-center justify-between`}>
          {/* Image */}
          {trouble.src && <Image source={trouble.src} className="w-12 h-12" />}
          {/* Name */}
          <Text className="text-center text-xs text-white font-bold"numberOfLines={2} style={{ lineHeight: 15 }}>
            {trouble.name}
          </Text>
          {/* Tick */}
          {selectedProblems.includes(trouble.name) && (
            <View className="p-1 rounded-full bg-[#1FE89C] absolute -top-2 -right-2">
              <Feather name="check" size={20} color={'#ffffff'} />
            </View>
          )}
        </View>
      </TouchableHighlight>
    )
    : (
      <View className="w-[32%]"></View>
    )
  }


  return (
      <View className="w-11/12 mx-auto">
        {/* Problems */}
        <FlatList 
          data={problems}
          numColumns={3}
          keyExtractor={item => item.name}
          renderItem={({item}) => <TroubleComponent trouble={item} />}
          columnWrapperStyle={{  justifyContent: 'space-between' }}
        />

        {/* Other reasons */}
        {selectedProblems.includes('Others') && (
        <>
          <Text className="text-[#4B515D] text-lg font-bold mt-1">{others}</Text>
          <TextInput 
            multiline
            onChangeText={setOthers}
            placeholder='Others'
            className="p-2 my-2 rounded-lg bg-gray-400 bg-transparent transition-all duration-200 border-2 
            border-gray-600" 
          />
        </>
        )}

      {/* Continue */}
      <ContinueBtn 
        width="w-full" 
        onPress={handleContinue}
        disabled={selectedProblems.length === 0} 
      />
      </View>
  )
}

export default WhatTroublesYou