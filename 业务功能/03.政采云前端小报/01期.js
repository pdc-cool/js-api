// 1.如何实现一个 Virtual Dom 算法
// 算法的实现：
// 步骤一：用 js 对象模拟 DOM 树
// 步骤二：比较两颗虚拟 DOM 树的差异
// 步骤三：把差异应用到真正的 DOM 树上

// Virtual DOM 本质上就是在 JS 和 DOM 之间做了一个缓存。可以类比 CPU 和硬盘，
// 既然硬盘这么慢，我们就在它们之间加个缓存：既然 DOM 这么慢，我们就在它们 JS 和 DOM 之间加个缓存。
// CPU（JS）只操作内存（Virtual DOM），最后的时候再把变更写入硬盘（DOM）

// 2.前端文件下载：使用 H5 a 标签的 download 属性

// template
<a id="downLoadExcel" :href="downLoadTemplateURL" :download="filename"></a>

// js
downLoadExcelTemplate() {
    const vm = this
    vm.downLoadTemplateURL = vm.apiHost + "downloadYourFileURL"
    vm.filename = "myTest.pdf"
    setTimeout( () => {
        document.querySelector("#downLoadExcel").click()
    },500)
}

// 3.js 七种继承
