package com.cug.lab.utils;


import java.util.ArrayList;
import java.util.List;

public class EasyuiResMenu {
    private Long id;
    private String text;

    private String state;
    private List<EasyuiResPage> children = new ArrayList<EasyuiResPage>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public List<EasyuiResPage> getChildren() {
        return children;
    }

    public void setChildren(List<EasyuiResPage> children) {
        this.children = children;
    }

    public EasyuiResMenu(Long id, String text, String state) {
        this.id = id;
        this.text = text;
        this.state = state;
    }
    public EasyuiResMenu() {
    }

    @Override
    public String toString() {
        return "EasyuiResTree{" +
                "id=" + id +
                ", text='" + text + '\'' +
                ", state='" + state + '\'' +
                ", children=" + children +
                '}';
    }
}
