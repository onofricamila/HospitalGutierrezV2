<?php
	class Connection {
		private static $instance = NULL;

		private function __construct() {}

		private function __clone() {}

		public static function getInstance() {
			if (!isset(self::$instance)) {
				$db_host="localhost";
				$db_user="grupo46";
				$db_pass="MTU5ZGM1MjFhMmJk";
				$db_base="grupo46";
			
				self::$instance = new PDO("mysql:dbname=$db_base;host=$db_host",$db_user,$db_pass,array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES 'utf8'"));
			}
			return self::$instance;
		}
	}
