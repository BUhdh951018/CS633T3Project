package com.cs633.project.message;

/**
 * Name: Donghang He
 * Date: 2021/9/29 8:10 下午
 * Course: CS-
 * Assignment
 * Description:
 */
public class SendMessage {

    private Object content;

    public SendMessage() {

    }

    public SendMessage(Object content) {
        this.content = content;
    }

    public Object getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }
}
