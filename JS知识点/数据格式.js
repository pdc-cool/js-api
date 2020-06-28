// 熟悉各种数据格式: DOMstring  ArrayBuffer  Blob File...
// Domstring:是一个UTF-16字符串。由于JavaScript已经使用了这样的字符串，所以DOMString 直接映射到 一个String。

// ArrayBuffer: ArrayBuffer 对象用来表示通用的、固定长度的原始二进制数据缓冲区。是一个字节数组，通常在其他语言中称为“byte array”
// 你不能直接操作 ArrayBuffer 的内容，而是要通过类型数组对象或 DataView 对象来操作，它们会将缓冲区中的数据表示为特定的格式，并通过这些格式来读写缓冲区的内容。

// 1.Blob 对象: 对象表示一个不可变、原始数据的类文件对象。Blob 表示的不一定是JavaScript原生格式的数据。File 接口基于Blob，继承了 blob 的功能并将其扩展使其支持用户系统上的文件。表示一段二进制数据
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

// base64 -> Blob
function dataURLtoBlob(dataurl) {
  var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
  while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], { type: mime });
}


/**
 * 数据格式 note
 */

 // 1.URL createObjectURL() 和 FileReader.readAsDataURL(file) 的对比: https://juejin.im/post/5d6dd5f2f265da03e168931b
//  Blob URL只能由浏览器在内部生成。URL.createObjectURL()将创建一个特殊的Blob或File对象的引用，以后可以使用它来发布URL.revokeObjectURL()。这些URL只能在浏览器的单个实例中和同一个会话中（即页面/文档的生命周期）在本地使用。
//  Blob URL / Object URL是一种伪协议，允许Blob和File对象用作图像，下载二进制数据链接等的URL源。

// 例如，不能处理Image对象的原始字节数据，因为它不知道如何处理它。它需要例如图像（二进制数据）通过URL加载。这适用于任何需要URL作为源的东西。不用上传二进制数据，
// 而是通过URL提供回来，最好使用额外的本地步骤来直接访问数据而无需通过服务器。对于编码为Base-64的字符串的Data-URI也是更好的选择。
// Data-URI的问题是每个char在JavaScript中占用两个字节。最重要的是，由于Base-64编码增加了33％。Blob是纯粹的二进制字节数组，它不像Data-URI那样具有任何重要的开销，这使得它们处理速度越来越快。

// 2.Blob Url And Data Url区别：https://github.com/chanshiyucx/blog/issues/70
// Blob url只能在浏览器创建，需要将二进制数据封装为BLOB对象，然后使用它URL.createObjectURL()为其生成本地URL

// 3.ASCII、Unicode、UTF-8、UTF-16: https://stackoverflow.com/questions/2241348/what-is-unicode-utf-8-utf-16