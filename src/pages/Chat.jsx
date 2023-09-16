import { useState } from "react"
import MessageList from "../components/MessageList";
import { BsPlusCircle } from "react-icons/bs";
import { styled } from "styled-components";
import { dummy } from "../dummy";
import MessageListPlus from "../components/MessageListPlus"; 
// back 아이콘, 전송 버튼 아이콘 머터리얼 아이콘 사용 






export default function Chat() {
    const [data, setData] = useState([]);
    const [message, setMessage] = useState("");
    const [allowSend, setAllowSend] = useState(false);
    

    // input value 받아오고 공백 확인
    const handleMessage = (e) => {
      const newMessage = e.target.value;
      setMessage(newMessage);
      setAllowSend(newMessage.trim() !== "");
    };
  
    // 메세지 값을 전송하고, 기존 값에 새로운 값을 추가 
    const handleSubmit = () => {
      if (message.trim() !== "") {
        const newMessage = {
          id: Date.now(),
          user_id: 1,
          created_at: new Date().toISOString(),
          msg: {
            mtype: "text",
            content: message,
          },
        };
  
        setData((prevData) => [...prevData, newMessage]);
        setMessage("");
      }
    };


    // Enter key 메세지 전송 기능
    const handleKey = (e) => {
        if(e.key === 'Enter'){
            handleSubmit()
        }
    }

    
  
    return (
      <div>
        <ChatWrap>
          <div className="titleWrap">
            <span className="material-icons">chevron_left</span>
            <img src={dummy[0].photo_url} alt="프로필사진" />
            {dummy[0].user_name}
          </div>
          <div className="contentWrap">
            <MessageList data={data} />
            <MessageListPlus data={data} />
          </div>
          <div className="lowerWrap">
            <BsPlusCircle className="plusBtn" />
            <div className="inputWrap">
              <input
                type="text"
                className="input"
                value={message}
                onChange={handleMessage}
                onKeyPress={handleKey}
                placeholder="메세지를 입력해주세요"
              />
              {/*  입력창 텍스트 입력 전 placeholder */}
              <button onClick={handleSubmit} className="material-icons" disabled={!allowSend}>
                arrow_upward
              </button>
            </div>
          </div>
        </ChatWrap>
      </div>
    );
  }
  

const ChatWrap = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 50vw; 
    max-width: 360px;
    height: 100vh; 
    max-height: 720px;
    // 채팅방 크기 360 * 720 고정

    background-color: #FFF9EF;
    // 채팅방 background-color: #FFF9EF

    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);

    display: flex;
    flex-direction: column;
    text-align: center;

    
    
    .titleWrap {
        margin-top: 0;
        font-size: 15px;
        font-weight: 500;
        color: #262626;
        background-color: #FAF0E1;
        // 상단 바 background-color: #FAF0E1

        padding-top: 10px;
        padding-bottom: 10px;
        display: flex;
        justify-content: center;
        padding-right: 5px;
        align-items: center;
       
        .material-icons {
            color: #787878;
            font-size: 25px;

            cursor: pointer;
            position: absolute;
            left: 5%;
            
        }


        img {
            border-radius: 12px;
            width: 28px;
            height: 28px;
            margin-right: 8px;
        }
    }

    .contentWrap {
        flex: 1;
        overflow: scroll;
    }

    .lowerWrap {
        display: flex;
        width: 100%;
        background-color: #FAF0E1;
        // 하단 바 background-color: #FAF0E1

        padding-top: 16px;
        padding-bottom: 16px;
        align-items: center;

        .plusBtn {
            font-size: 32px;
            color: #c8c8c8;
            cursor: pointer;

            margin-left: 20px;
            margin-right: 8px;
        }
    }
    .inputWrap {
        width: 280px;
        height: 40px;
        display: flex;
        border-radius: 100px;
        background-color: white;
        border: 1px solid #e2e0e0;
        margin-right: 25px;
     
        button:disabled {
            font-size: 19px;
            width: 30px;
            height: 30px;
            border-radius: 20px;
            background-color: #c8c8c8;
            color: white;
            display: flex;
            justify-content: center;
            align-items: center;
            margin-right: 20px;
            margin-top: 5px;
            cursor: default;
            border: none;
        }

        // 전송 버튼 메시지의 length > 0일 때만 보이도록 구현
        button {
            font-size: 19px;
            width: 30px;
            height: 30px;
            border-radius: 20px;
            background-color: #000069;
            color: white;
            
            display: flex;
            justify-content: center;
            align-items: center;

            margin-right: 20px;
            margin-top: 5px;
            cursor: pointer;
            border: none;
        }
    }

    .input {
        width: 100%;
        outline: none;
        border: none;
        height: 17px;
        font-size: 14px;
        color: #505050;

        margin-top: 9px;
        margin-left: 14px;

    }
`;
