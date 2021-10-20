package com.cs633.project.net.annotation;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Component;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/**
 * Name: Donghang He
 * Date: 2021/10/6 8:05 下午
 * Course: CS-
 * Assignment
 * Description:
 */
@Qualifier
@Target({
        ElementType.FIELD, ElementType.METHOD, ElementType.TYPE, ElementType.PARAMETER
})
@Retention(RetentionPolicy.RUNTIME)
public @interface Action {
}
