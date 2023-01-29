import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import Input from "../../components/Input";
import Pagination from "../../components/Pagination";
import { PER_PAGE } from "../../config";
import { Type_RepoData, Type_Storage } from "../../types/types";

import { addComma, formatDate, getParamsValue } from "../../utils/utils";

export default function Repository() {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState(getParamsValue("keyword"));
  const [currentIdx, setCurrentIdx] = useState<number>(1);
  const [repoList, setRepoList] = useState<Type_RepoData>({
    total_count: 0,
    items: [],
  });
  const [store, setStore] = useState<Type_Storage[]>([]);

  const moveToSearch = () => {
    navigate(`/repository?keyword=${encodeURIComponent(searchValue)}`);
    getData();
    setCurrentIdx(1);
  };

  const setStorage = (id: string, issues_url: string) => {
    const storage = store;

    const findId = store.findIndex((e) => e.id === id);
    if (findId !== -1) {
      storage.splice(findId, 1);
    } else {
      if (storage.length < 4) {
        storage.push({ id, issues_url });
      } else {
        window.alert("4개 이상 등록하실 수 없습니다.");
      }
    }

    localStorage.setItem("storage", JSON.stringify(storage));
    setStore(storage);
  };

  console.log("storage", store);

  const getData = async () => {
    const url = `https://api.github.com/search/repositories?q=${searchValue}&per_page=${PER_PAGE}&page=${currentIdx}`;

    await axios
      .get(url, {
        headers: {
          Accept: "application/vnd.github.nightshade-preview+json",
        },
      })
      .then((res) => {
        if (res.status === 200) {
          console.log("re", res.data);
          setRepoList({
            total_count: res.data.total_count,
            items: res.data.items,
          });
        }
      });
  };

  useEffect(() => {
    getData();
  }, [currentIdx]);

  useEffect(() => {
    const getStorage = localStorage.getItem("storage");
    const storage = getStorage ? JSON.parse(getStorage) : [];
    setStore(storage);
  }, []);

  return (
    <Wrap>
      <SearchWrap>
        <Input
          placeholder="찾고 싶은 repository를 검색해 보세요"
          value={searchValue}
          height="32px"
          onChange={(e) => setSearchValue(e.target.value)}
          onKeyPressEvent={moveToSearch}
        />
        <SearchInputBtn
          type="button"
          disabled={searchValue.length > 0 ? false : true}
          onClick={() => moveToSearch()}
        >
          Search
        </SearchInputBtn>
      </SearchWrap>
      <SearchResultWrap>
        <SearchResultInfoWrap>
          <SearchResultTitle>
            {repoList && addComma(repoList?.total_count)} repository results
          </SearchResultTitle>
          <SearchFilterWrap></SearchFilterWrap>
        </SearchResultInfoWrap>
        <ResultListWrap>
          {repoList?.items &&
            repoList.items.map((data: any) => (
              <ResultList key={data.id}>
                <Info>
                  <Name href={data.html_url} target="_blank">
                    {data.full_name}
                  </Name>
                  {data.description && <Desc>{data.description}</Desc>}
                  <SubInfo>
                    {data.stargazers_count > 0 && (
                      <span className="link">
                        ⭐️ {addComma(data.stargazers_count)}
                      </span>
                    )}
                    {data.language && <span>{data.language}</span>}
                    <span>Updated on {formatDate(data.pushed_at)}</span>
                  </SubInfo>
                </Info>
                <AddBtn onClick={() => setStorage(data.id, data.issues_url)}>
                  {store.findIndex((e) => e.id === data.id) < 0 ? (
                    <img src="/images/button/plus.svg" alt="plus" />
                  ) : (
                    <img src="/images/button/minus.svg" alt="minus" />
                  )}
                </AddBtn>
              </ResultList>
            ))}
        </ResultListWrap>
        {repoList && (
          <Pagination
            totalDataCnt={repoList.total_count}
            currentIdx={currentIdx}
            setCurrentIdx={setCurrentIdx}
          />
        )}
      </SearchResultWrap>
    </Wrap>
  );
}

const Wrap = styled.div`
  padding-top: 50px;
`;

const SearchResultInfoWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 8px;
  margin-bottom: 30px;
`;

const SearchResultWrap = styled.div`
  font-size: 20px;
`;

const SearchFilterWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 22px;
`;

const SearchResultTitle = styled.span`
  color: #5b5b5b;
  font-weight: 400px;
`;

const SearchWrap = styled.div`
  display: flex;
  justify-content: center;
  width: 90%;
  gap: 7px;
`;

const SearchInputBtn = styled.button`
  border: 1px solid black;
  padding: 5px;
  background-color: pink;
  border-radius: 10px;
  font-size: 14px;
`;

const ResultListWrap = styled.div`
  display: flex;
  flex-direction: column;
`;

const ResultList = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid black;
  padding: 24px 0px;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  gap: 7px;
`;

const AddBtn = styled.button`
  max-width: 30px;
  height: 30px;

  img {
    width: 100%;
    cursor: pointer;
  }
`;

const Name = styled.a`
  font-size: 16px;
  font-weight: bold;
  color: ${({ theme }) => theme.linkHover} !important;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const Desc = styled.p`
  font-size: 14px;
  cursor: text;
`;

const SubInfo = styled.div`
  display: flex;
  gap: 10px;
  font-size: 12px;

  span {
    &.link {
      cursor: pointer;
      &:hover {
        color: ${({ theme }) => theme.linkHover};
      }
    }
  }
`;
