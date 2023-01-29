import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import Pagination from "../../components/Pagination";
import TabMenu from "../../components/TabMenu";
import { API_BASEURL, HEADER, PER_PAGE } from "../../config";
import { Type_Storage } from "../../types/types";
import { addComma, formatDate } from "../../utils/utils";
import MenuTitle from "../../components/MenuTitle";
import { defaultBorder } from "../../styles/mixin";

export default function Issues() {
  const getStorage = localStorage.getItem("storage");
  const storage = getStorage ? JSON.parse(getStorage) : [];

  const MENU_LIST = storage.map((e: any) => e.full_name);
  const [clickedMenu, setClickedMenu] = useState<string>(MENU_LIST[0]);

  const [currentIdx, setCurrentIdx] = useState<number>(1);
  const [totalCnt, setTotalCnt] = useState<number>(0);

  const [issueList, setIssueList] = useState([]);
  const [store, setStore] = useState<Type_Storage[]>(storage);

  const changeMenu = (menu: string) => {
    setClickedMenu(menu);
    getData(menu);
    checkTotalCnt();
  };

  const checkTotalCnt = () => {
    store.forEach((e) => {
      if (e.full_name === clickedMenu) {
        console.log(clickedMenu, e.issue_count);
        setTotalCnt(e.issue_count);
      }
    });
  };

  const getData = async (menu: string) => {
    console.log("MENU", menu);
    const storage = store;

    const url = `${API_BASEURL}repos/${menu}/issues?per_page=${PER_PAGE}&page=${currentIdx}`;
    axios
      .get(url, {
        headers: HEADER,
      })
      .then((res) => {
        if (res.status === 200) {
          // storage[idx].items = res.data;
          setIssueList(res.data);
        }
      });

    console.log("result", storage);
    setStore(storage);
  };

  useEffect(() => {
    getData(clickedMenu);
  }, [currentIdx]);

  useEffect(() => {
    getData(clickedMenu);
    checkTotalCnt();
  }, []);

  return (
    <Wrap>
      <MenuTitle title="Issues" />
      {MENU_LIST && MENU_LIST.length > 0 && (
        <TabMenu
          title={MENU_LIST}
          clickedMenu={clickedMenu}
          changeMenu={changeMenu}
        />
      )}
      <SearchResultWrap>
        <SearchResultInfoWrap>
          <SearchResultTitle>{addComma(totalCnt)} issues</SearchResultTitle>
          <SearchFilterWrap></SearchFilterWrap>
        </SearchResultInfoWrap>
        <ResultListWrap>
          {issueList &&
            issueList.map((data: any) => (
              <ResultList key={data.id}>
                <Info>
                  <NameWrap>
                    <Name
                      href={`https://github.com/${data.repository_url.replace(
                        "https://api.github.com/repos/",
                        ""
                      )}`}
                      target="_blank"
                    >
                      {data.repository_url.replace(
                        "https://api.github.com/repos/",
                        ""
                      )}
                    </Name>
                    <IssueNum href={data.html_url} target="_blank">
                      #{data.number}
                    </IssueNum>
                  </NameWrap>

                  <Title href={data.html_url} target="_blank">
                    {data.title}
                  </Title>
                  {data.description && <Desc>{data.description}</Desc>}
                  <SubInfo>
                    <a href={data.user.html_url}>{data.user.login}</a>
                    <span>opened {formatDate(data.created_at)}</span>
                  </SubInfo>
                </Info>
              </ResultList>
            ))}
        </ResultListWrap>
        {issueList && totalCnt > 0 && (
          <Pagination
            totalDataCnt={totalCnt}
            currentIdx={currentIdx}
            setCurrentIdx={setCurrentIdx}
          />
        )}
      </SearchResultWrap>
    </Wrap>
  );
}

const Wrap = styled.div``;

const SearchResultInfoWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 8px;
  margin-bottom: 30px;
`;

const SearchResultWrap = styled.div`
  margin-top: 20px;
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 20px;
  ${defaultBorder}
`;

const SearchFilterWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 22px;
`;

const SearchResultTitle = styled.span`
  color: #5b5b5b;
  font-size: 16px;
  font-weight: 500;
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

const NameWrap = styled.div`
  display: flex;
  gap: 7px;
  font-size: 12px;
  color: #57606a !important;
`;

const IssueNum = styled.a``;

const Name = styled.a`
  font-weight: bold;
`;

const Title = styled.a`
  font-size: 16px;
  font-weight: bold;
  color: ${({ theme }) => theme.main} !important;
  cursor: pointer;
  word-break: break-all;
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
  a {
    font-weight: 600;
  }

  span {
    &.link {
      cursor: pointer;
      &:hover {
        color: ${({ theme }) => theme.linkHover};
      }
    }
  }
`;
