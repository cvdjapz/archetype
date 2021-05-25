package com.cug.lab.controller;


import com.cug.lab.model.SysUser;
import com.cug.lab.service.ResourceService;
import com.cug.lab.service.RoleService;
import com.cug.lab.service.UserService;
import com.cug.lab.utils.EasyuiData;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.apache.shiro.authz.annotation.RequiresRoles;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import java.util.List;


@Controller
@RequestMapping("sys/user")
public class SysUserController {


    @Resource
    private  UserService userService;

    @Resource
    private  RoleService roleService;

    @Resource
    private ResourceService resourceService;

    @RequiresPermissions("pageuser:view")
    @RequestMapping("/user.page")
    public String user(Model model){
        return "sys/user/user";
    }

    @ResponseBody
    @RequiresPermissions("pageuser:view")
    @RequestMapping("/selectAllUser.json")
    public EasyuiData<SysUser> selectAllUser(){
        EasyuiData<SysUser> easyuiData = new EasyuiData<SysUser>();
        easyuiData.setTotal(userService.getTotle());
        easyuiData.setRows(userService.findAll());
        System.out.println(easyuiData);
        return easyuiData;
    }

}
