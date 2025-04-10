<div align="center">

  <img src="/relative/cgvapp.png" alt="logo" width="200" height="auto" />
  <h1>Part time Calculator</h1>

<h4>
    <a href="https://cgvparttime.netlify.app/">View Demo</a>
    
  </h4>
</div>

<br />

<!-- About the Project -->

## :star2: About the Project

  <h2>프로젝트 목표</h2>
  <strong>알바생들의 출근시간 계산을 자동화시켜 지각률을 낮추고, 직원들의 스케줄 작성에 도움을 주기 위해 개발</strong>

  <p>출근 시간 계산기는 CGV 공식 홈페이지에서 <strong>금일 마지막 영화 시간</strong>을 입력받아, 알바생의 출근 시간을 자동으로 계산해주는 도구입니다. 간단한 시간 계산이지만, 특히 신입 아르바이트생에게 유용하며, 마지막 영화 시간이 갑작스럽게 변경되는 상황에서 편리하게 사용될 수 있습니다.</p>

예시
금일 마지막 영화 시간: 22:10  
 출근시간: 22:10 - 8:00 or - 7:30

### 사용 예시

    마지막 영화 시간을 기준으로 출근 시간을 계산합니다. 예시:

    | 금일 마지막 영화 시간 | 출근 시간                  |
    |----------------------|----------------------------|
    | 22:10               | 22:10 - 8:00 = **14:10**   |
    | 22:10               | 22:10 - 7:30 = **14:40**   |

    2025년 3월 기준으로 근무시간 변경 예정

이 프로그램은 생각보다 어려운 출근 시간 계산을 자동화해 아르바이트생들이 더욱 정확한 출근 계획을 세울 수 있도록 도와줍니다.

  <ul>
    <li>마감 시간 입력시 출근시간 확인 가능</li>
    <li>일일 박스오피스 확인 (포스터 클릭시 naver 영화 정보 페이지로 이동)</li>  
    <li>출근에 도움이 될 수 있는 실시간 버스 도착 정보 조회 기능 추가 (24.10.03)Open StreetMap API를 이용해서 맵에 정류장 좌표를 표시</li>
    <li>버스 검색 기능에서 최근 검색한 내역 표시 기능 추가 (25.01.15)</li>
    <li>경기도 버스 노선 조회 api 포멧 변경에 따른 업데이트 (xml-> json)</li>
    <li>메인 페이지에 사용법 설명 추가(사용자 요청)</li>
    <li>마감시간 +40분에서 +30분으로 변경 (25.03.11)</li>
  </ul>

## :sparkles: structure

  <img src="./relative/system.png" style="text-align:center">

<!-- Screenshots -->

### :camera: Screenshots

<div align="center"> 
  <img src="./relative/cgvapp.png" alt="screenshot" />
  <img src="./relative/사용설명 추가.png" alt="screenshot2" />
</div>

<!-- TechStack -->

### :space_invader: Tech Stack

  <div style="display:flex">
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="html" />
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=JavaScript&logoColor=white" alt="javascript" />
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="css" />
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="react" />
  </div>
<!-- Env Variables -->

### :key: Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`REACT_APP_KOBIS_API_KEY`

`REACT_APP_KOREA_FILM_KEY`

`REACT_APP_BUS_API_KEY`

<!-- Acknowledgments -->

## :gem: Acknowledgements

- [Kmdb](https://www.kmdb.or.kr/info/api/apiList)
- [kofic](https://www.kobis.or.kr/kobisopenapi/homepg/main/main.do)
- [openstreetmap](https://wiki.openstreetmap.org/)

### 풀스택 버전

  <h2><a href="https://github.com/Hyun198/parttime_fullstack">출근시간 계산기 풀스택 버전</a></h2>
