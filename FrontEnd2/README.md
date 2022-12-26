# vueproj

## 디렉토리 및 파일 구조
```
├── .vscode                         # VSCode 관련 환경 세팅 디렉토리
│   └── settings.json
├── node_modules                    # 'npm install'을 통해 설치되는 모듈 파일 디렉토리
│   └── ...
├── public                          # index.html 관련 파일 및 FBX파일이 들어가는 공간
│   └── ...
├── src                             # 각종 vue파일과 js파일들이 작성되는 공간
│   ├── api                         
│   │   └── ...                     # 기능에 따라 api들을 분류하여 함수로 저장
│   ├── components                  # 각종 component 공간
│   │   ├── CreateModal.vue         # 신규 유저 추가 컴포넌트
│   │   ├── Navbar.vue              # 사이드바 컴포넌트
│   │   ├── DashBoard.vue           # 모니터링 페이지 대쉬보드 컴포넌트 
│   │   ├── Item.vue                # 공정관리 컴포넌트
│   │   ├── Item2.vue               # 공정관리 컴포넌트
│   │   ├── MachineItem.vue         # Process Management 페이지 Process 컴포넌트 
│   │   ├── Profile.vue             # 프로필 수정 컴포넌트
│   │   └── Password.vue            # 비밀번호 변경 컴포넌트
│   ├── mixins                      # 벨리데이션 기능
│   │   └── ...                     # validation & Setformat
│   ├── router                      # 라우터 관련 디텍토리
│   │   └── index.js                # 라우터 파일
│   ├── store                       # Store 공간
│   │   ├── index.js                # Store에서 사용할 각종 모델들 디렉토리
│   │   ├── Auth.js                 # 로그인 및 회원 관련 Store
│   │   ├── ...                     # axios 처리 유틸 파일
│   │   └── User.js                 # 유저 정보 store
│   ├── views                       # 페이지 뷰(화면)파일 디렉토리
│   │   ├── LoginView.vue           # 로그인 화면 처리디렉토리
│   │   ├── ...                     # 각종 화면 처리 디렉토리
│   │   └── Home.vue                # 공정 list 화면 파일
│   ├── WebGL                       # Three.js 공간
│   │   └── ...                     # three.js 페이지별 class 파일 
│   ├── App.vue                     # 전체 화면 제어 파일
│   └── main.js                     # vuejs의 메인 실행 파일
├── .env                            # 환경설정 파일
├── .eslintrc.js                    # eslint 환경설정 파일
├── .gitignore                      # git의 ignore설정 파일
├── babel.config.js
├── dockerBuild.sh                  # docker build를 실행시키기 위한 파일
├── Dockerfile                      # docker 이미지를 만들기 위한 파일
├── dockerRun.sh                    # docker 컨테이너를 만들기 위한 파일
├── nginx-default.conf              # docker내의 nginx 설정 파일
├── package-lock.json
├── package.json                    # nodejs 패키지 파일(npm install관련)
├── README.md
└── vue.config.js                   # vue설정 파일(proxy 설정)
```



## 개발 환경
개발용 PC의 OS는 `windows 10`을 사용 한다.

개발용 디렉토리는 다음과 같다. (없으면 만들 것)
`C:\Workspace`

```console
> cd C:\Workspace
```
위 디렉토리로 이동 한다.


## VS Code의 setting.json 설정
`VS Code`의 `File > Preferences > Setting -> Workspace -> Text Editor > Code Actions On Save --> Edit in settings.json`

> /.vscode/settings.json
```json
{
    "eslint.validate": [
       "vue",
       "javascript",
       "html"
    ],
    "eslint.alwaysShowStatus": true,
    "editor.codeActionsOnSave": {
       "source.fixAll.eslint": true
    },
    "editor.tabSize": 2,
    "editor.defaultFormatter": "dbaeumer.vscode-eslint",
    "editor.formatOnSave": true,
 }
```

## Proxy 설정
백엔드의 CORS를 피하기 위해 `proxy`를 설정해서 사용 한다.
**참고:** https://velog.io/@skyepodium/vue-proxy-%EC%82%AC%EC%9A%A9%ED%95%98%EA%B8%B0

### .env 파일 생성
환경설정을 담당하는 `.env`파일을 생성 한다.
> /.env
```
NODE_ENV=production
VUE_APP_SERVER=http://localhost:3000
```
`vue`에서 `.env`파일의 환경설정을 읽기 위해서는 반드시 `VUE_APP_`라는 접두사를 사용해야 한다.
이는 `process.env.VUE_APP_`를 통해 추출할 수 있다.

**주의** `VUE_APP_SERVER`에는 백엔드 서버의 값을 설정해야 한다.

### vue.config.js 파일 생성
다음과 같이 `vue.config.js`파일을 생성 한다.
> /vue.config.js
```javascript
const { VUE_APP_SERVER } = process.env

module.exports = {
  devServer: {
    proxy: {
      '/serverApi': {
        target: VUE_APP_SERVER,
        changeOrigin: true,
        pathRewrite: {
          '^/serverApi': ''
        }
      }
    }
  }
}
```
`/serverApi`라는 URL이 입력되면 `pathRewrite`에 의해 `''`로 변경된다.
예) 입력 정보: `/serverApi/users` ⇒ 프록시 처리: `<VUE_APP_SERVER>/users`  ⇒ 최종 호출: `http://localhost:3000/users`

**주의!!** `vue.config.js`파일의 프록시 처리는 ***개발PC에서만*** 동작한다. 
실제 도커를 통한 `nginx`에서는 `/etc/nginx/conf.d/default.conf`파일에서  프록시 처리를 해 주어야 한다.




#### .env 설정시 주의 사항
`process.env.VUE_APP_MQTT`를 사용할때 `npm run build`를 해버리면 현재 설정된 값이 **하드코딩** 되어 버린다.
도커컨테이너에서 아무리 환경변수를 바꾸어 주어도 바뀌지 않는다.
이를 해결하기 위해서는 `.env`에 설정하지 말아야 한다.

백엔드인 `nodejs`는 `.env`의 설정값을 도커컨테이너 실행 시 변경이 가능하지만 (서버의 환경변수 적용 가능)
프론트엔드인 `vuejs`는 `.env`의 설정값을 도커컨테이너에서 변경이 불가능 하다. (서버의 환경변수 적용 불가)




