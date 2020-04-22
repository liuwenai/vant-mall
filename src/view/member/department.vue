<template id="a">
  <div>
    <van-nav-bar title="分支机构" left-arrow @click-left="$router.go(-1)" />
    <div>
      <van-search placeholder="请输入搜索关键词" :clearable="true" v-model="filterText" />
      <van-tree-select
        ref="helpTree"
        height="102.3vw"
        :items="frjmc"
        :active-id.sync="activeIds"
        :main-active-index.sync="activeIndex"
        @click-item="onClick"
      ></van-tree-select>
    </div>
  </div>
</template>


<script>
import Vue from "vue";
import { TreeSelect, NavBar, Search, Button } from "vant";
export default {
  components: {
    [TreeSelect.name]: TreeSelect,
    [Search.name]: Search,
    [Button.name]: Button,
    [NavBar.name]: NavBar
  },
  data() {
    return {
      frjmc: [
        {
          text: "职能部门",
          id: 1,
          children: [
            {
              text: "总会直属",
              id: 10
            },
            {
              text: "秘书处",
              id: 11
            },
            {
              text: "学术部",
              id: 12
            },
            {
              text: "培训部",
              id: 13
            },
            {
              text: "继续教育部",
              id: 14
            },
            {
              text: "国际合作部",
              id: 15
            },
            {
              text: "健康促进部",
              id: 16
            },
            {
              text: "科技奖励部",
              id: 17
            },
            {
              text: "事业扩展部",
              id: 18
            },
            {
              text: "项目推广部",
              id: 19
            },
            {
              text: "诚信监管部",
              id: 110
            },
            {
              text: "会员部",
              id: 111
            },
            {
              text: "财务部",
              id: 112
            }
          ]
        },
        {
          text: "教育委员会",
          id: 2,

          children: [
            {
              text: "高等学院校(系)委员会",
              id: 20
            },
            {
              text: "职业技术教育委员会",
              id: 21
            },
            {
              text: "成人教育委员会",
              id: 22
            },
            {
              text: "医学模拟教育专业委员会",
              id: 23
            },
            {
              text: "基层医药教育专业委员会",
              id: 24
            },
            {
              text: "专家委员会",
              id: 25
            },
            {
              text: "整合医学教育委员会",
              id: 26
            }
          ]
        },
        {
          text: "专业委员会",
          id: 3,

          children: [
            {
              text: "寒区医学专业委员会",
              id: 30
            },
            {
              text: "高警示药品专业委员会",
              id: 31
            },
            {
              text: "临床合理用药专业委员会",
              id: 32
            },
            {
              text: "临床用药评价专业委员会",
              id: 33
            },
            {
              text: "感染疾病专业委员会",
              id: 34
            },
            {
              text: "骨科专业委员会",
              id: 35
            },
            {
              text: "乳腺疾病专业委员会",
              id: 36
            },
            {
              text: "转化医学专业委员会",
              id: 37
            },
            {
              text: "血管医学专业委员会",
              id: 38
            },
            {
              text: "眩晕专业委员会",
              id: 39
            },
            {
              text: "儿科专业委员会",
              id: 310
            },
            {
              text: "皮肤病专业委员会",
              id: 311
            },
            {
              text: "远程医疗专业委员会",
              id: 312
            },
            {
              text: "眼科专业委员会",
              id: 313
            },
            {
              text: "肺部肿瘤专业委员会",
              id: 314
            },
            {
              text: "腹部肿瘤专业委员会",
              id: 315
            },
            {
              text: "妇科专业委员会",
              id: 316
            },
            {
              text: "护理专业委员会",
              id: 317
            },
            {
              text: "呼吸康复专业委员会",
              id: 318
            },
            {
              text: "头颈肿瘤专业委员会",
              id: 319
            },
            {
              text: "烧伤专业委员会",
              id: 320
            },
            {
              text: "神经外科专业委员会",
              id: 321
            },
            {
              text: "肝胆胰外科专业委员会",
              id: 322
            },
            {
              text: "医疗器械管理专业委员会",
              id: 323
            },
            {
              text: "肩肘运动医学专业委员会",
              id: 324
            },
            {
              text: "泌尿与血液净化专业委员会",
              id: 325
            },
            {
              text: "盆腔肿瘤专业委员会",
              id: 326
            },
            {
              text: "超声医学专业委员会",
              id: 327
            },
            {
              text: "骨质疾病专业委员会",
              id: 328
            },
            {
              text: "血液学专业委员会",
              id: 329
            },
            {
              text: "代谢疾病专业委员会",
              id: 330
            },
            {
              text: "泌尿外科专业委员会",
              id: 331
            },
            {
              text: "生殖内分泌专业委员会",
              id: 332
            },
            {
              text: "消化道疾病专业委员会",
              id: 333
            },
            {
              text: "食品卫生安全教育专业委员会",
              id: 334
            },
            {
              text: "胸外科专业委员会",
              id: 335
            },
            {
              text: "加速康复外科专业委员会",
              id: 336
            },
            {
              text: "医药统计专业委员会",
              id: 337
            },
            {
              text: "医药数字化教育专业委员会",
              id: 338
            },
            {
              text: "介入微创治疗专业委员会",
              id: 339
            },
            {
              text: "营养医学专业委员会",
              id: 340
            },
            {
              text: "老年医学与健康促进专业委员会",
              id: 341
            },
            {
              text: "健康管理专业委员会",
              id: 342
            },
            {
              text: "智能医学专业委员会",
              id: 343
            },
            {
              text: "微生态与健康教育专业委员会",
              id: 344
            },
            {
              text: "肛肠疾病专业委员会",
              id: 345
            },
            {
              text: "心脏外科专业委员会",
              id: 346
            },
            {
              text: "神经内科专业委员会",
              id: 347
            },
            {
              text: "肿瘤免疫专业委员会",
              id: 348
            },
            {
              text: "胸痛专业委员会",
              id: 349
            },
            {
              text: "检验医学专业委员会",
              id: 350
            },
            {
              text: "医用生物材料与技术专业委员会",
              id: 351
            },
            {
              text: "造血干细胞移植及细胞治疗专业委员会",
              id: 352
            },
            {
              text: "母婴健康管理专业委员会",
              id: 353
            },
            {
              text: "口腔医学委员会",
              id: 354
            },
            {
              text: "骨与软组织肿瘤专业委员会",
              id: 355
            },
            {
              text: "血管外科专业委员会",
              id: 356
            },
            {
              text: "血管内科专业委员会",
              id: 357
            },
            {
              text: "中药制剂专业委员会",
              id: 358
            },
            {
              text: "新中药发展促进专业委员会",
              id: 359
            },
            {
              text: "急症医学专业委员会",
              id: 360
            },
            {
              text: "疑难肿瘤专业委员会",
              id: 361
            },
            {
              text: "生育健康专业委员会",
              id: 362
            },
            {
              text: "炎症性肠病专业委员会",
              id: 363
            },
            {
              text: "肿瘤化学治疗专业委员会",
              id: 364
            },
            {
              text: "慢性气道疾病专业委员会",
              id: 365
            },
            {
              text: "糖尿病专业委员会",
              id: 366
            },
            {
              text: "新生儿专业委员会",
              id: 36
            },
            {
              text: "肝病专业委员会",
              id: 36
            },
            {
              text: "神经内镜与微创医学专业委员会",
              id: 36
            },
            {
              text: "麻醉专业委员会",
              id: 36
            },
            {
              text: "心电学专业委员会",
              id: 36
            }
          ]
        },
        {
          text: "工作委员会",
          id: 4,

          children: [
            {
              text: "药店管理工作委员会",
              id: 40
            },
            {
              text: "移动医疗工作委员会",
              id: 41
            },
            {
              text: "医疗装备发展促进工作委员会",
              id: 42
            },
            {
              text: "健康教育工作委员会",
              id: 43
            },
            {
              text: "自我保健与医疗指导工作委员会",
              id: 44
            },
            {
              text: "中医药与大健康工作委员会",
              id: 45
            },
            {
              text: "医药产业创新发展促进工作委员会",
              id: 46
            },
            {
              text: "特色医疗工作委员会",
              id: 47
            },
            {
              text: "中医药教育促进工作委员会",
              id: 48
            },
            {
              text: "医联体工作委员会",
              id: 49
            },
            {
              text: "生命养护工作委员会",
              id: 410
            }
          ]
        },
        {
          text: "培训及科研机构",
          id: 5,

          children: [
            {
              text: "北京军地医学人才培训中心",
              id: 50
            },
            {
              text: "合肥现代药学远程教育中心",
              id: 51
            },
            {
              text: "上海慢病教育基地",
              id: 52
            },
            {
              text: "黄岛国风药业联合培训基地",
              id: 53
            },
            {
              text: "武安全国基层医护人员规范化培训基地",
              id: 54
            },
            {
              text: "蚌埠中华医道研究会",
              id: 55
            },
            {
              text: "北京卫健基业生物技术研究所",
              id: 56
            },
            {
              text: "深圳孙思邈医德研究会",
              id: 57
            },
            {
              text: "深圳哲理科学与中医药现代研究会",
              id: 58
            },
            {
              text: "医药教育研究中心",
              id: 59
            },
            {
              text: "网络技术管理中心",
              id: 510
            },
            {
              text: "临床研究培训中心",
              id: 511
            }
          ]
        },
        {
          text: "慢病防治工作站",
          id: 6,

          children: [
            {
              text: "慢病工作总站",
              id: 60
            },
            {
              text: "西安工作站",
              id: 61
            },
            {
              text: "青岛工作站",
              id: 62
            },
            {
              text: "青岛国风工作站",
              id: 63
            },
            {
              text: "淄博工作站",
              id: 64
            },
            {
              text: "南宁工作站",
              id: 65
            },
            {
              text: "芜湖工作站",
              id: 66
            },
            {
              text: "武汉工作站",
              id: 67
            },
            {
              text: "锦州工作站",
              id: 68
            },
            {
              text: "上海工作站",
              id: 69
            },
            {
              text: "天津工作站",
              id: 610
            },
            {
              text: "重庆工作1站",
              id: 611
            },
            {
              text: "重庆工作2站",
              id: 612
            },
            {
              text: "大连工作站",
              id: 613
            },
            {
              text: "深圳工作站",
              id: 614
            },
            {
              text: "南京工作站",
              id: 615
            },
            {
              text: "蚌埠工作站",
              id: 616
            },
            {
              text: "上海得道工作站",
              id: 617
            },
            {
              text: "东莞工作站",
              id: 618
            },
            {
              text: "赣州工作站",
              id: 619
            },
            {
              text: "浙江工作站",
              id: 620
            },
            {
              text: "遵义工作站",
              id: 621
            },
            {
              text: "武安工作站",
              id: 622
            },
            {
              text: "西安颐养工作站",
              id: 623
            },
            {
              text: "山东工作站",
              id: 624
            },
            {
              text: "河北工作站",
              id: 625
            }
          ]
        },
        {
          text: "其他机构",
          id: 7,

          children: [
            {
              text: "患者教育中心",
              id: 71
            }
          ]
        }
      ],
      activeIds: [1, 2],
      activeIndex: 0,
      filterText: "",
      selectCell: [] //选中的数据
    };
  },
  mounted() {},
  computed: {},
  watch: {
    filterText(val) {
      this.$refs.helpTree.filter(val);
    }
  },
  methods: {
    onClick(data) {
      this.$eventBus.$emit('bdepartment', data);
      this.$router.go(-1);
    }
  }
};
</script>
