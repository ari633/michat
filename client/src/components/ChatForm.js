import React, { useState, useRef, useEffect } from "react";

export function ChatForm({
  messages,
  disconnect,
  doSendMessage,
  username,
  roomId,
}) {
  const [value, setValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const ref = useRef(null);
  useEffect(() => {
    if (messages.length) {
      ref.current?.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  }, [messages]);

  function onSubmit(event) {
    event.preventDefault();
    setIsLoading(true);

    doSendMessage(value, roomId, () => {
      setIsLoading(false);
      setValue("");
    });
  }


  return (
    <>
      <div className="flex-space">
        <button onClick={disconnect} className="button-nude">
          Exit
        </button>
        <h1>{roomId}</h1>
      </div>
      <div className="messages">
        {messages.map((item, index) => (
          <div
            className={
              item.from === username ? "flex-mymessage" : "flex-message"
            }
            key={`msg_${index}`}
          >
            <div className="card">
              {item.from}
              <div
                className={
                  item.from === username ? "card-mymessage" : "card-message"
                }
                key={index}
              >
                {item.text}
              </div>
            </div>
          </div>
        ))}
        <div ref={ref} />
      </div>
      <form onSubmit={onSubmit}>
        <div className="group-new-input">
          <input
            className="form-input new-input"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Message here..."
          />
          <button
            type="submit"
            disabled={isLoading || value === ""}
            className="button-send"
          >
            &#8679;
          </button>
        </div>
      </form>
    </>
  );
}
