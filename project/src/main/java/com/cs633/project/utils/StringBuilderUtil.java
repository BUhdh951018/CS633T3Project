package com.cs633.project.utils;

import org.apache.commons.beanutils.ConvertUtils;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

/**
 * Name: Donghang He
 * Date: 2021/10/23 6:04 下午
 * Course: CS-
 * Assignment
 * Description:
 */
public class StringBuilderUtil {

    public static String addElement(Long id, String old) {
        List<Long> list = stringToList(old);
        list.add(id);
        return listToString(list);
    }

    public static String deleteElement(Long id, String old) {
        if (!old.isBlank()) {
            List<Long> list = stringToList(old);
            list.remove(id);
            return listToString(list);
        }
        return old;
    }

    public static ArrayList<Long> stringToList(String str) {
        if (str == null || str.isBlank()) {
            return new ArrayList<>();
        }

        return new ArrayList<>(Arrays.asList((Long[]) ConvertUtils.convert(str.split(";"), Long.class)));
    }

    public static String listToString(List<Long> list) {
        StringBuilder stringBuilder = new StringBuilder();

        for (Long id: list) {
            stringBuilder.append(id).append(";");
        }
        if (stringBuilder.length() > 0) {
            stringBuilder.deleteCharAt(stringBuilder.length() - 1);
        }
        return stringBuilder.toString();
    }
}
