function loadCSS(cssFile, callback) {
    let link = document.createElement("link")
    link.rel = "stylesheet"
    link.type = "text/css"
    if (link.readyState) {//IE
        link.onreadystatechange = function () {
            if (link.readyState === "loaded"
                || link.readyState === "complete") {
                link.onreadystatechange = null
                callback()
            }
        }
    } else {//其他浏览器
        link.onload = function () {
            callback()
        }
    }
    link.href = cssFile
    document.head.appendChild(link)
}

function loadScript(url, callback) {
    let script = document.createElement('script')
    script.type = "text/javaScript"
    // IE和opera支持onreadystatechange
    // safari、chrome、opera支持onload
    if (script.readyState) {//IE
        script.onreadystatechange = function () {
            if (script.readyState === "loaded"
                || script.readyState === "complete") {
                script.onreadystatechange = null
                callback()
            }
        }
    } else {//其他浏览器
        script.onload = function () {
            callback()
        }
    }
    script.src = url
    document.body.appendChild(script)
}

document.addEventListener('DOMContentLoaded', function () {
    // 懒加载 lg 的 js
    let lg = document.getElementById('light-gallery')
    if (lg) {
        let lightGalleryJss = [
            '/lightgallery/js/lg-fullscreen.min.js',
            '/lightgallery/js/lg-thumbnail.min.js',
            '/lightgallery/js/lg-autoplay.min.js',
            '/lightgallery/js/lg-hash.min.js',
            '/lightgallery/js/lg-pager.min.js',
            '/lightgallery/js/lg-share.min.js',
            '/lightgallery/js/lg-zoom.min.js',
        ]
        loadCSS("/lightgallery/css/lightgallery.min.css", function () {
            let jsLoaded = 0
            loadScript("/lightgallery/js/lightgallery.min.js", function () {
                lightGalleryJss.forEach(function (js, key) {
                    loadScript(js, function () {
                        jsLoaded++
                        if (jsLoaded === lightGalleryJss.length) {
                            lightGallery(lg, {
                                mode: 'lg-slide',
                                cssEasing: 'ease',
                                speed: 500,
                                // autoplay
                                autoplayControls: true,//展示播放按钮
                                progressBar: true,
                                autoplay: false,//自动播放
                                pause: 3000,//播放间隔
                                // autoplay
                                thumbnail: false,//是否开启预览
                            })
                        }
                    })
                })
            })
        })
    }
})