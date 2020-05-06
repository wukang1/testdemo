package com.kk.testdemo.service;

/**
 * Created with IntelliJ IDEA.
 * User: wk
 * Date: 2020/5/6
 * Time: 14:45
 */
public class ThreadTest {

    public static void main(String[] args) {
        MyThread myThread=new MyThread();

        Thread thread=new Thread(myThread,"窗口1");
        thread.start();
        Thread thread1=new Thread(myThread,"窗口2");
        thread1.start();
        Thread thread2=new Thread(myThread,"窗口3");
        thread2.start();
        Thread thread3=new Thread(myThread,"窗口4");
        thread3.start();
//        MyThread myThread=new MyThread("1");
//        myThread.start();
//        MyThread myThread1=new MyThread("2");
//        myThread1.start();
//        MyThread myThread3=new MyThread("3");
//        myThread3.start();
//        MyThread myThread4=new MyThread("4");
//        myThread4.start();



    }
}
