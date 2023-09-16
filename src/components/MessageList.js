import React, { useEffect, useState } from "react";
import axios from "axios";
import MessageForm from "./MessageForm";

// API 객체에서 받은 데이터를 MessageForm 형식으로 나열
const MessageList = ({ data }) => {
  const [messageData, setMessageData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://test.vanillabridge.com/test_data"
        );
        const apiData = response.data;

        const initData = apiData.map((it) => ({
          id: it.id,
          user_id: it.user_id,
          user_name: it.user_name,
          photo_url: it.photo_url,
          created_at: it.created_at,
          msg: {
            mtype: it.msg.mtype,
            content: it.msg.content,
          },
        }));

        // id, created_at 비교 후 오름차순으로 정렬
        const sortedData = initData.sort((a, b) => {
          if (a.id !== b.id) {
            return a.created_at.localeCompare(b.created_at);
          }
          return a.id - b.id;
        });

        setMessageData(sortedData);
      } catch (error) {
        console.error("API 호출 및 데이터 가공 중 에러 발생:", error);
      }
    };

    console.log("Rendering MessageList with data:", messageData);

    fetchData();
  }, []);
  return (
    <div>
      {messageData.map((item) => (
        <MessageForm key={item.id} {...item} />
      ))}
    </div>
  );
};

export default MessageList;
