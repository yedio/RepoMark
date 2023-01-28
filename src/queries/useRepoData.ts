import { useQuery } from "react-query";
import instance from "../apis/ApiController";
import { Type_RepoData } from "../types/types";

export const QUERY_KEY = ["useRepoData"];

const fetcher = async (
  keyword: string,
  page: number
): Promise<Type_RepoData> => {
  const res = await instance
    .get(`search/repositories?q=${keyword}&per_page=${10}&page=${page}`)
    .then((res: any) => res);

  return res;
};

const useRepoData = (keyword: string, page: number) => {
  console.log("kkkk", keyword);
  return useQuery([QUERY_KEY, keyword, page], () => fetcher(keyword, page), {
    onError: (e) => {
      console.error("repository data Error", e);
    },
    enabled: keyword === undefined ? false : true,
  });
};

export default useRepoData;
