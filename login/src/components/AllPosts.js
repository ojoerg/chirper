import React from "react";
import { HeaderHome } from "./HeaderHome";
import { Posts } from "./Posts";
import { MessagesAndErrors } from "./MessagesAndErrors";

export const AllPosts = () => {
  return (
    <>
      <HeaderHome />
      <MessagesAndErrors />
      <Posts />
    </>
  );
};
