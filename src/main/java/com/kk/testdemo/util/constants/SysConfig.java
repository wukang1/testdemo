package com.kk.testdemo.util.constants;


import com.kk.testdemo.util.ConfigBean;

/***
 * 系统默认常量配置/需在t_config重新配置 通过read方法读取
 *
 * @author QiYuXiang
 */
public abstract class SysConfig {
    /**
     * 应用类型: 当家平台
     **/
    public static final Integer APP_TYPE = 0;

    /**
     * API路径
     */
    public static final ConfigBean<String> DANGJIA_API_LOCAL = new ConfigBean<>("DANGJIA_API_LOCAL",
            "http://192.168.1.95/", "API路径", APP_TYPE);

    /**
     * 静态页面访问路径（APP）
     */
    public static final ConfigBean<String> PUBLIC_APP_ADDRESS = new ConfigBean<>("PUBLIC_DANGJIA_APP_ADDRESS",
            "http://192.168.1.95:7001/#/", "静态页面访问路径（APP）", APP_TYPE);
    /**
     * 静态页面访问路径（SALE_APP）
     */
    public static final ConfigBean<String> PUBLIC_SALE_APP_ADDRESS = new ConfigBean<>("PUBLIC_SALE_APP_ADDRESS",
            "http://192.168.1.95:7001/#/", "静态页面访问路径（SALE_APP）", APP_TYPE);
    /**
     * 静态页面访问路径（WEB）
     */
    public static final ConfigBean<String> PUBLIC_WEB_ADDRESS = new ConfigBean<>("PUBLIC_DANGJIA_WEB_ADDRESS",
            "http://192.168.1.95:7002/#/", "静态页面访问路径（WEB）", APP_TYPE);
    /**
     * 图片路径
     */
    public static final ConfigBean<String> DANGJIA_IMAGE_LOCAL = new ConfigBean<>("DANGJIA_IMAGE_LOCAL",
            "http://192.168.1.95/", "图片路径", APP_TYPE);

    /**
     * 公共静态文件访问地址
     **/
    public static final ConfigBean<String> PUBLIC_DANGJIA_ADDRESS = new ConfigBean<>("PUBLIC_DANGJIA_ADDRESS",
            "http://192.168.1.95/", "公共静态文件路径", APP_TYPE);

    /**
     * 当家平台保存路径  /usr/wwwroot/dangjia/
     **/
    public static final ConfigBean<String> PUBLIC_DANGJIA_PATH = new ConfigBean<>("PUBLIC_DANGJIA_PATH",
            "D:/dangjia/", "当家平台保存路径", APP_TYPE);

    /**
     * 保存文件暂时路径
     **/
    public static final ConfigBean<String> PUBLIC_TEMPORARY_FILE_ADDRESS = new ConfigBean<>("PUBLIC_TEMPORARY_FILE_ADDRESS",
            "temporary/", "保存文件暂时路径", APP_TYPE);


    /**
     * 二维码保存目录
     **/
    public static final ConfigBean<String> PUBLIC_QRCODE_PATH = new ConfigBean<>("PUBLIC_QRCODE_PATH",
            "qrcode/", "二维码保存目录", APP_TYPE);

    public static final ConfigBean<String> INSURANCE_MONEY = new ConfigBean<String>("INSURANCE_MONEY",
            "100", "工人购买保险金额", APP_TYPE);


}
