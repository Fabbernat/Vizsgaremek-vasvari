import React, { useEffect, useState } from 'react';
import { FlatList, View, Text } from 'react-native';
import { Meal, getMeals } from './meals';
import HomeContent from './HomeContent';

export default function Index() {
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data: Meal[] |null = await getMeals();
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  if (!meals) {
    return <Text>Loading...</Text>;
  }

  return (
    <View>
      <FlatList<Meal>
        data={meals ?? []}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View>
            <Text>{item.name}</Text>
          </View>
        )}
      />
      
      <HomeContent />
    </View>
  );
}