import React, { useContext, useEffect } from "react";
import { GlobalContext } from "../context/GlobalState";
import { addZeroToNumbers } from "../utils/format";

export const Posts = () => {
  const { posts, getPosts, getPostsFromFollowedUsers, allPosts, username } = useContext(
    GlobalContext
  );

  useEffect(() => {
    if (allPosts) {
      getPosts();
    } else {
      getPostsFromFollowedUsers(username);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // empty array for no loop

  return (
    <>
      <h4 className="text-center mt-3">{allPosts ? "All Posts" : "Posts from followed users"}</h4>
      {posts.map(postObject => {
        let date = new Date(postObject.created);
        return (
          <div className="toast show container mt-3" key={postObject._id}>
            <div className="toast-header">
              <strong className="mr-auto">{postObject.username}</strong>
              <small className="text-muted">
                {addZeroToNumbers(date.getHours())}:{addZeroToNumbers(date.getMinutes())} -{" "}
                {addZeroToNumbers(date.getDate())}.{addZeroToNumbers(date.getMonth() + 1)}.
                {date.getFullYear()}
              </small>
            </div>
            <div className="toast-body">{postObject.text}</div>
          </div>
        );
      })}
    </>
  );
};
