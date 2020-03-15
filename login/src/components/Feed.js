import React, { useContext, useEffect } from "react";
import { GlobalContext } from "../context/GlobalState";
import { addZeroToNumbers } from "../utils/format"

export const Feed = () => {
  const { posts, getPosts } = useContext(GlobalContext);

  useEffect(() => {
    getPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // empty array for no loop

  // if (post[0]) {
  //   console.log(typeof post[0].date.getMinutes());
  //   }

  return (
    <div className="feed">
      {posts.reverse().map(postObject => {
        let date = new Date(postObject.created);
        console.log(date);
        return (
          <div key={postObject._id}>
            {postObject.user}
            <br />
            <br />
            {postObject.text}
            <br />
            <br />
            {addZeroToNumbers(date.getHours())}:
            {addZeroToNumbers(date.getMinutes())}{" "}
            - {addZeroToNumbers(date.getDate())}.{addZeroToNumbers(date.getMonth() + 1)}.
            {date.getFullYear()}
            <br />
            <br />
            <hr />
            <br />
          </div>
        );
      })}
    </div>
  );
};
