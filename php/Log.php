<?php
    date_default_timezone_set('Asia/Jerusalem');
    class Log{
        private const dir = "./php/log/";
        private const error_file = "error.log";  

        function __construct(){
            if(!file_exists(self::dir)){
                if (!mkdir(self::dir, 0777, true)) {
                    die('Failed to create LOG folders...');
                }
            }
        }
        public function writeErrorLog($error_msg){
            error_log(date("Y-m-d H:i")."\n$error_msg\n", 3,self::dir.self::error_file);
        }
    }
?>