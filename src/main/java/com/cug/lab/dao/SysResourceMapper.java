package com.cug.lab.dao;

import com.cug.lab.model.SysResource;

import java.util.List;


public interface SysResourceMapper {

    public int createResource(SysResource resource);
    public SysResource updateResource(SysResource resource);
    public void deleteResource(Long resourceId);

    SysResource findOne(Long resourceId);
    List<SysResource> findChildsByParentId(Long resParentId);
    List<SysResource> findAll();
    public int getTotle();
}
