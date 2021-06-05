package com.cug.lab.utils;


import java.util.ArrayList;
import java.util.List;

public class EasyuiResPage {
    private Long id;
    private String text;
    private String state;
    private List<EasyuiResButton> children = new ArrayList<EasyuiResButton>();

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

    public List<EasyuiResButton> getChildren() {
        return children;
    }

    public void setChildren(List<EasyuiResButton> children) {
        this.children = children;
    }

    public EasyuiResPage(Long id, String text, String state) {
        this.id = id;
        this.text = text;
        this.state = state;
    }
    public EasyuiResPage() {
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
