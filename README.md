# spa demo
_一个简单的前后端分离单页blog应用，后端接口使用laravel5.4，前端使用webpack vuejs实现单页应用，后台使用iview2UI组件库_

> 技术栈 laravel5.4 + webpack2 + Vuejs2 + vue-router + vue-resource + iview2

## 安装composer包
``` bash
composer install
```

## 运行迁移文件
``` bash
    php artisan migrate
```

## 如果需要测试数据可以运行seeder文件，会生成后台账号[admin admin]和测试数据
```bash
    php artisan db:seed --class=AdminsSeeder
    php artisan db:seed --class=PostsSeeder
```

## 进入views-src目录安装前端资源
*修改src/config/config.js 配置文件，设置api_domain cdn*

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```
## 安装完成
* /index.html 首页地址
* /login.html 后台登录地址
* /admin.html 后台首页地址
