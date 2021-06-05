package com.cug.lab.utils;


import java.util.ArrayList;
import java.util.List;

public class EasyuiResButton {
    private Long id;
    private String text;


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



    public EasyuiResButton(Long id, String text) {
        this.id = id;
        this.text = text;

    }
    public EasyuiResButton() {
    }

    @Override
    public String toString() {
        return "EasyuiResTree{" +
                "id=" + id +
                ", text='" + text + '\'' +
                '}';
    }
}
