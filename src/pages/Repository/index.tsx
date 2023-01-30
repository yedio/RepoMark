import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import Input from "../../components/Input";
import Pagination from "../../components/Pagination";
import { API_BASEURL, HEADER, PER_PAGE } from "../../config";
import { Type_RepoData, Type_Storage } from "../../types/types";
import { addComma, formatDate, getParamsValue } from "../../utils/utils";
import MenuTitle from "../../components/MenuTitle";
import { defaultBorder, defaultBtn } from "../../styles/mixin";

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

  const setStorage = (
    id: string,
    full_name: string = "",
    issue_count: number = 0
  ) => {
    const storage = store;

    const findId = store.findIndex((e) => e.id === id);
    if (findId !== -1) {
      storage.splice(findId, 1);
    } else {
      if (storage.length < 4) {
        storage.push({ id, full_name, issue_count });
      } else {
        window.alert("4개 이상 등록하실 수 없습니다.");
      }
    }

    setStore([...storage]);
    localStorage.setItem("storage", JSON.stringify(storage));
  };

  const searchHighlight = (text: string) => {
    const title = text.toLowerCase();
    const value = searchValue.toLowerCase();
    if (value !== "" && title.includes(value)) {
      const matchText = text.split(new RegExp(`(${value})`, "gi"));
      return (
        <>
          {matchText.map((text, index) =>
            text.toLowerCase() === searchValue.toLowerCase() ? (
              <span key={index} style={{ fontWeight: 600 }}>
                {text}
              </span>
            ) : (
              text
            )
          )}
        </>
      );
    }

    return text;
  };

  const getData = async () => {
    const url = `${API_BASEURL}search/repositories?q=${searchValue}&per_page=${PER_PAGE}&page=${currentIdx}`;

    await axios
      .get(url, {
        headers: HEADER,
      })
      .then((res) => {
        if (res.status === 200) {
          setRepoList({
            ...repoList,
            total_count: res.data.total_count,
            items: res.data.items,
          });
        }
      });
  };

  useEffect(() => {
    if (searchValue) {
      getData();
    }
  }, [currentIdx]);

  useEffect(() => {
    const getStorage = localStorage.getItem("storage");
    const storage = getStorage ? JSON.parse(getStorage) : [];
    setStore(storage);
  }, []);

  return (
    <Wrap>
      <MenuTitle title="Repository" />
      <SearchWrap>
        <Input
          placeholder="찾고 싶은 repository를 검색해 보세요"
          value={searchValue}
          height="40px"
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
      <Container>
        <StorageWrap>
          <StorageTitle>Bookmark</StorageTitle>
          <StorageList>
            {store.length > 0 ? (
              store.map((data) => (
                <StorageItem key={data.id}>
                  {data.full_name}
                  <DeleteBtn onClick={() => setStorage(data.id)}>
                    <img src="images/button/close.svg" alt="close" />
                  </DeleteBtn>
                </StorageItem>
              ))
            ) : (
              <NoStorageItem>등록된 Repository가 없습니다.</NoStorageItem>
            )}
          </StorageList>
        </StorageWrap>
        <SearchResultWrap>
          <SearchResultTitle>
            {repoList && addComma(repoList?.total_count)} repository results
          </SearchResultTitle>
          <ResultListWrap>
            {repoList?.items && repoList.items.length > 0 ? (
              repoList.items.map((data: any) => (
                <ResultList key={data.id}>
                  <Info>
                    <Name href={data.html_url} target="_blank">
                      {searchHighlight(data.full_name)}
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
                  <AddBtn
                    onClick={() =>
                      setStorage(
                        data.id,
                        data.full_name,
                        data.open_issues_count
                      )
                    }
                  >
                    {store.findIndex((e) => e.id === data.id) < 0 ? (
                      <img src="/images/button/plus.svg" alt="plus" />
                    ) : (
                      <img src="/images/button/minus.svg" alt="minus" />
                    )}
                  </AddBtn>
                </ResultList>
              ))
            ) : (
              <NoListItem>검색된 결과가 없습니다.</NoListItem>
            )}
          </ResultListWrap>
          {repoList && repoList.total_count > 0 && (
            <Pagination
              totalDataCnt={repoList.total_count}
              currentIdx={currentIdx}
              setCurrentIdx={setCurrentIdx}
            />
          )}
        </SearchResultWrap>
      </Container>
    </Wrap>
  );
}

const Wrap = styled.div``;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 20px;

  @media (max-width: 720px) {
    flex-direction: column;
  }
`;

const SearchResultWrap = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 20px;
  gap: 20px;
  ${defaultBorder}
`;

const SearchResultTitle = styled.span`
  color: #5b5b5b;
  font-size: 16px;
  font-weight: 500;
`;

const SearchWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 7px;
  margin-bottom: 20px;
`;

const SearchInputBtn = styled.button`
  ${defaultBtn}
`;

const StorageWrap = styled.div`
  position: -webkit-sticky;
  position: sticky;
  top: 84px;
  display: flex;
  flex-direction: column;
  height: max-content;
  width: 360px;
  padding: 20px;
  gap: 20px;
  ${defaultBorder}

  @media (max-width: 720px) {
    width: 100%;
    position: inherit;
  }
`;

const StorageTitle = styled.h2`
  font-size: 16px;
  font-weight: 500;
`;

const StorageList = styled.ul`
  display: flex;
  flex-direction: column;
  width: 100%;
  border-radius: 10px;
  padding: 10px;
  gap: 10px;
  background-color: ${({ theme }) => theme.back};
`;

const StorageItem = styled.li`
  font-size: 13px;
  position: relative;
  word-break: break-all;
  border: 1px solid ${({ theme }) => theme.inputBorder};
  border-radius: 6px;
  padding: 5px 25px 5px 5px;
  background-color: #fff;
`;

const DeleteBtn = styled.button`
  width: 8px;
  position: absolute;
  top: 3px;
  right: 5px;

  img {
    cursor: pointer;
  }
`;

const NoStorageItem = styled.li`
  font-size: 14px;
  margin: 10px auto;
`;

const NoListItem = styled.li`
  font-size: 14px;
  margin: 50px auto;
`;

const ResultListWrap = styled.div`
  display: flex;
  flex-direction: column;
`;

const ResultList = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid ${({ theme }) => theme.inputBorder};
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
  color: ${({ theme }) => theme.main} !important;
  cursor: pointer;

  span {
    color: ${({ theme }) => theme.main} !important;
    cursor: pointer;
  }

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

  @media (max-width: 480px) {
    flex-direction: column;
    gap: 5px;
  }

  span {
    &.link {
      cursor: pointer;
      &:hover {
        color: ${({ theme }) => theme.main};
      }
    }
  }
`;
