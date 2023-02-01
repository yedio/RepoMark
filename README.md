# Repo Mark

관심있는 repository를 북마크에 등록하고, 등록한 repository의 issue들을 모아볼 수 있는 서비스입니다.

## Preview

### main page
![main](https://user-images.githubusercontent.com/82350743/215775939-ffd6c661-ebda-4648-b83f-cc4af7cb3c6d.png)

### repository page
![repository](https://user-images.githubusercontent.com/82350743/215776505-fb01d701-4873-4176-b8ed-cd5ea6713cb4.png)

### issues page
![issues](https://user-images.githubusercontent.com/82350743/215776605-ef557764-9bb0-4e0c-9daa-0743fb0a9c66.png)

### responsive web
![repomark_반응형](https://user-images.githubusercontent.com/82350743/215781541-b46518d1-3d8a-44bb-af4a-038eae780baf.gif)


## 프로젝트 설정 및 실행 방법

```sh
# Clone this repository
$ git clone https://github.com/yedio/RepoMark.git

# Go into the repository
$ cd RepoMark

# Install dependencies
$ npm install

# Run the app
$ npm start
```

## 프로젝트 사용 방법

1. 검색창에 Repository를 입력합니다.
2. 북마크에 등록하고 싶은 Repository의 +버튼을 늘러 등록합니다
3. 북마크는 최대 4개까지 등록할 수 있으며, repository의 -버튼을 누르거나 북마크에서 삭제할 수 있습니다.
   (제목을 누르면 해당 repository 페이지로 넘어갑니다)
4. 등록된 repository의 issue들은 issue페이지에서 확인할 수 있습니다. (제목을 누르면 해당 issue 페이지로 넘어갑니다)

## 기술스택

`react.js` `javascript` `typescript` `styled-components`
