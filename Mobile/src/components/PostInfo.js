
import React, {useState ,useEffect} from "react";
import { View, Text, StyleSheet, ScrollView,useWindowDimensions  } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";
import RenderHtml from 'react-native-render-html';

const PostInfo = ({route,navigation}) => {
    const [token, setToken] = useState('')
    const [likeStatus, setLikeStatus] = useState(false)
    const [likeCount, setLikeCount] = useState(0)
    const [activeUser, setActiveUser] = useState({})
    const [story, setStory] = useState({})
    const [storyLikeUser, setStoryLikeUser] = useState([])
    const [sidebarShowStatus, setSidebarShowStatus] = useState(false)
    const { width } = useWindowDimensions();
//   const [loading, setLoading] = useState(true)
//   const [storyReadListStatus, setStoryReadListStatus] = useState(false)
    
    const formatHtml = (content) =>{
        return{
          html: `${content}`
        };
    }

    const editDate = (createdAt) => {
        const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        const d = new Date(createdAt);
        var datestring = d.getDate() + " " + monthNames[d.getMonth()] + " , " + d.getFullYear()
        return datestring
    }

    useEffect(() =>{
        
        const getDetailStory = async () => {
            const { slug } = route.params; 
            const URI = 'http://localhost:5000'
            try {
                const value = await AsyncStorage.getItem("authToken");
                setToken(value)
            } catch (e) {
                console.log(e)
            }

            var activeUser = {}
            try {
                
                const { data } = await axios.get(`${URI}/auth/private`, {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`,
                    }
                });
                activeUser = data.user
                setActiveUser(activeUser)
            }
            catch (error) {
                setActiveUser({})
            }

            try {
                const { data } = await axios.post(`${URI}/story/${slug}`, { activeUser })
                setStory(data.data)
                setLikeStatus(data.likeStatus)
                setLikeCount(data.data.likeCount)
                setStoryLikeUser(data.data.likes)
        
                const story_id = data.data._id;
        
                if (activeUser.readList) {
        
                  if (!activeUser.readList.includes(story_id)) {
                    setStoryReadListStatus(false)
                  }
                  else {
                    setStoryReadListStatus(true)
        
                  }
        
                }
        
              }
              catch (error) {
                setStory({})
              }
        }
        getDetailStory();
    }, [])

    return (
        <View>
            {
                story ?
                <ScrollView>
                    <View style={styles.headerPost} >
                        <Text style={styles.title}>{ story.title ?? ''}</Text>
                        <Text style={styles.date}>{ editDate(story.createdAt) ?? ''}</Text>
                    </View>
                    <View style={ styles.bodyPost }>
                        <RenderHtml contentWidth={width} source={ formatHtml(story.content) } />           
                    </View> 
                </ScrollView> :
                <Text></Text>
            }
            </View>
            
            );
        };

const styles = StyleSheet.create({
    bodyPost: {
        paddingHorizontal: 5,
    },
    title:{
        fontWeight: "bold",
        paddingVertical: 20,
        fontSize: 30
    },
    date:{
        fontWeight: "200"
    },
    headerPost:{
        marginTop:5,
        marginBottom: 15,
        paddingHorizontal: 15,
    }
});

export default PostInfo;