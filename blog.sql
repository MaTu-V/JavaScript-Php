/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50725
Source Host           : localhost:3306
Source Database       : blog

Target Server Type    : MYSQL
Target Server Version : 50725
File Encoding         : 65001

Date: 2019-12-04 17:52:32
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for publishblog
-- ----------------------------
DROP TABLE IF EXISTS `publishblog`;
CREATE TABLE `publishblog` (
  `id` int(200) NOT NULL AUTO_INCREMENT,
  `title` varchar(200) NOT NULL,
  `content` varchar(200) NOT NULL,
  `created` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of publishblog
-- ----------------------------
INSERT INTO `publishblog` VALUES ('3', '越努力,越幸运!', '越努力,越幸运!', '2019-02-21 01:55:50');
INSERT INTO `publishblog` VALUES ('10', '肖申克的救赎', '该片中涵盖全片的主题是“希望”，全片透过监狱这一强制剥夺自由、高度强调纪律的特殊背景来展现作为个体的人对“时间流逝、环境改造”的恐惧......................', '2019-02-21 02:38:42');
INSERT INTO `publishblog` VALUES ('11', '精灵宝可梦：大侦探皮卡丘', '近日，由罗伯 莱特曼执导，瑞安 雷诺兹配音出演，贾斯提斯 史密斯、凯瑟琳 纽顿、克里斯 吉尔、苏琪 沃特豪斯、乔塞特 西蒙、瑞塔 奥拉、罗伯 德兰尼等主演，渡边谦、比尔 奈伊特别出演的电影《大侦探皮卡丘》发布最新的“奶凶出击”版电视广告，奶凶大侦探皮卡丘强势审问魔墙人偶，逗趣十足，更有超萌宝可梦新增镜头。影片将于5月10日北美上映。', '2019-02-21 02:39:51');
INSERT INTO `publishblog` VALUES ('12', '流浪地球 (2019)', '近未来，科学家们发现太阳急速衰老膨胀，短时间内包括地球在内的整个太阳系都将被太阳所吞没。为了自救，人类提出一个名为“流浪地球”的大胆计划，即倾全球之力在地球表面建造上万座发动机和转向发动机，推动地球离开太阳系，用2500年的时间奔往另外一个栖息之地。中国航天员刘培强（吴京 饰）在儿子刘启四岁那年前往国际空间站，和国际同侪肩负起领航者的重任。', '2019-02-21 02:40:56');

-- ----------------------------
-- Table structure for regblog
-- ----------------------------
DROP TABLE IF EXISTS `regblog`;
CREATE TABLE `regblog` (
  `id` int(20) NOT NULL AUTO_INCREMENT,
  `regUsername` varchar(200) NOT NULL,
  `regPassword` varchar(200) NOT NULL,
  `regQuestion` int(20) NOT NULL,
  `regAnswer` varchar(200) NOT NULL,
  `regEmail` varchar(200) NOT NULL,
  `regBirthday` varchar(200) NOT NULL,
  `regRemarks` varchar(200) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=38 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of regblog
-- ----------------------------
INSERT INTO `regblog` VALUES ('36', '123', '123qwe', '1', '123123', '1261816122@qq.com', '1950-1-1', 'none');
INSERT INTO `regblog` VALUES ('37', '999', '9999qwe', '1', '11111', '8794521@sina.com', '1950-1-1', 'www');

-- ----------------------------
-- Table structure for skin
-- ----------------------------
DROP TABLE IF EXISTS `skin`;
CREATE TABLE `skin` (
  `id` int(200) NOT NULL AUTO_INCREMENT,
  `small_bg` varchar(200) NOT NULL,
  `big_bg` varchar(200) NOT NULL,
  `bg_color` varchar(200) NOT NULL,
  `bg_title` varchar(200) NOT NULL,
  `bg_flag` varchar(200) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of skin
-- ----------------------------
INSERT INTO `skin` VALUES ('1', 'small_bg1.png', 'bg1.jpg', '#E7E9E8', '皮肤1', '0');
INSERT INTO `skin` VALUES ('2', 'small_bg2.png', 'bg2.jpg', '#ECF0FC', '皮肤2', '0');
INSERT INTO `skin` VALUES ('3', 'small_bg3.png', 'bg3.jpg', '#E2E2E2', '皮肤3', '0');
INSERT INTO `skin` VALUES ('4', 'small_bg4.png', 'bg4.jpg', '#FFFFFF', '皮肤4', '1');
INSERT INTO `skin` VALUES ('5', 'small_bg5.png', 'bg5.jpg', '#F3F3F3', '皮肤5', '0');
INSERT INTO `skin` VALUES ('6', 'small_bg6.png', 'bg6.jpg', '#EBDEBE', '皮肤6', '0');
