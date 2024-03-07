import { UserCard } from "../UserCard/UserCard";

import "./style.css";
import React from "react";
import {UserInfo} from "../../types/UserInfo.ts";

interface SearchResultsProps {
  results: UserInfo[];
}

export const SearchResults: React.FC<SearchResultsProps> = ({ results }) => {
  return (
    <div className="usersList">
      {results.map((user) => (
        <UserCard {...user} key={user.id}/>
      ))}
    </div>
  );
}
