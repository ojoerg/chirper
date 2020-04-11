import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../context/GlobalState";
import { addZeroToNumbers } from "../utils/format";

export const Posts = () => {
  const {
    posts,
    getPosts,
    getPostsFromFollowedUsers,
    allPosts,
    username,
    addRemoveLike,
    likeAddedRemoved,
    addAnswer,
    clearErrors,
    clearMessages,
  } = useContext(GlobalContext);
  const [showLikeUsers, setShowLikeUsers] = useState("");
  const [answer, setAnswer] = useState("");

  useEffect(() => {
    if (allPosts) {
      getPosts();
    } else {
      getPostsFromFollowedUsers(username);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [likeAddedRemoved]); // empty array for no loop

  const submitLike = (id) => {
    if (allPosts) {
      addRemoveLike(id, username);
    } else {
      addRemoveLike(id, username);
    }
  };

  const addLikesHeader = (index) => {
    if (index === 0) {
      return <h5 className="mt-2">Likes: </h5>;
    }
  };

  const handleLikeButton = (id, likes) => {
    if ((likeAddedRemoved[0] === id && likeAddedRemoved[1] === true) || likes.includes(username)) {
      return <i className="fas fa-heart fa-lg"></i>;
    } else {
      return <i className="far fa-heart fa-lg"></i>;
    }
  };

  const handleShowLikeUsers = (likes, id) => {
    if (showLikeUsers === id) {
      const likeUsers = likes.map((user, index) => {
        return (
          <div key={user}>
            {addLikesHeader(index)}
            <div className="d-flex align-items-center">
              <a className="" href={"/user/" + user}>
                {user}
              </a>
            </div>
          </div>
        );
      });
      return likeUsers;
    } else {
      return <></>;
    }
  };

  const submitAnswer = (e, id) => {
    e.preventDefault();
    const newAnswer = {
      text: answer,
      username,
      id,
    };
    console.log(newAnswer);

    clearMessages();
    clearErrors();
    addAnswer(newAnswer);
    if (allPosts) {
      getPosts();
    } else {
      getPostsFromFollowedUsers(username);
    }
  };

  return (
    <>
      <h4 className="text-center mt-3">
        {allPosts ? "All Posts" : "Posts from users you followed"}
      </h4>
      {posts.map((postObject) => {
        let date = new Date(postObject.created);
        return (
          <div className="toast show container mt-3" key={postObject._id}>
            <div className="toast-header">
              <strong className="mr-auto">
                <a className="" href={"/user/" + postObject.username}>
                  {postObject.username}
                </a>
              </strong>
              <small className="text-muted">
                {addZeroToNumbers(date.getHours())}:{addZeroToNumbers(date.getMinutes())} -{" "}
                {addZeroToNumbers(date.getDate())}.{addZeroToNumbers(date.getMonth() + 1)}.
                {date.getFullYear()}
              </small>
            </div>
            <div className="toast-body">{postObject.text}</div>
            <div className="toast-body">
              <button className="btn btn-info mr-2" onClick={() => submitLike(postObject._id)}>
                {handleLikeButton(postObject._id, postObject.likes)}
              </button>
              <button
                className="btn btn-info mr-2"
                onClick={() =>
                  showLikeUsers === postObject._id
                    ? setShowLikeUsers("")
                    : setShowLikeUsers(postObject._id)
                }>
                {postObject.likes.length === 1
                  ? `${postObject.likes.length} Like`
                  : `${postObject.likes.length} Likes`}
              </button>
            </div>
            {handleShowLikeUsers(postObject.likes, postObject._id)}
            <hr className="mb-0 mt-0" />
            <div className="toast-body">
              <form className="mb-3">
                <input
                  type="text"
                  id={`answer-${postObject._id}`}
                  //name={`answer-${postObject._id}`}
                  //id="answer"
                  name="answer"
                  className="form-control mt-1"
                  placeholder="Enter answer"
                  value={postObject._id.answer}
                  onChange={(e) => setAnswer(e.target.value)}
                />
                <button
                  type="submit"
                  className="btn btn-primary mt-1"
                  onClick={(e) => submitAnswer(e, postObject._id)}>
                  Add Answer
                </button>
              </form>

              {postObject.answers.map((answerObject) => {
                let answerDate = new Date(answerObject.created);
                return (
                  <div className="toast show col-auto shadow-none" key={answerObject._id}>
                    <div className="toast-header">
                      <strong className="mr-auto">
                        <a className="" href={"/user/" + answerObject.username}>
                          {answerObject.username}
                        </a>
                      </strong>
                      <small className="text-muted">
                        {addZeroToNumbers(answerDate.getHours())}:
                        {addZeroToNumbers(answerDate.getMinutes())} -{" "}
                        {addZeroToNumbers(answerDate.getDate())}.
                        {addZeroToNumbers(answerDate.getMonth() + 1)}.{answerDate.getFullYear()}
                      </small>
                    </div>
                    <div className="toast-body">{answerObject.text}</div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </>
  );
};
