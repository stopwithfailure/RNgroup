<?php
// $URL="http://192.168.1.104/api/";//image
// $URL="http://245786ka89.zicp.vip/api/";//image
$URL="http://10.12.33.161/api/";//image
//open the data file
header("Content-Type: text/html; charset=utf-8");
if (isset($_GET["query"])) {
    $myfile = fopen("data.txt", "r") or die("Unable to open file! 1");
    $data = fread($myfile, filesize("data.txt"));
    fclose($myfile);
    $data = str_replace("\r\n", "", $data);



    if ($_GET["query"] == "province") {//province request
        $province_ori = explode('$', $data);
        $province = array();
        $province_num = count($province_ori);
        for ($x = 0; $x < $province_num - 1; $x++) {
            $temp = explode('%', $province_ori[$x + 1]);
            $province[$x] = ['province' => $temp[0]];
        }
        echo json_encode($province);






    } else if ($_GET["query"] == "city") {//city request
        if (isset($_GET["province"])) {
            $province_ori = explode('$', $data);
            $province = array();
            $province_num = count($province_ori);
            for ($x = 0; $x < $province_num - 1; $x++) {
                $temp = explode('%', $province_ori[$x + 1]);
                if($temp[0] == $_GET["province"]){//find the province
                    
                    
                    $cities_ori = explode('^', $province_ori[$x + 1]);//the same as province
                    $city = array();
                    $cities_num = count($cities_ori);
                    for ($i = 0; $i < $cities_num - 1; $i++) {
                        $temp_city = explode('^', $cities_ori[$i + 1]);
                        $city[$i] = ['city' => $temp_city[0]];
                    }
                    echo json_encode($city);

                    break;//here is done
                }
            }
        } else {
            echo "you set query,but not set city";
        }






    } else if ($_GET["query"] == "scenic_spot") {//scenic spot request
        if (isset($_GET["city"])&&isset($_GET["province"])) {
            if (isset($_GET["province"])) {
            $province_ori = explode('$', $data);
            $province = array();
            $province_num = count($province_ori);
            for ($x = 0; $x < $province_num - 1; $x++) {
                $temp = explode('%', $province_ori[$x + 1]);
                if($temp[0] == $_GET["province"]){//find the province


                    $cities_ori = $temp;//the same as city
                    $city = array();
                    $cities_num = count($cities_ori);
                    for ($i = 0; $i < $cities_num - 1; $i++) {
                        $temp_city = explode('^', $cities_ori[$i + 1]);//find the city
                        if($temp_city[0] == $_GET["city"]){//find the province


                            // var_dump($temp_city);
                            $spot_ori = $temp_city;//the same as province
                            $spot = array();
                            $spot_num = count($spot_ori);
                            for ($i = 0; $i < $spot_num - 1; $i++) {
                                $temp_spot = explode('&', $spot_ori[$i + 1]);
                                $city[$i] = ['spot_name'   => $temp_spot[0],
                                             'img_uri'     => $URL.
                                             $temp_spot[1],
                                             'introduction'=> $temp_spot[2]];
                            }
                            echo stripslashes(json_encode($city));
                            break;//here is done
                        }
                    }
                    break;//here is done
                    }
                }
            }
        } else {
            echo "you set query,but not set city and province(err of scenic spot)";
        }
    }
        
    
} else {
    echo "not set get 'query'";
}