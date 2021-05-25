package com.cug.lab.controller;


import com.cug.lab.model.SysRole;
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
import java.util.List;


@Controller
@RequestMapping("sys/role")
public class SysRoleController {


    @Resource
    private  UserService userService;

    @Resource
    private  RoleService roleService;

    @Resource
    private ResourceService resourceService;

    @RequiresPermissions("pagerole:view")
    @RequestMapping("/role.page")
    public String user(Model model){
        return "sys/role/role";
    }

    @ResponseBody
    @RequiresPermissions("pageuser:view")
    @RequestMapping("/selectAllRole.json")
    public EasyuiData<SysRole> selectAllRole(){
        EasyuiData<SysRole> easyuiData = new EasyuiData<SysRole>();
        easyuiData.setTotal(roleService.getTotle());
        easyuiData.setRows(roleService.findAll());
        return easyuiData;
    }

}
