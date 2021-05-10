/*
Navicat MySQL Data Transfer

Source Server         : new
Source Server Version : 50717
Source Host           : localhost:3306
Source Database       : pro-archetype

Target Server Type    : MYSQL
Target Server Version : 50717
File Encoding         : 65001

Date: 2019-01-13 15:52:34
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for sys_organization
-- ----------------------------
DROP TABLE IF EXISTS `sys_organization`;
CREATE TABLE `sys_organization` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  `parent_id` bigint(20) DEFAULT NULL,
  `parent_ids` varchar(100) DEFAULT NULL,
  `available` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `idx_sys_organization_parent_id` (`parent_id`),
  KEY `idx_sys_organization_parent_ids` (`parent_ids`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of sys_organization
-- ----------------------------
INSERT INTO `sys_organization` VALUES ('1', '总公司', '0', '0/', '1');
INSERT INTO `sys_organization` VALUES ('2', '分公司1', '1', '0/1/', '1');
INSERT INTO `sys_organization` VALUES ('3', '分公司2', '1', '0/1/', '1');
INSERT INTO `sys_organization` VALUES ('4', '分公司11', '2', '0/1/2/', '1');

-- ----------------------------
-- Table structure for sys_resource
-- ----------------------------
DROP TABLE IF EXISTS `sys_resource`;
CREATE TABLE `sys_resource` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  `type` varchar(50) DEFAULT NULL,
  `url` varchar(200) DEFAULT NULL,
  `parent_id` bigint(20) DEFAULT NULL,
  `parent_ids` varchar(100) DEFAULT NULL,
  `permission` varchar(100) DEFAULT NULL,
  `available` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `idx_sys_resource_parent_id` (`parent_id`),
  KEY `idx_sys_resource_parent_ids` (`parent_ids`)
) ENGINE=InnoDB AUTO_INCREMENT=1034 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of sys_resource
-- ----------------------------
INSERT INTO `sys_resource` VALUES ('1', '资源', 'menu', '', '0', '0/', '', '1');
INSERT INTO `sys_resource` VALUES ('10', '用户角色权限模块', 'menu', '', '1', '0/1/', 'menuuser:view', '1');
INSERT INTO `sys_resource` VALUES ('11', '业务数据统计模块', 'menu', '', '1', '0/1/', 'menudata:view', '1');
INSERT INTO `sys_resource` VALUES ('100', '组织机构管理', 'page', 'organization.page', '10', '0/1/10/', 'pageorganization:*', '1');
INSERT INTO `sys_resource` VALUES ('101', '角色管理', 'page', 'role.page', '10', '0/1/10/', 'pagerole:*', '1');
INSERT INTO `sys_resource` VALUES ('102', '资源管理', 'page', 'resource.page', '10', '0/1/10/', 'pageresource:*', '1');
INSERT INTO `sys_resource` VALUES ('103', '用户管理', 'page', 'user.page', '10', '0/1/10/', 'pageuser:*', '1');
INSERT INTO `sys_resource` VALUES ('1000', '组织机构新增', 'button', '', '100', '0/1/10/100/', 'pageorganization:create', '1');
INSERT INTO `sys_resource` VALUES ('1001', '组织机构修改', 'button', '', '100', '0/1/10/100/', 'pageorganization:update', '1');
INSERT INTO `sys_resource` VALUES ('1002', '组织机构删除', 'button', '', '100', '0/1/10/100/', 'pageorganization:delete', '1');
INSERT INTO `sys_resource` VALUES ('1003', '组织机构查看', 'button', '', '100', '0/1/10/100/', 'pageorganization:view', '1');
INSERT INTO `sys_resource` VALUES ('1010', '角色新增', 'button', '', '101', '0/1/10/101/', 'pagerole:create', '1');
INSERT INTO `sys_resource` VALUES ('1011', '角色修改', 'button', '', '101', '0/1/10/101/', 'pagerole:update', '1');
INSERT INTO `sys_resource` VALUES ('1012', '角色删除', 'button', '', '101', '0/1/10/101/', 'pagerole:delete', '1');
INSERT INTO `sys_resource` VALUES ('1013', '角色查看', 'button', '', '101', '0/1/10/101/', 'pagerole:view', '1');
INSERT INTO `sys_resource` VALUES ('1020', '资源新增', 'button', '', '102', '0/1/10/102/', 'pageresource:create', '1');
INSERT INTO `sys_resource` VALUES ('1021', '资源修改', 'button', '', '102', '0/1/10/102/', 'pageresource:update', '1');
INSERT INTO `sys_resource` VALUES ('1022', '资源删除', 'button', '', '102', '0/1/10/102/', 'pageresource:delete', '1');
INSERT INTO `sys_resource` VALUES ('1023', '资源查看', 'button', '', '102', '0/1/10/102/', 'pageresource:view', '1');
INSERT INTO `sys_resource` VALUES ('1030', '用户新增', 'button', '', '103', '0/1/10/103/', 'pageuser:create', '1');
INSERT INTO `sys_resource` VALUES ('1031', '用户修改', 'button', '', '103', '0/1/10/103/', 'pageuser:update', '1');
INSERT INTO `sys_resource` VALUES ('1032', '用户删除', 'button', '', '103', '0/1/10/103/', 'pageuser:delete', '1');
INSERT INTO `sys_resource` VALUES ('1033', '用户查看', 'button', '', '103', '0/1/10/103/', 'pageuser:view', '1');

-- ----------------------------
-- Table structure for sys_role
-- ----------------------------
DROP TABLE IF EXISTS `sys_role`;
CREATE TABLE `sys_role` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `role` varchar(100) DEFAULT NULL,
  `description` varchar(100) DEFAULT NULL,
  `resource_ids` varchar(100) DEFAULT NULL,
  `available` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `idx_sys_role_resource_ids` (`resource_ids`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of sys_role
-- ----------------------------
INSERT INTO `sys_role` VALUES ('1', 'admin', '超级管理员', '10,11,100,101,102,103', '1');
INSERT INTO `sys_role` VALUES ('2', 'user', '用户', '10,101', '1');

-- ----------------------------
-- Table structure for sys_user
-- ----------------------------
DROP TABLE IF EXISTS `sys_user`;
CREATE TABLE `sys_user` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `organization_id` bigint(20) DEFAULT NULL,
  `username` varchar(100) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  `salt` varchar(100) DEFAULT NULL,
  `role_ids` varchar(100) DEFAULT NULL,
  `locked` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `idx_sys_user_username` (`username`),
  KEY `idx_sys_user_organization_id` (`organization_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of sys_user
-- ----------------------------
INSERT INTO `sys_user` VALUES ('1', '1', 'admin', 'd3c59d25033dbf980d29554025c23a75', '8d78869f470951332959580424d4bf4f', '1,2', '0');
INSERT INTO `sys_user` VALUES ('2', '3', '2222', '30a8a37961cc75c37106278389017db1', 'cb50e1a8df835c3f5991ef88a0da68d5', '2,', '0');
