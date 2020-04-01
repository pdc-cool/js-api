/**
 * 前端读取 excel 文件
 */

 // 1.使用 js-xlsx 读取文件内容（npm install js-xlsx -S）
 // const XLSX = require('xlsx')

 // 2.使用 H5 api 来读取操作
 // let reader = new FileReader
 // reader.readAsBinaryString(file)
 // reader.onload = function(evt) {
    //  let data = evet.target.results
//  }

// 3.使用 js-xlsx 读取文件内容
// let workbook = XLSX.read(data, {
    // type: 'binary'
// })

// 核心代码
reader.onload = function(evt) {
    try {
        let data = evt.target.result,
            workbook = XLSX.read(data, {
                type: 'binary'
            }),
            buildings = [] // 存储获取到的数据
        let formTo = ''
        // 遍历没张表格
        for(const sheet in workbook.Sheets) {
            if (workbook.Sheets.hasOwnProperty(sheet)) {
                formTo = workbook.Sheets[sheet]['!ref']
                buildings = buildings.concat(XLSX.utils.sheet_to_json(workbook.Sheets[sheet]))
                // break //如果只取第一张 sheet 表，就取消注释这行
            }
        }
        let fileRows = buildings.length - 1

    } catch(e) {
        console.log('文件内容不正确', e)
        return
    }
}