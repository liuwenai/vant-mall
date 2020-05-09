import area from "../view/address/area"

const fhyztMap = { '1': '欠费', '2': '正常缴费', '3': '分支机构代缴', '8': '退会', '9': '免费' }
const aresMap = area.county_list
export default {
  data () {
    return {
      fhyztMap,
      aresMap
    }
  },

  methods: {
    formattfhyzt: function (row, col, cellValue, index) {
      return fhyztMap[cellValue] || cellValue
    },
    formatares:function(){
      
    }
  
  }
}
