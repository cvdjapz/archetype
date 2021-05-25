package com.cug.lab.controller;


import com.cug.lab.model.SysResource;
import com.cug.lab.model.SysUser;
import com.cug.lab.service.ResourceService;
import com.cug.lab.service.RoleService;
import com.cug.lab.service.UserService;
import com.cug.lab.utils.EasyuiData;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;


@Controller
@RequestMapping("sys/res")
public class SysResController {


    @Resource
    private  UserService userService;

    @Resource
    private  RoleService roleService;

    @Resource
    private ResourceService resourceService;

    @RequiresPermissions("pageresource:view")
    @RequestMapping("/res.page")
    public String user(Model model){
        return "sys/res/res";
    }

    @ResponseBody
    @RequiresPermissions("pageresource:view")
    @RequestMapping("/selectAllRes.json")
    public EasyuiData<SysResource> selectAllUser(){
        EasyuiData<SysResource> easyuiData = new EasyuiData<SysResource>();
        easyuiData.setTotal(resourceService.getTotle());
        easyuiData.setRows(resourceService.findAll());
        System.out.println(easyuiData);
        return easyuiData;
    }

}
