import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { HeaderHome } from "./HeaderHome";
import { GlobalContext } from "../context/GlobalState";
import { MessagesAndErrors } from "./MessagesAndErrors";
import { addZeroToNumbers } from "../utils/format";

export const User = () => {
  const params = useParams();
  const usernameParam = params.username;
  const { user, getUser, filePath, getFile, posts, getPostsFromUser } = useContext(GlobalContext);

  useEffect(() => {
    getUser(usernameParam);
    getFile("profilePicture", usernameParam);
    getPostsFromUser(usernameParam);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <HeaderHome />
      <MessagesAndErrors />
      <div className="row mt-5 mx-auto">
        <div className="card col-md-6 m-auto pl-0 pr-0">
          <div className="bg-primary text-light card-header">
            <h1 className="text-center mb-1">{user.username}</h1>
          </div>
          <div className="card-body">
            <div className="text-center">
              <img
                src={`http://${process.env.REACT_APP_HOSTNAME}/${filePath}`}
                alt="profile img"
                className="col-md-3"></img>
            </div>
            <table className="table table-hover mt-5">
              <tbody>
                <tr>
                  <th scope="row">Firstname:</th>
                  <td>{user.firstname}</td>
                </tr>
                <tr>
                  <th scope="row">Lastname:</th>
                  <td>{user.lastname}</td>
                </tr>
                <tr>
                  <th scope="row">E-Mail:</th>
                  <td>{user.email}</td>
                </tr>
                <tr>
                  <th scope="row">Posts:</th>
                  <td>
                    {!posts || posts.length === 0 ? (
                      <p>No Posts from {user.username}</p>
                    ) : (
                      posts.map(postObject => {
                        let date = new Date(postObject.created);
                        return (
                          <div className="toast show mt-3" key={postObject._id}>
                            <div className="toast-header">
                              <strong className="mr-auto">{postObject.username}</strong>
                              <small className="text-muted">
                                {addZeroToNumbers(date.getHours())}:
                                {addZeroToNumbers(date.getMinutes())} -{" "}
                                {addZeroToNumbers(date.getDate())}.
                                {addZeroToNumbers(date.getMonth() + 1)}.{date.getFullYear()}
                              </small>
                            </div>
                            <div className="toast-body">{postObject.text}</div>
                          </div>
                        );
                      })
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};
