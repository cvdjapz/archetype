package com.cug.lab.controller;


import com.cug.lab.model.SysResource;
import com.cug.lab.model.SysRole;
import com.cug.lab.model.SysUser;
import com.cug.lab.service.ResourceService;
import com.cug.lab.service.RoleService;
import com.cug.lab.service.UserService;
import com.cug.lab.utils.*;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.Date;
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


    @ResponseBody
    //@RequiresPermissions("pageuser:view")
    @RequestMapping("/insertRole.json")
    public MsgToPage<SysRole> insertRole(SysRole sysRole) {
        MsgToPage<SysRole> msgToPage = new MsgToPage<SysRole>();
        sysRole.setRoleAvailable(true);
        if(roleService.createRole(sysRole) > 0){
            msgToPage.setCode(RespondCode.SUCCESS);
            msgToPage.setMsg("添加角色成功！");
        }else{
            msgToPage.setCode(RespondCode.FAIL);
            msgToPage.setMsg("添加失败！");
        }
        return msgToPage;
    }


    @ResponseBody
    //@RequiresPermissions("pageuser:view")
    @RequestMapping("/deleteOneRole.json")
    public MsgToPage<SysRole> deleteOneRole(SysRole sysRole) {
        MsgToPage<SysRole> msgToPage = new MsgToPage<SysRole>();
        if(roleService.deleteRole(sysRole.getRoleId()) > 0){
            msgToPage.setCode(RespondCode.SUCCESS);
            msgToPage.setMsg("删除角色成功！");
        }else{
            msgToPage.setCode(RespondCode.FAIL);
            msgToPage.setMsg("删除失败！");
        }
        return msgToPage;
    }

    @ResponseBody
    //@RequiresPermissions("pageuser:view")
    @RequestMapping("/deleteListRole.json")
    public MsgToPage<SysRole> deleteListUser(String[] ids) {
        MsgToPage<SysRole> msgToPage = new MsgToPage<SysRole>();
        int count = roleService.deleteListUser(ids);
        if(count > 0) {
            msgToPage.setCode(200);
            msgToPage.setMsg("删除"+count+"条用户成功！");
        }else {
            msgToPage.setCode(404);
            msgToPage.setMsg("删除用户失败！");
        }
        return msgToPage;
    }

    @ResponseBody
    //@RequiresPermissions("pageuser:view")
    @RequestMapping("/updateRole.json")
    public MsgToPage<SysRole> updateRole(SysRole sysRole) {
        MsgToPage<SysRole> msgToPage = new MsgToPage<SysRole>();
        sysRole.setRoleAvailable(true);
        int count = roleService.updateRole(sysRole);
        if(count == 1) {
            msgToPage.setCode(RespondCode.SUCCESS);
            msgToPage.setMsg("编辑"+sysRole.getRoleDescription()+"用户成功！");
        }else {
            msgToPage.setCode(RespondCode.FAIL);
            msgToPage.setMsg("编辑"+sysRole.getRoleDescription()+"用户失败！");
        }
        return msgToPage;
    }

    /*
      构建资源树
         1.获取模块（menu）页面采用数据结构--EasyuiResMenu
         2.获取页面（page）添加到模块中  页面采用数据结构--EasyuiResPage
         3.获取按钮（button）添加到页面中 按钮采用数据结构--EasyuiResButton
    */
    //todo
    //循环中有些可以直接跳出
    @ResponseBody
    @RequiresPermissions("pageuser:view")
    @RequestMapping("/roleResourceIdsTreeData.json")
    public List<EasyuiResMenu> roleResourceIdsTreeData(){
        //构建总模块链表
        List<EasyuiResMenu> easyuiResMenuList = new ArrayList<EasyuiResMenu>();
        //获取所有资源
        List<SysResource> resourceList = resourceService.findAll();
        //遍历资源 把模块分别加入list，暂时未加入children
        for (SysResource resource : resourceList) {
            if((resource.getResType().equals(SysResource.ResourceType.menu)) && !(resource.isRootNode())){
                EasyuiResMenu easyuiResMenu =
                        new EasyuiResMenu(resource.getResId(),
                                resource.getResName()+" - "+resource.getResId(),
                                "closed");
                easyuiResMenuList.add(easyuiResMenu);
            }
        }
        //遍历资源 把页面分别加入模块的children，
        for (SysResource resource : resourceList) {
            //拿到页面
            if(resource.getResType().equals(SysResource.ResourceType.page)){
                //构建页面对象
                EasyuiResPage easyuiResPage =
                        new EasyuiResPage(resource.getResId(),
                                resource.getResName()+" - "+resource.getResId(),
                                "closed");
                //遍历easyuiResTreeList
                for(EasyuiResMenu easyuiResMenu : easyuiResMenuList){
                    if(resource.getResParentId() == easyuiResMenu.getId()){
                        easyuiResMenu.getChildren().add(easyuiResPage);
                    }
                }
            }
        }
        //遍历资源 得到所有按钮 ，如果其父id与easyuiResTreeList中的id一致，则加入其children中
        for (SysResource resource : resourceList) {
            //拿到按钮元素
            if(resource.getResType().equals(SysResource.ResourceType.button)){
                //先找到是属于哪一个模块
                for(EasyuiResMenu easyuiResMenu : easyuiResMenuList){
                    if(resource.getResId()/100 == easyuiResMenu.getId()){
                        //然后找到是属于哪一个页面
                        for(EasyuiResPage easyuiResPage : easyuiResMenu.getChildren()){
                            if(resource.getResParentId() == easyuiResPage.getId()){
                                EasyuiResButton easyuiResButton =
                                        new EasyuiResButton(resource.getResId(),
                                                resource.getResName()+" - "+resource.getResId());
                                easyuiResPage.getChildren().add(easyuiResButton);
                            }
                        }
                    }
                }
            }
        }
        /*当存在children为空的时候，前端显示会出现异常---需要将非叶节点的statis设置为open或者空*/
        //考虑换乘递归
        //todo
        for(EasyuiResMenu easyuiResMenu : easyuiResMenuList){
            if(easyuiResMenu.getChildren().size() < 1){
                easyuiResMenu.setState("open");
            }else{
                for(EasyuiResPage easyuiResPage : easyuiResMenu.getChildren()){
                    if(easyuiResPage.getChildren().size() < 1){
                        easyuiResPage.setState("open");
                    }
                }
            }
        }
        return easyuiResMenuList;
    }
}
