package com.cs633.project.message;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.cs633.project.IDataBus;
import com.cs633.project.constant.CommonConstant;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.web.context.ContextLoader;
import org.springframework.web.context.WebApplicationContext;

import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.Arrays;
import java.util.HashMap;

/**
 * Name: Donghang He
 * Date: 2021/10/4 1:04 下午
 * Course: CS-
 * Assignment
 * Description:
 */
@Service
public class ReadMessage {

    @Autowired
    private IDataBus dataBus;

    private final HashMap<String, String> classMap = new HashMap<>();

    public Object readMessage(ReceiveMessage message) throws Exception {
        initial();
        JSONObject object = JSON.parseObject(message.getMessage());
        Class c = Class.forName(CommonConstant.PACKAGE_NAME + classMap.get(object.getString("cmd")));
        Object o = c.getDeclaredConstructor().newInstance();
        Method method = c.getMethod(object.getString("cmd"), JSONObject.class);
        Object obj = method.invoke(o, JSON.parseObject(object.getString("message")));

//        WebApplicationContext wac = ContextLoader.getCurrentWebApplicationContext();
//        Class cls = wac.getBean(classMap.get(object.getString("cmd"))).getClass();
//        Method m = cls.getDeclaredMethod(object.getString("cmd"));
//        Object obj = m.invoke(wac.getBean(classMap.get(object.getString("cmd"))));
        return obj;
    }

    public void initial() throws ClassNotFoundException {
        for (String name : CommonConstant.className) {
            Class c = Class.forName(CommonConstant.PACKAGE_NAME + name);
            Method[] methods = c.getDeclaredMethods();
            for (Method method : methods) {
                classMap.put(method.getName(), name);
            }
        }
    }

}
