import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  View
} from 'react-native';
import { Card, Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/AntDesign';

// import Story from "../components/Story";
const Home = ({ navigation }) => {

    const [stories, setStories] = useState([])
    const editDate = (createdAt) => {
        const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        const d = new Date(createdAt);
        var datestring = d.getDate() + " " + monthNames[d.getMonth()] + " , " + d.getFullYear()
        return datestring
    }

    // const formatHtml = (content) =>{
    //     return{
    //       html: `${content}`
    //     };
    // }
    const getImg = (name) =>{
      return `http://localhost:5000/storyImages/${name}`
    }
    useEffect(() => {
      const getStories = async () => {
  
        try {
          const URI = 'http://localhost:5000'
          const { data } = await axios.get(`${URI}/story/getAllStories`)
  
          setStories(data.data)
        }
        catch (error) {
          console.log(error)
        }
      }
      getStories()
    }, [])
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
      { stories.length ? 
        stories.map((data) =>{
          return (
            <Card
            style={styles.card}
            key={data._id}
            onPress={()=> navigation.navigate('About')}
          >
            <Card.Cover source={{ uri: getImg(data.image) }} />
            <Card.Title
              titleNumberOfLines={2}
              title={data.title}
              titleStyle={{ lineHeight: 26, fontWeight: "bold", fontSize: 20 }}
            />
            <Card.Content>
              {/* <RenderHtml numberOfLines={2} source={formatHtml(data.content)} style={styles.content} /> */}
              <Text numberOfLines={3}>{editDate(data.createdAt)} </Text>
              {/* <Text><Icon name={like2} size={20} /> {data.likeCount} </Text> */}
            </Card.Content>
          </Card>
          )
        })
        :  <Text> Chưa có bài viết nào</Text>}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width:'100%'
  },
  card:{
    margin: 10,
    padding: 15,
    borderColor: 'gray',
  },
  scrollView: {
    marginHorizontal: 20,
  },
  text: {
    fontSize: 42,
  },
  content:{
    flex: 1,
  }
});
export default Home;