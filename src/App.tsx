import React, {useEffect, useRef, useState} from "react";
import {SearchForm} from "./components/SearchComponent/SearchFrom/SearchForm";
import {UserInfo} from "./types/UserInfo.ts";
import {fetchUsers} from "./models/ApiActions.ts";
import {SearchState} from "./types/SearchState.ts";
import {SearchResults} from "./components/SearchResults/SearchResults.tsx";
import './App.css'
import {SEARCH_THRESHOLD_MS} from "./env/EnviromentVariablesResolver.tsx";

export const App: React.FC = () => {
  // search component states
  const [searchString, setSearchString] = useState<string>('')
  const [searchLimit, setSearchLimit] = useState<number>(3)

  // fetch state
  const [fetchedUsers, setFetchedUsers] = useState<UserInfo[]>([])
  const [searchState, setSearchState]
    = useState<{ state: SearchState, message?: string}>({ state: SearchState.PREPARING })

  // preventing too frequent API requests - the request is sent only after pausing the input
  const searchTimeout = useRef<number>(0)

  useEffect(() => {
    if (searchString?.length > 0) {
      // if search string changes before the threshold - erase previous timeout with delayed search action
      window.clearTimeout(searchTimeout?.current)

      searchTimeout.current = window.setTimeout(() => {
        setSearchState({ state: SearchState.LOADING })
        fetchUsers(searchString, searchLimit)
          .then(fetchedUsers => {
            if (fetchedUsers?.length > 0) {
              setFetchedUsers(fetchedUsers)
              setSearchState({ state: SearchState.OK })
            } else {
              setSearchState({
                state: SearchState.ERROR,
                message: 'По вашему запросу ничего не найдено'
              })
            }
          })
          .catch(err => setSearchState({
            state: SearchState.ERROR,
            message: (err as Error)?.message
          }))
      }, SEARCH_THRESHOLD_MS)
    } else {
      window.clearTimeout(searchTimeout?.current)
      setSearchState({ state: SearchState.PREPARING })
      setFetchedUsers([])
    }
  }, [searchString, searchLimit]);

  const renderSearchResults = () => {
    switch (searchState.state) {
      case SearchState.OK:
        return <SearchResults results={fetchedUsers} />
      case SearchState.ERROR:
        return <div>{searchState?.message}</div>
      case SearchState.LOADING:
        return <div>Загрузка данных...</div>
      default:
        return <div>🧐 Введите что-нибудь, чтобы начать поиск</div>
    }
  }

  return (
    <div className={'app-wrapper'}>
      <SearchForm
        searchStringValue={searchString}
        onSearchStringChange={setSearchString}
        limitSelectorValue={searchLimit}
        onLimitSelectorChange={setSearchLimit}
      />
      {renderSearchResults()}
    </div>
  );
}
