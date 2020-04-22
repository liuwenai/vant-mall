
const fhyztMap = { '1': '欠费', '2': '正常缴费', '3': '分支机构代缴', '8': '退会', '9': '免费' }

export default {
  data () {
    return {
      fhyztMap,
    }
  },

  methods: {
    formattfhyzt: function (row, col, cellValue, index) {
      return fhyztMap[cellValue] || cellValue
    },
  
  }
}
