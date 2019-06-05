### Instructions
- Put it in the website root directory. If WWW is the website root directory, then www/api/api.php is the api.php location.
- Image files have been deleted to avoid '.git' files being too large
### API call
- GET method
### Get a list of provinces
1. Parameters
- query = Province
2. Samples
- http://245786ka89.zicp.vip/api/api.php?Query=province
### Get a list of cities
1. Parameters
- query = City
- province = Beijing
2. Samples
- http://245786ka89.zicp.vip/api/api.php?Query=city&province=Hebei
### Get a list of attractions (a province, a city)
1. Parameters
- query = scenic_spot
- province = Beijing
- city = Beijing
2. Samples
- http://245786ka89.zicp.vip/api/api.php?Query=scenic_spot&province=Hebei&city=Zhangjiakou