/* eslint-disable react/prop-types */
import parse from "html-react-parser";

const MessageBubble = ({ prompt }) => {
  return (
    <div className="prompt">
      <div className="user">
        <p>{prompt.user}</p>
      </div>
      <div className="response">
        <div className="container">{parse(prompt.response)}</div>
      </div>
    </div>
  );
};

export default MessageBubble;
