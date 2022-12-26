# Back-End

<br>

# 전체 구조

```
.
├── .vscode
│   └── settings.json               # /.vscode/settings.json: VScode사용에 따른 환경 설정 파일
├── config
│   └── .env                        # (개발용)환경설정 파일(직접 생성)
│   └── config.json                 # DB setting
│   └── corsConfig.json             # cors 설정 파일
│   └── whitelist.json              # cors whitelist
├── controllers                     # Controller 폴더
│   ├── admin.js
│   ├── auth.js
│   ├── history.js
│   ├── machine.js
│   ├── middlewares.js              # 미들웨어 함수 모음
│   ├── monitoring.js
│   ├── mypage.js
│   └── process.js
├── lib                             # 자체 제작한 라이브러리 모음 폴더
│   └── responseStatus.js           # response 함수 모음
├── migrations                      # Migration 폴더
│   └── ...
├── models                          # DB를 모델링하는 sequelize의 모델 함수용 폴더
│   ├── element.js
│   ├── index.js                    # sequelize를 이용한 DB설정 파일
│   ├── machine.js
│   ├── part_default.js
│   ├── part.js
│   ├── software_history.js
│   ├── test_result.js
│   └── user.js
├── node_modules                    # npm install후 생성되는 라이브러리 모음 폴더
│   └── ...
├── routes                          # Router 폴더
│   ├── admin.js
│   ├── auth.js
│   ├── history.js
│   ├── index.js
│   ├── machine.js
│   ├── monitoring.js
│   ├── mypage.js
│   └── process.js
├── stylesheets                     # css
│   └── style.css
├── views                           # express에서 생성한 프론트용 화면(사용하지 않음)
│   ├── error.ejs
│   └── index.ejs
├── .gitignore                      # gitignore 설정 파일
├── app.js                          # 앱 실행 메인 파일
├── package-lock.json
├── package.json
└── README.md
```

<br>

# 주요 기능

1. 회원가입 및 로그인 기능을 위한 데이터 모델링 / API 설계 및 개발
2. 실시간 데이터 모니터링 관련 데이터 모델링 / API 설계 및 개발
3. PLC 작업 내역 및 담당자 관리를 위한 데이터 모델링 / API 설계 및 개발
   <br>
   <br>

# API 명세서

1. 로그인

- 로그인(admin, user 모두)
  <br>
  <br>

2. 공정 관리

- 공정 전체 정보 조회
  <br>
  <br>

3. 공정 모니터링

- 공정 모니터링 정보 조회
  <br>
  <br>

4. 설비 관리

- 설비 관리 조회
  <br>
  <br>

5. 생산 이력

- 생산 이력 조회
  <br>
  <br>

6. 관리자

- 사용자 리스트 조회 (admin만 가능)
- 사용자 등록 (admin만 가능)
- 사용자 삭제 (admin만 가능)
  <br>
  <br>

7. 마이페이지

- 회원 정보 수정(이름,이메일,전화번호)
- 회원 정보 수정(비밀번호)
