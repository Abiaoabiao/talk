(function () {
  var content = document.getElementsByClassName('main')[0]
  var init = function () {
    initEvents();
  }

  var initEvents = function () {
    sendBtn.addEventListener("click", onSendBtnClick)
  }

  /* 按钮点击事件函数 */
  var onSendBtnClick = function () {
    var txt = input.value.trim()
    if (!txt) return
    // 渲染内容请求
    renderSelfChatInfo(txt);
  }

  // 渲染自己的聊天信息
  var renderSelfChatInfo = function (txt) {
    // 自己的内容追加到我们的显示区域
    renderHtml(txt, 'right');
    input.value = ''
    // 发送数据请求
    sendChatInfoToBackEnd(txt);
  }

  // 发送聊天信息到后端
  var sendChatInfoToBackEnd = function (txt) {
    ajax({
      url: 'https://api.hyfarsight.com/test/testRequest/robotChat',
      method: 'POST',
      data: { txt: txt }, // 参数也是由后端约定
      onSuccess: function (res) {
        renderHtml(res.responseTxt, 'left');
      }
    })
  }

  // 将内容插入到DOM中
  var renderHtml = function (txt, direction) {
    var parentDiv = document.createElement('div')
    parentDiv.className = direction === 'right' ? 'chat-container avatar-container' : 'chat-container'
    var img = document.createElement('img')
    img.src = direction === 'right' ? './img/avatar.jpg' : './img/robot.jpg'
    var chidDiv = document.createElement('div')
    chidDiv.className = 'chat-txt'
    chidDiv.innerHTML = txt.replace(/{br}/g, '<br/>')
    parentDiv.appendChild(img)
    parentDiv.appendChild(chidDiv)
    content.appendChild(parentDiv)
  }

  init();
})()