package com.kk.testdemo.util.enums;

public enum IApplyTypeEnum implements IBaseEnum {

    /**
     * 0每日完工申请，1阶段完工申请，2整体完工申请,3停工申请，4：每日开工,5有效巡查,6无人巡查,7追加巡查,101阶段完工,102整体完工
     */
    DAY_APPLICATION(0, "每日完工申请"),
    STAGE_COMPLETION_APPLICATION(1, "阶段完工申请"),
    OVERALL_COMPLETION_APPLICATION(2, "整体完工申请"),
    WORK_STOPPAGE_APPLICATION(3, "停工申请"),
    START_DAILY(4, "每日开工"),
    EFFECTIVE_INSPECTION(5, "有效巡查"),
    UNMANNED_INSPECTION(6, "无人巡查"),
    ADDITIONAL_INSPECTION(7, "追加巡查"),
    STAGE_COMPLETION(101, "阶段完工审核"),
    OVER_COMPLETION(102, "整体完工审核"),
    NO_PASS(666, "打回请重做"),
    ;

    private int code;
    private String desc;

    IApplyTypeEnum(int code, String desc) {
        this.code = code;
        this.desc = desc;
    }

    public static String getValue(Integer code) {
        for (IApplyTypeEnum ele : values()) {
            if (ele.getCode() == code) return ele.getDesc();
        }
        return null;
    }

    @Override
    public int getCode() {
        return code;
    }

    @Override
    public String getDesc() {
        return desc;
    }

}
