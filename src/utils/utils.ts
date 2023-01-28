export const getParamsValue = (key: string) => {
  const resultValue = new URL(window.location.href).searchParams.get(`${key}`);
  return resultValue ? resultValue : "";
};

export const addComma = (value: number | string) => {
  const inputResult = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return inputResult;
};

const addZeroDate = (date: number) => {
  if (date < 10) {
    return `0${date}`;
  } else {
    return date;
  }
};

export const formatDate = (data: string) => {
  const convertDate = new Date(data);

  const y = convertDate.getFullYear();
  const m = convertDate.getMonth() + 1;
  const d = convertDate.getDate();
  const hh = convertDate.getHours();
  const mm = convertDate.getMinutes();
  const ss = convertDate.getSeconds();

  const date = `${addZeroDate(y)}-${addZeroDate(m)}-${addZeroDate(d)}`;
  const time = `${addZeroDate(hh)}:${addZeroDate(mm)}`;

  return date + " " + time;
};
