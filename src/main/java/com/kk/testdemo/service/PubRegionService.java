package com.kk.testdemo.service;

import com.kk.testdemo.dto.PubRegionDTO;
import com.kk.testdemo.dto.TreeDTO;
import com.kk.testdemo.mapper.InfoLandMapper;
import com.kk.testdemo.mapper.InfoOwnerMapper;
import com.kk.testdemo.mapper.PubRegionMapper;
import com.kk.testdemo.model.InfoLand;
import com.kk.testdemo.model.InfoOwner;
import com.kk.testdemo.model.PubRegion;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;
import tk.mybatis.mapper.entity.Example;

import java.math.BigDecimal;
import java.util.*;

/**
 * Created with IntelliJ IDEA.
 * User: w541
 * Date: 2020/4/23
 * Time: 15:30
 */
@Service
public class PubRegionService {

    @Autowired
    private PubRegionMapper pubRegionMapper;
    @Autowired
    private InfoLandMapper infoLandMapper;
    @Autowired
    private InfoOwnerMapper infoOwnerMapper;




    public  List<TreeDTO> queryInfiniteClassification(){
        //查询所有
        List<PubRegionDTO> pubRegions = pubRegionMapper.queryTopLevel();
        //parentCode=1 顶级
        List<TreeDTO> tree = this.getTree(pubRegions, "1");
        return tree;
    }
    public List<TreeDTO> getTree(List<PubRegionDTO> pubRegions, String parentCode)  {
        List<TreeDTO> tree = new ArrayList<>();
        TreeDTO treeDTO=null;
        for (PubRegionDTO pubRegion : pubRegions) {
            if(parentCode.equals(pubRegion.getParentCode())){
                treeDTO=new TreeDTO();
                //行政区id
                treeDTO.setCityCode(pubRegion.getCityCode());
                //父id
                treeDTO.setParentCode(parentCode.equals("1") ? null : pubRegion.getParentCode());
                treeDTO.setName(pubRegion.getName());
                treeDTO.setId(pubRegion.getId());
                //权属人
                treeDTO.setArea(pubRegion.getArea());
                treeDTO.setState("closed");
                Example example=new Example(PubRegion.class);
                example.createCriteria().andEqualTo(PubRegion.Fields.parentCode,pubRegion.getCityCode());
                List<TreeDTO> transitionTreeGrid = new ArrayList<>();
                if(pubRegionMapper.selectCountByExample(example)>0){
                    transitionTreeGrid = getTree(pubRegions, pubRegion.getCityCode());
                }
                if (0 != transitionTreeGrid.size()) {
                    treeDTO.setIsLeaf(false);
                    treeDTO.setChildren(transitionTreeGrid);
                    BigDecimal area=new BigDecimal(0);
                    for (TreeDTO treeDTO1 : transitionTreeGrid) {
                        if(treeDTO1.getArea()!=null){
                            area=area.add(treeDTO1.getArea());
                        }
                    }
                    if(treeDTO.getArea()!=null){
                        treeDTO.setArea(area.add(treeDTO.getArea()));
                    }else{
                        treeDTO.setArea(area);
                    }
                    tree.add(treeDTO);
                //过滤最后一级无权属人和面积为空的
                }else if(pubRegion.getNameArr()!=null&&pubRegion.getArea()!=null){
                    treeDTO.setIsLeaf(false);
                    //子集下的权属人
                    List<TreeDTO> infoOwnerByCode = infoOwnerMapper.getInfoOwnerByCode(pubRegion.getCityCode());
                    treeDTO.setChildren(infoOwnerByCode);
                    tree.add(treeDTO);
                }
            }
        }
        return tree;
    }




//    public void getTreeCount(List<Map<String, Object>> tree,String pid) {
//        BigDecimal bigDecimal=new BigDecimal(0);
//        for (Map<String, Object> map : tree) {
//            List<Map<String, Object>> map1=(List<Map<String, Object>>) map.get("children");
//            if(map1.size()>0){
//                for (Map<String, Object> stringObjectMap : map1) {
//                    if(stringObjectMap.get("parentCode").equals(pid)) {
//                        getTreeCount((List<Map<String, Object>>) map.get("children"),stringObjectMap.get("parentCode").toString());
//                    }
//                }
//            }
//        }
//    }



    public List<PubRegion> getAllselect(String name){
        Example example=new Example(PubRegion.class);
        if(!StringUtils.isEmpty(name)){
            example.createCriteria().andLike(PubRegion.Fields.name,name);
        }
        List<PubRegion> pubRegions = pubRegionMapper.selectByExample(example);
        return pubRegions;
    }



    public Integer updatePubRegion(Integer id,String name){
        PubRegion pubRegion = pubRegionMapper.selectByPrimaryKey(id);
        pubRegion.setName(name);
        pubRegion.setMergerName(pubRegion.getMergerName().substring(0,pubRegion.getMergerName().lastIndexOf(","))+","+name);
        int i = pubRegionMapper.updateByPrimaryKeySelective(pubRegion);
        return i;
    }


    public Integer addPubRegion(String parentCode,String name){
        Example example=new Example(PubRegion.class);
        example.createCriteria().andEqualTo(PubRegion.Fields.cityCode,parentCode);
        List<PubRegion> pubRegions = pubRegionMapper.selectByExample(example);
        PubRegion pubRegion = pubRegions.get(0);
        PubRegion pubRegion1=new PubRegion();
        pubRegion1.setCityCode(getRandomNickname(10));
        pubRegion1.setParentCode(parentCode);
        pubRegion1.setName(name);
        pubRegion1.setMergerName(pubRegion.getMergerName()+","+name);
        pubRegion1.setLevelType(pubRegion.getLevelType()+1);
        int insert = pubRegionMapper.insert(pubRegion1);
        return insert;
    }

    @Transactional(rollbackFor = Exception.class)
    public Integer delPubRegion(Integer id){
        PubRegion pubRegion = pubRegionMapper.selectByPrimaryKey(id);
        int i = pubRegionMapper.deleteByPrimaryKey(id);
        Example example=new Example(InfoLand.class);
        example.createCriteria().andEqualTo(InfoLand.Fields.region,pubRegion.getCityCode());
        int i1 = infoLandMapper.deleteByExample(example);
        example=new Example(InfoOwner.class);
        example.createCriteria().andEqualTo(InfoOwner.Fields.region,pubRegion.getCityCode());
        int i2 = infoOwnerMapper.deleteByExample(example);
        return i;
    }


    /**
     * java生成随机数字和字母组合10位数
     * @param length [生成随机数的长度]
     * @return
     */
    public static String getRandomNickname(int length) {
        String val = "";
        Random random = new Random();
        for (int i = 0; i < length; i++) {
            // 输出字母还是数字
            String charOrNum = random.nextInt(2) % 2 == 0 ? "char" : "num";
            // 字符串
            if ("char".equalsIgnoreCase(charOrNum)) {
                // 取得大写字母还是小写字母
                int choice = random.nextInt(2) % 2 == 0 ? 65 : 97;
                val += (char) (choice + random.nextInt(26));
            } else if ("num".equalsIgnoreCase(charOrNum)) { // 数字
                val += String.valueOf(random.nextInt(10));
            }
        }
        return val;
    }

}

