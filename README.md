# GoraniWallet

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

* npm run start
  * app 을 실행
* npm run dev
  * app 을 develop mode로 실행
* npm run build
  * app build
