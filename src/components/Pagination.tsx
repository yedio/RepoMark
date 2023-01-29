import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { PER_PAGE } from "../config";

interface Props {
  currentIdx: number;
  setCurrentIdx: React.Dispatch<React.SetStateAction<number>>;
  totalDataCnt: number;
}

export default function Pagination({
  currentIdx,
  setCurrentIdx,
  totalDataCnt,
}: Props) {
  const [paginationList, setPaginationList] = useState<number[]>([]);
  const finalIdx = totalDataCnt === 0 ? 1 : Math.ceil(totalDataCnt / PER_PAGE);

  useEffect(() => {
    let pgArr: Array<number> = [];

    if (finalIdx <= 5) {
      for (let i = 1; i <= finalIdx; i++) {
        pgArr.push(i);
      }
    } else {
      if (currentIdx < 4) {
        for (let i = 1; i <= 5; i++) {
          pgArr.push(i);
        }
      } else if (currentIdx >= 4 && currentIdx < finalIdx - 2) {
        for (let i = currentIdx - 2; i <= currentIdx + 2; i++) {
          pgArr.push(i);
        }
      } else if (currentIdx >= finalIdx - 2) {
        for (let i = finalIdx - 4; i <= finalIdx; i++) {
          pgArr.push(i);
        }
      }
    }
    setPaginationList(pgArr);
  }, [totalDataCnt, currentIdx]);

  const goToPrevPg = () => {
    if (currentIdx > 1) {
      setCurrentIdx(currentIdx - 1);
    } else if (currentIdx <= 1) {
      setCurrentIdx(1);
    }
  };

  const goToNextPg = () => {
    if (currentIdx < finalIdx) {
      setCurrentIdx(currentIdx + 1);
    } else if (currentIdx >= finalIdx) {
      setCurrentIdx(finalIdx);
    }
  };

  return (
    <Wrapper>
      <FirstBtn>
        <button
          className={currentIdx !== 1 ? "active" : ""}
          disabled={currentIdx === 1 ? true : false}
          onClick={() => setCurrentIdx(1)}
        />
      </FirstBtn>
      <PrevBtn>
        <button
          className={currentIdx !== 1 ? "active" : ""}
          disabled={currentIdx === 1 ? true : false}
          onClick={() => goToPrevPg()}
        />
      </PrevBtn>
      {paginationList.map((idx) => (
        <NumberBtn key={idx}>
          <button
            className={idx === currentIdx ? "active" : ""}
            disabled={idx === currentIdx ? true : false}
            onClick={() => setCurrentIdx(idx)}
          >
            {idx}
          </button>
        </NumberBtn>
      ))}
      <NextBtn>
        <button
          className={currentIdx !== finalIdx ? "active" : ""}
          disabled={totalDataCnt === finalIdx ? true : false}
          onClick={() => goToNextPg()}
        />
      </NextBtn>
      <LastBtn>
        <button
          className={currentIdx !== finalIdx ? "active" : ""}
          disabled={currentIdx === finalIdx ? true : false}
          onClick={() => setCurrentIdx(Math.ceil(totalDataCnt / PER_PAGE))}
        />
      </LastBtn>
    </Wrapper>
  );
}

const Wrapper = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 40px 0 20px;

  li {
    margin-right: 20px;

    &:last-child {
      margin-right: 0;
    }
  }

  button {
    display: block;
    width: 20px;
    height: 20px;
    color: #a8a8a8;
    font-size: 16px;
    line-height: 1;
  }
`;

const FirstBtn = styled.li`
  button {
    content: "";
    background: url(${"/images/arrow/first.svg"}) no-repeat 50% 50%;
    cursor: default;

    &:hover {
      &.active {
        content: "";
        background: url(${"/images/arrow/first_on.svg"}) no-repeat 50% 50%;
        cursor: pointer;
      }
    }
  }
`;

const PrevBtn = styled.li`
  button {
    content: "";
    background: url(${"/images/arrow/prev.svg"}) no-repeat 50% 50%;
    cursor: default;

    &:hover {
      &.active {
        content: "";
        background: url(${"/images/arrow/prev_on.svg"}) no-repeat 50% 50%;
        cursor: pointer;
      }
    }
  }
`;

const NumberBtn = styled.li`
  button {
    &:hover {
      color: ${({ theme }) => theme.main};
      font-weight: 500;
      text-decoration: underline;
      cursor: pointer;
    }

    &.active {
      color: ${({ theme }) => theme.main};
      font-weight: 500;
      text-decoration: underline;
      cursor: default;
    }
  }
`;

const NextBtn = styled.li`
  button {
    background: url(${"/images/arrow/next.svg"}) no-repeat 50% 50%;
    cursor: default;

    &:hover {
      &.active {
        background: url(${"/images/arrow/next_on.svg"}) no-repeat 50% 50%;
        cursor: pointer;
      }
    }
  }
`;

const LastBtn = styled.li`
  button {
    content: "";
    background: url(${"/images/arrow/last.svg"}) no-repeat 50% 50%;
    cursor: default;

    &:hover {
      &.active {
        content: "";
        background: url(${"/images/arrow/last_on.svg"}) no-repeat 50% 50%;
        cursor: pointer;
      }
    }
  }
`;
