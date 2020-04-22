## h5 缴费页面

## 表单验证 参考

https://gist.github.com/aiyuchen/dfcf18300eef79b9465f0719a813a7f7


### 参考 
https://github.com/qianzhaoy/vant--mobile-mall


## 说明

### 接口

api/member.js

### 需要授权的页面控制

在 router.js 中 对应的路由 meta 中 配置 

    meta: {
      login:true // 增加这个
    }

    
## 服务器部署测试

npm install -g serve

npm run build

## 注意 dist 目录是项目编译后的目录 ，有的时候是 docs

serve -d dist

## pm2
pm2 start -- serve -d docs/

## 部署到 nginx 上

npm run build

## 拷贝到

mv -rf ../docs /var/www/html


## 发布到 nginx 上

yarn build

把 build 后的文件 传到服务器的

/var/www/html


参考 https://github.com/linlinjava/litemall