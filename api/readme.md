### 使用说明
- 放在网站根目录下，如www为网站根目录，则www/api/api.php为api.php位置
- images文件已删除，git文件过大

### api调用
- GET方式

### 获取省份列表
1. 参数   
- query = province
2. 样例   
- http://245786ka89.zicp.vip/api/api.php?query=province

### 获取（某省份）城市列表
1. 参数   
- query = city
- province = beijing
2. 样例   
- http://245786ka89.zicp.vip/api/api.php?query=city&province=beijing

### 获取（某省份，某城市）景点列表
1. 参数   
- query = scenic_spot
- province = beijing
- city = beijing
2. 样例   
- http://245786ka89.zicp.vip/api/api.php?query=scenic_spot&province=beijing&city=beijing