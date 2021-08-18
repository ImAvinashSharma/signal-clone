import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { ListItem, Avatar } from "react-native-elements";
import { db } from "../firebase";

const CustomListItem = ({ id, chatName, enterChat }) => {
  const [chatMessage, setChatMessage] = useState([]);

  useEffect(() => {
    const unsubscribe = db
      .collection("chats")
      .doc(id)
      .collection("messages")
      .orderBy("timestamp", "asc")
      .onSnapshot(snapshot => setChatMessage(snapshot.docs.map(doc => doc.data())));
    return unsubscribe;
  });

  return (
    <ListItem key={id} onPress={() => enterChat(id, chatName)} key={id} bottomDivider>
      <Avatar rounded source={{ uri: chatMessage?.[chatMessage.length - 1]?.photoURL || "https://toppng.com/uploads/preview/roger-berry-avatar-placeholder-11562991561rbrfzlng6h.png" }} />
      <ListItem.Content>
        <ListItem.Title style={{ fontWeight: "800" }}>{chatName}</ListItem.Title>
        <ListItem.Subtitle numberOfLines={1} ellipsizerMode="tail">
          {chatMessage?.[chatMessage.length - 1]?.displayName} : {chatMessage?.[chatMessage.length - 1]?.message}
        </ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  );
};

export default CustomListItem;

const styles = StyleSheet.create({});
