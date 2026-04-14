import React, { useEffect, useState } from 'react';
import { FlatList, View, Text } from 'react-native';
import { Meal, getMeals } from './meals';
import HomeContent from './HomeContent';

export default function Index() {
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data: Meal[] = await getMeals();
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <View>
      <FlatList
        data={meals}
        renderItem={({ item }) => (
          <View>
            <Text>{item}</Text>
          </View>
        )}
      />
    <HomeContent />
    </View>

  );
}