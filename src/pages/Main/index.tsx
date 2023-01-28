import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Input from "../../components/Input";

export default function Main() {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");

  const moveToSearch = () => {
    navigate(`/repository?keyword=${encodeURIComponent(searchValue)}`);
  };

  return (
    <Wrap>
      <Title>
        관심있는 Repository를 등록하여 issue들을 한 눈에 모아보세요!
      </Title>
      <SearchWrap>
        <Input
          placeholder="찾고 싶은 repository를 검색해 보세요"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onKeyPressEvent={moveToSearch}
        />
        <SearchInputBtn
          type="button"
          disabled={searchValue.length > 0 ? false : true}
          onClick={() => moveToSearch()}
        >
          <img
            src="/images/search_off.svg"
            alt="search"
            className={searchValue.length > 0 ? "" : "disable"}
          />
        </SearchInputBtn>
      </SearchWrap>
    </Wrap>
  );
}

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 64px);
  gap: 20px;
`;

const Title = styled.h1`
  font-size: 30px;
  font-weight: bold;
`;

const SearchWrap = styled.div`
  display: flex;
  position: relative;
  width: 90%;
`;

const SearchInputBtn = styled.button`
  position: absolute;
  top: -1px;
  right: 0;
  font-size: 14px;

  img {
    cursor: pointer;
    &.disable {
      cursor: default;
    }
  }
`;
