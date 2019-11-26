//var baseUrl = `http://bee-app.si.maowan.com`;
var baseUrl = `http://bee.mitoo.cn`;

App({

  //app.js：设置一些项目的全局变量
  url: {
    baseUrl: baseUrl,
    recommend: baseUrl + `/api/index/recommend`,
    selected: baseUrl + `/api/index/selected`,
  },


  onLaunch: function() {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },


  /** 
   * 自定义post函数，返回Promise
   * +-------------------
   * author: rickpang <pangrongxian@gmail.com>
   * +-------------------
   * @param {String}      url 接口网址
   * @param {arrayObject} data 要传的数组对象 例如: {name: 'rickpang', age: 20}
   * +-------------------
   * @return {Promise}    promise 返回promise供后续操作
   */
  post: function (url, data) {
    var promise = new Promise((resolve, reject) => {
      //init
      var that = this;
      var postData = data;
      //网络请求
      wx.request({
        url: url,
        method: 'POST',
        contentType: 'application/json:encoding:utf-8',
        data: postData,
        success: function (res) {
          //console.log(res)
          if (res.data.code === 200) {
            resolve(res.data.data);
          } else {
            reject({
              code: res.data.code,
              msg: res.data.message
            }); //返回错误提示信息
          }
        },
        error: function (e) {
          reject({
            code: res.data.code,
            msg: "网络出错啦"
          });
        }
      })
    });
    return promise;
  },



  globalData: {
    userInfo: null
  }
})