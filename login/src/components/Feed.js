import React, { useContext, useEffect } from "react";
import { GlobalContext } from "../context/GlobalState";
import { addZeroToNumbers } from "../utils/format";

export const Feed = () => {
  const { posts, getPosts } = useContext(GlobalContext);

  useEffect(() => {
    getPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // empty array for no loop

  return (
    <div className="list-group container">
      {posts.map(postObject => {
        let date = new Date(postObject.created);
        return (
          <div
            href="#"
            className="list-group-item list-group-item-action flex-column justify-content-center align-items-start"
            key={postObject._id}>
            <div className="d-flex w-100 justify-content-between">
              <h5 className="mb-1">{postObject.user}</h5>
              <small className="text-muted">
                {addZeroToNumbers(date.getHours())}:{addZeroToNumbers(date.getMinutes())} -{" "}
                {addZeroToNumbers(date.getDate())}.{addZeroToNumbers(date.getMonth() + 1)}.
                {date.getFullYear()}
              </small>
            </div>
            <p className="mb-1">{postObject.text}</p>
          </div>
        );
      })}
    </div>
  );
};
