import { useState } from "react";
import { styled } from "styled-components";

// api 데이터 created_at을 오전, 오후로 나눠서 구분 후 시간 형식으로 재정리
function formatCreatedAt(created_at) {
  const date = new Date(created_at);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const period = hours >= 12 ? "오후" : "오전";
  const formattedHours = hours > 12 ? hours - 12 : hours;
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  return `${period} ${formattedHours}:${formattedMinutes}`;
}

// api 데이터를 화면에 보여주는 방식
const MessageForm = ({
  id,
  user_id,
  user_name,
  photo_url,
  created_at,
  msg,
}) => {
  const [popUp, setPopUp] = useState(false);

  const formattedCreatedAt = formatCreatedAt(created_at);

  const toggleModal = () => {
    setPopUp(!popUp);
  };

  return (
    <Form>
      {/* 프로필 사진 클릭시 확대 사진 모달창 업로드 */}
      {popUp && (
        <div className="Modal" onClick={toggleModal}>
          <img src={photo_url} alt="프로필사진" />
        </div>
      )}
      {user_id === 1 ? (
        <MyMessageFormWrap>
          <div className="messageFormWrap">
            <div className="messageWrap">
              <div className="time">{formattedCreatedAt}</div>
              <div className="message">{msg.content}</div>
            </div>
          </div>
        </MyMessageFormWrap>
      ) : (
        <OtherMessageFormWrap>
          <div className="messageFormWrap">
            <div className="userWrap">
              <img onClick={toggleModal} src={photo_url} alt="프로필사진" />
              {user_name}
            </div>
            <div className="messageWrap">
              {msg.mtype === "text" ? (
                <div className="message">{msg.content}</div>
              ) : (
                <div className="noMessage">{"photo"}</div>
              )}
              <div className="time">{formattedCreatedAt}</div>
            </div>
          </div>
        </OtherMessageFormWrap>
      )}
    </Form>
  );
};
const Form = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 5px 14px 5px 14px;
  flex-direction: column;

  .Modal {
    display: flex;
    position: fixed;
    inset: 0px;
    background-color: rgba(255, 255, 255, 0.85);
    justify-content: center;
    align-items: center;
    width: 250px;
    height: 250px;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    border: 1px soild black;
    padding: 25px;

    img {
      width: 100%;
      border: none;
      border-radius: 10px;
    }
  }
`;

const OtherMessageFormWrap = styled.div`
  display: flex;
  margin: 10px 5px 10px 5px;
  .messageFormWrap {
    display: flex;
    // justify-content: flex-start;
    flex-direction: column;
  }

  .userWrap {
    display: flex;
    font-size: 14px;
    font-weight: 500;
    color: #3c3c3c;
    align-items: center;
  }

  .messageWrap {
    display: flex;
  }

  .message {
    font-size: 13px;
    display: flex;
    // flexbox 형태로 구현
    
    max-width: 160px;
    // 메시지 범위 초과 방지를 위한  max-width 값 할당

    padding: 10px;
    margin-left: 36px;

    color: #5a5a5a;
    background-color: white;
    상대 메시지 background-color: 흰색

    border-radius: 0 12px 12px 12px;
    // 상대방 메시지 박스 border-radius 적용
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.2);

    text-align: start;
  }

  .noMessage {
    font-size: 13px;
    display: flex;
    max-width: 160px;
    padding: 10px;
    margin-left: 36px;

    color: #5a5a5a;
    background-color: white;
    border-radius: 0 12px 12px 12px;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.2);

    text-align: start;
  }

  .time {
    display: flex;
    font-size: 10px;
    color: #969696;

    justify-content: flex-end;
    align-items: flex-end;
    margin-left: 5px;
  }

  img {
    border-radius: 12px;
    width: 28px;
    height: 28px;
    margin-right: 8px;
    cursor: pointer;
  }
`;
const MyMessageFormWrap = styled.div`
  display: flex;
  margin: 10px 5px 10px 5px;
  justify-content: flex-end;

  .messageFormWrap {
    display: flex;
    justify-content: flex-end;
    flex-direction: column;
  }

  .messageWrap {
    display: flex;
  }

  .time {
    display: flex;
    font-size: 10px;
    color: #969696;
    align-items: flex-end;
    margin-right: 5px;
    justify-content: flex-end;
  }

  .message {
    font-size: 13px;
    display: flex;
    max-width: 160px;
    padding: 10px;
    color: white;
    background-color: #03006e;
    나의 메시지 background-color: #03006E
    
    border-radius: 12px 12px 12px 12px;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.2);
    text-align: start;
`;

export default MessageForm;
