 var result = `/*
* 面试官你好，我是xxx
* 我将以动画的形式来介绍我自己
* 只用文字介绍太单调了
* 我就用代码来介绍吧
* 首先准备一些样式
*/

*{
    transition: all 1s;
}
html{
    background:rgb(222, 222, 222);
    font-size: 16px;
}
#code{
    border: 1px solid red;
    padding: 16px;
} 

/* 我需要一点代码高亮 */

.token.selector{
    color: #690;
}
.token.property{
    color: #905;
}
.token.function{
    color: #DD4A68;
}

/* 加点3D效果 */
#code{
    transform: rotate(360deg);
}

/* 不玩了，我来介绍一下我自己吧 */
/* 我需要一张白纸 */
#code{
    position: fixed;
    left: 0;
    width: 50%;
    height: 100%;
}

#paper{
    position: fixed;
    right: 0;
    width: 50%;
    height: 100%;
    background: black;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 16px;
}

#paper > .content{
    background: white;
    width: 100%;
    height: 100%;
}

`
var result2 = `
#paper{
}`

var md = `
# 自我介绍

我叫xxx
1990年1月出生
xxx学校毕业
自学前端半年
希望应聘前端开发岗

#技能介绍

熟悉Javascript Css

# 项目介绍

1. xxx轮播
2. xxx简历
3. xxx画板

# 联系方式

QQ xxxxxx
Email xxxxx
手机 XXXXX 
`

writeCode('', result, ()=>{
    createPaper(()=>{
        writeCode(result, result2, ()=>{
            writeMarkdown(md, ()=>{})
        })
    })
}) 

function createPaper(fn) {
    var paper = document.createElement('div')
    paper.id = 'paper'
    var content = document.createElement('pre')
    content.className = 'content'
    paper.appendChild(content)
    document.body.appendChild(paper)
    fn.call()
}

function writeCode(prefix, code, fn) {
    let domCode = document.querySelector('#code')
    domCode.innerHTML = prefix || ''
    let n = 0
    let id = setInterval(() => {
        n += 1
        domCode.innerHTML = Prism.highlight(prefix + code.substring(0, n), Prism.languages.css, 'css');
        styleTag.innerHTML = prefix + code.substring(0, n)
        domCode.scrollTop = 10000 // 每次更新完代码，就将滚动条向下拉一万像素，拉倒拉不动为止
        if (n >= code.length) {
            window.clearInterval(id)
            fn.call()
        }
    }, 10)
}

function writeMarkdown(markdown, fn){
    let domPaper = document.querySelector('#paper > .content')
    console.log(domPaper)
    let n = 0
    let id = setInterval(()=>{
        console.log('开始写代码')
        n += 1
        domPaper.innerHTML = markdown.substring(0, n)
        domPaper.scrollTop = 10000 // 每次更新完代码，就将滚动条向下拉一万像素，拉倒拉不动为止
        if (n >= markdown.length) {
            window.clearInterval(id)
            fn.call()
        }
    },0)
}
