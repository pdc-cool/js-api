// 熟悉各种数据格式: DOMstring  ArrayBuffer  Blob File...
 
// 1.Blob 对象: 表示一段二进制数据
// 生成 Blob 对象两种方法：使用 Blob 构造函数或者对现有 Blob 对象 slice() 切出一部分

// Blob(blobParts[, options]) 
let htmlParts = ['<a id=\"a\"><b id=\"b\">hey!<\/b><\/a>']
let myBlob = new Blob(htmlParts, {
  type: 'text/xml'
})

// 利用 Blob 对象生成一个下载文件的例子
let blob = new Blob(['Hello world'])

let a = document.createElement('a')
a.href = window.URL.createObjectURL(blob)
a.download = 'hello-world.txt'
a.textContent = 'Download Hello World!'

body.appendChild(a)
a.click()

// 利用 slice 方法将二进制数据按照字节分块 返回一个新的 Blob 对象
let newBlob = oldBlob.slice(startingByte, endindByte)

// 使用 XMLHttpRequest 对象将大文件分割上传
function upload(blobOrFile) {
  let xhr = new XMLHttpRequest
  xhr.open('POST', '/serve', true)
  xhr.onload = function(e) {
    // ...
  }
  xhr.send(blobOrFile)
}

document.querySelector('input[type="file"]').addEventListener('change', function(e) {
  let blob = this.files[0]

  const BYTES_PER_CHUNK = 1024 * 1024 // 1MB chunk size
  const SIZE = blob.size

  let start = 0
  let end = BYTES_PER_CHUNK

  while(start < SIZE) {
    upload(blob.slice(start, end))

    start = end
    end = start + BYTES_PER_CHUNK
  }
}, false)

// FileList 对象
// FileList 对象针对表单 file 控件，当用户通过 file 控件选取文件后，这个控件的 files 属性值就是 FileList 对象

// 也可通过拖放得到 FileList 对象
let dropZone = document.getElementById('drop_zone')
dropZone.addEventListener('drop', handleFileSelect, false)

function handleFileSelect(evt) {
  evt.stopPropagation()
  evt.preventDefalut()

  let files = evt.dataTransfer.files // FileList object
}

// File 对象是 FileList 对象成员，包含文件的一些元信息：文件名、上次改动时间、文件大小、文件类型

// FileReader API
// FileReader API 用于读取文件，即把文件内容读入内存，参数是 File 或者 Blob 对象
// 对于不同的类型的文件，FileReader 提供不同的方法读取文件

// readAsBinaryString(Blob | File): 返回二进制字符串该字符串每个字节包含一个0-266之间的整数
// readAsText(Blob | File, opt_encoding): 返回文本字符串，默认情况下，文本编码格式是 UTF-8，可以手动制定格式
// readAsDataURL(Blob | File)：返回一个基于 Base64 编码的 data-url 对象
// readAsArrayBuffer(Blob | File)：返回一个 ArrayBuffer 对象

// 文本文件
let reader = new FileReader()
reader.onload = function(e) {
  let text = reader.result
}

reader.readAsText(file, encoding)

// Base64编码
let file = document.getElementById('destination').files[0]
if (file.type.indexOf('image') !== -1) {
  let reader = new FileReader
  reader.onload = function(e) {
    let dataURL = reader.reslut
  }
  reader.readAsDataURL(file)
}

// 字符串
let reader = new FileReader()
reader.onload = function(e) {
  let rawData = reader.result
}
reader.readAsBinaryString(file)

// ArrayBuffer
let reader = new FileReader()
reader.onload = function(e) {
  let arrayBuffer = reader.result
}

reader.readAsArrayBuffer(file)

// 中止文件上传
let reader = new FileReader()
reader.abort()

// FileReader 对象采用异步方式读取文件，可以为一系列事件指定回调函数

// 综合案例：显示用户选取的本地图片
document.querySelector('input[name=pictrue]').onchange = function(e) {
  readFile(this.files[0])
}

function readFile(file) {
  let reader = new FileReader()

  reader.onload = function() {
    applyDataUrlToCanvas(this.result)
  }

  reader.readAsDataURL(file)
}

// URL 对象：用于生成指向 File 对象或者 Blob 对象的 URL
// 每次调用 URL.createObjectURL 方法，就会得到一个不一样的 URL
// 这个 URL 存在时间等于网页存在时间，一旦网页刷新或卸载，这个 URL 就失效
// 可以手动调用 URL.revokeObjectURL,使 URL 失效
let object = window.URL.createObjectURL(blob)

// 利用 URL 对象，在网页中插入图片的例子
let img = docuemnt.createElement('img')

img.src = window.URL.createObjectURL(file[0])
img.height = 60

img.onload = function(e) {
  window.URL.revokeObjectURL(this.src)
}

body.appendChild(img)

let info = document.createElement('span')

info.innerHTML = files[i].name + ':' + files[i].size + 'bytes'

document.querySelector('body').appendChild(info)
