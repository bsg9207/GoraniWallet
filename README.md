# GoraniWallet

## Layout

[ Logo ]&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[ Network selector ] [ Block number ] [ Theme switch ]

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[ Connect Wallet Btn ]

[ Menu ]

[ Contents ]

## Page

### Asset

#### 1. Wallet info

연결된 지갑의 주소와 coin 보유량 표시

#### 2. Token

연결된 지갑이 보유한 token 정보

### KSP

#### 1. Wallet info

연결된 지갑의 주소와 coin 보유량 표시

#### 2. KSP

연결된 지갑의 KSP staking 정보

#### 3. Pool voting

연결된 지갑의 pool voting

## Turbo Repo

### Workspace

```json
{
  ...
  "workspaces": [
    "back/*",
    "common",
    "front/*"
  ],
  ...
}
```

### Install npm modules

turbo repo를 사용중이기 때문에 각 workspace에 npm module을 설치하게 될 경우 아래의 명령어를 사용해야 한다.

```shell
> cd <ROOT_DIR>
> npm install <package> --workspace=<worksapce>
```

## Script

- npm run start
  - app 을 실행
- npm run dev
  - app 을 develop mode로 실행
- npm run build
  - app build
