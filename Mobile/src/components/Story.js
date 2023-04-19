import React, {useState,useEffect} from 'react'
import { Card, Text } from 'react-native-paper';
import RenderHtml from 'react-native-render-html';
export default function Story({navigation,data}) {
    const [source, setSource] = useState({
        html: ''
    })
    useEffect(() =>{

        const dataHtml = {
            html: `${data.content}`
          };
          setSource(dataHtml)
    }, [data])
    const editDate = (createdAt) => {
        const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
        ];
        const d = new Date(createdAt);
        var datestring = d.getDate() + " " +monthNames[d.getMonth()] + " ," + d.getFullYear() 
        return datestring
    }

    const truncateContent = (content) => {
        const trimmedString = content.substr(0, 73);
        return trimmedString
    }
    const truncateTitle= (title) => {
        const trimmedString = title.substr(0, 69);
        return trimmedString
    }
  return (
    <Card
        style={{
          margin: 10,
          padding: 15,
          borderColor: 'gray',
        }}
        onPress={()=> console.log(navigation) }
      >
        <Card.Cover source={{ uri: `http://localhost:5000/storyImages/${data.image}` }} />
        <Card.Title
          titleNumberOfLines={2}
          title={data.title}
          titleStyle={{ lineHeight: 26, fontWeight: "bold", fontSize: 20 }}
        />
        <Card.Content>
          <RenderHtml source={source}/>
          <Text numberOfLines={3}>{editDate(data.createdAt)} </Text>
        </Card.Content>
      </Card>
  )
}
