import React, { useState } from "react";

import { Card, Text } from 'react-native-paper';
const Home = ({ navigation }) => {
  const [stories, setStories] = useState([])
  return (
    <Card
      style={{
        margin: 10,
        padding: 15,
        borderColor: 'gray',
      }}
    >
      <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
      <Card.Title
        titleNumberOfLines={2}
        title='Bai Viết'
        titleStyle={{ lineHeight: 26, fontWeight: "bold", fontSize: 20 }}
        subtitle='Giới thiệu'
      />
      <Card.Content>
        <Text numberOfLines={3}>25/03/2022</Text>
      </Card.Content>
    </Card>
  );
};

export default Home;