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
  let xhr = new XMLHttpRequest()
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
