import React, {useState, useCallback, useEffect} from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  TextInput,
  StyleSheet,
  Pressable,
  Alert,
} from 'react-native';
console.reportErrorsAsExceptions = false;
import {Bubble, GiftedChat, InputToolbar} from 'react-native-gifted-chat';

const ChatBox = ({route, navigation}) => {
  const [messages, setMessages] = useState([]);
  const ip = '192.168.1.3';
  const {uidR, uidS} = route.params;

  useEffect(() => {
    let repeat;
    let isUnmouted = false;
    fetch(`http://${ip}/WebService/loadChat.php`, {
      method: 'POSt',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        idR: uidR,
        idS: uidS,
      }),
    })
      .then(response => response.json())
      .then(responseJson => {
        const Data = [];
        if (responseJson != null) {
          for (let index = 0; index < responseJson.length; index++) {
            Data.push({
              _id: responseJson[index].token,
              text: responseJson[index].mess,
              image: responseJson[index].img,
              createdAt: responseJson[index].time,
              user: {
                _id: responseJson[index].uis,
                avatar: responseJson[index].avatar,
              },
            });
          }
          if (!isUnmouted) {
            setMessages(Data);
          }
        }
      })
      .catch(err => console.error(err));
    return () => {
      isUnmouted = true;
    };
  }, [messages]);

  const goBack = () => {
    navigation.goBack();
  };

  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, messages),
    );
    const {_id, createdAt, text, user} = messages[0];

    fetch(`http://${ip}/WebService/chat.php`, {
      method: 'POSt',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        uidS: user._id,
        uidR: uidR,
        message: text,
        time: createdAt,
        token: messages[0]._id,
        img: '',
      }),
    });
  }, []);

  const renderBubble = props => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: '#2e64e5',
          },
          left: {
            backgroundColor: '#444444',
          },
        }}
        textStyle={{
          right: {
            color: '#fff',
          },
          left: {
            color: '#fff',
          },
        }}
      />
    );
  };

  const renderInputToolbar = props => {
    return (
      <>
        <InputToolbar
          {...props}
          containerStyle={{
            borderRadius: 20,
            marginLeft: 5,
            marginRight: 5,
          }}
          textInputStyle={{color: 'black'}}
        />
      </>
    );
  };

  return (
    <>
      <Pressable
        onPress={() => {
          goBack();
        }}>
        <Text>Go back</Text>
      </Pressable>
      <GiftedChat
        optionTintColor="black"
        messages={messages}
        onSend={messages => onSend(messages)}
        user={{
          _id: uidS,
        }}
        loadEarlier={true}
        renderBubble={renderBubble}
        scrollToBottom
        renderInputToolbar={renderInputToolbar}
      />
    </>
  );
};

export default ChatBox;
