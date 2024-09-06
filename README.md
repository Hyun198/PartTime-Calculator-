<!--
Hey, thanks for using the awesome-readme-template template.
If you have any enhancements, then fork this project and create a pull request
or just open an issue with the label "enhancement".

Don't forget to give this project a star for additional support ;)
Maybe you can mention me or this repo in the acknowledgements too
-->
<div align="center">

  <img src="/relative/cgvapp.png" alt="logo" width="200" height="auto" />
  <h1>Part time Calculator</h1>

<h4>
    <a href="https://cgvparttime.netlify.app/">View Demo</a>
  </h4>
</div>

<br />

<!-- Table of Contents -->

# :notebook_with_decorative_cover: Table of Contents

- [About the Project](#star2-about-the-project)
  - [Structure](#sparkles-structure)
  - [Screenshots](#camera-screenshots)
  - [Tech Stack](#space_invader-tech-stack)
  - [Environment Variables](#key-environment-variables)
- [Getting Started](#toolbox-getting-started)
  - [Prerequisites](#bangbang-prerequisites)
  - [Run Locally](#running-run-locally)
  - [Deployment](#triangular_flag_on_post-deployment)
- [Usage](#eyes-usage)

- [Acknowledgements](#gem-acknowledgements)

<!-- About the Project -->

## :star2: About the Project

  <p>영화관 시간이 유동적으로 변함에 따라 출근시간도 계속 변동되어 알바생들의 혼란을 없애고자 계산기 기능을 제작, 시간을 확인하는 잠깐의 시간동안 얻을 수 있는 정보가 무엇이 있을까 생각해본 결과, 현재 개봉작들과 버스를 이용하는 인원이 많아 버스 도착정보를 알 수 있는 기능 추가</p>

  <p>알바생들의 출근시간 계산을 자동화시켜 지각률을 낮추고, 매니저들의 스케줄 작성에 도움을 주기 위해 개발하게 됐습니다.</p>

## :sparkles: structure

  <img src="./relative/system.png" style="text-align:center">

<!-- Screenshots -->

### :camera: Screenshots

<div align="center"> 
  <img src="./relative/cgvapp.png" alt="screenshot" />

</div>

<!-- TechStack -->

### :space_invader: Tech Stack

  <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="html" />
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=JavaScript&logoColor=white" alt="javascript" />
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="css" />
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="react" />
<!-- Env Variables -->

### :key: Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`REACT_APP_KOBIS_API_KEY`

`REACT_APP_KOREA_FILM_KEY`

`REACT_APP_BUS_API_KEY`

<!-- Getting Started -->

## :toolbox: Getting Started

<!-- Prerequisites -->

### :bangbang: Prerequisites

Install repository

```bash
 npm install
```

<!-- Run Locally -->

### :running: Run Locally

Clone the project

```bash
  git clone https://github.com/Hyun198/PartTime-Calculator-.git
```

Go to the project directory

```bash
  cd my-project
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm start
```

<!-- Acknowledgments -->

## :gem: Acknowledgements

- [Kmdb](https://www.kmdb.or.kr/info/api/apiList)
- [kofic](https://www.kobis.or.kr/kobisopenapi/homepg/main/main.do)
