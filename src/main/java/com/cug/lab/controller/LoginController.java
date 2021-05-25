package com.cug.lab.controller;


import com.cug.lab.Constants;
import com.cug.lab.model.SysResource;
import com.cug.lab.model.SysRole;
import com.cug.lab.model.SysUser;
import com.cug.lab.service.ResourceService;
import com.cug.lab.service.RoleService;
import com.cug.lab.service.UserService;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.*;
import org.apache.shiro.authz.annotation.RequiresRoles;
import org.apache.shiro.subject.Subject;
import org.springframework.stereotype.Controller;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.ui.Model;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Map;
import java.util.Set;


@Controller
public class LoginController {


    @Resource
    private  UserService userService;

    @Resource
    private  RoleService roleService;

    @Resource
    private ResourceService resourceService;

    @RequestMapping("/login.page")
    public String Login(HttpServletRequest servletRequest, Model model){
        String exceptionClassName = (String)servletRequest.getAttribute("shiroLoginFailure");
        String error = null;
        if(UnknownAccountException.class.getName().equals(exceptionClassName)) {
            error = "用户名错误!";
        } else if(IncorrectCredentialsException.class.getName().equals(exceptionClassName)) {
            error = "密码错误!";
        }  else if(LockedAccountException.class.getName().equals(exceptionClassName)) {
            error = "锁定的帐号!";
        }  else if(ExpiredCredentialsException.class.getName().equals(exceptionClassName)) {
            error = "锁定的帐号!";
        } else if(exceptionClassName != null) {
            error = "其他错误：" + exceptionClassName;
        }
        model.addAttribute("error", error);
        return "login";
    }

    @RequestMapping("/homepage.page")
    public String homepage(HttpServletRequest servletRequest, Model model)
    {
        SysUser user = (SysUser) servletRequest.getAttribute(Constants.CURRENT_USER);
        Set<String> set = userService.findRoles(user.getUserName());
        List<SysRole> roleList = roleService.findListByName(set);
        Set<String> permissions = userService.findPermissions(user.getUserName());
        Map<String , List<SysResource>>  menus = resourceService.findMenus(permissions);
        model.addAttribute("roles", roleList);
        model.addAttribute("menus", menus);
        return "homepage";
    }

    @RequestMapping("/welcome.page")
    public String welcome(){
        return "welcome";
    }

    @RequestMapping("/unauthorized.page")
    public String unauthorized(){
        return "unauthorized";
    }


    @RequestMapping("/register.page")
    public String register(){
        return "register";
    }

}
