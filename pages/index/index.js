const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    that.getHomeData();
    //that.getGameSelected();
  },


  getHomeData: function() { //请求首页数据
    var that = this

    wx.showLoading({
      title: '加载中..',
      mask: true,
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })

    var data = { //1.安卓 2.ios
      platform: 1
    };

    app.post(app.url.recommend, data).then((res) => {
      console.log(res);
      var that = this
      that.getGameSelected();

      var bannerList = res.banner_list
      var gameList = res.game_list
      var articleList = res.article_list
      var shiqiGameList = res.shiqi_game_list

      that.setData({
        bannerList: bannerList,
        gameList: gameList,
        articleList: articleList,
        shiqiGameList: shiqiGameList
      });

      wx.hideLoading()
      wx.stopPullDownRefresh()

    }).catch((errMsg) => {
      console.log(errMsg); //错误提示信息
      wx.hideLoading()
      wx.stopPullDownRefresh()
    });

  },

  getGameSelected: function() { //精选游戏
    var that = this
    wx.showLoading({
      title: '加载中..',
      mask: true,
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })

    var data = { //platform - 1.安卓 2.ios
      page: 1, //当前页数
      perpage: 10, //每页条数
      platform: 1
    };

    app.post(app.url.selected, data).then((res) => {
      console.log(res);

      that.setData({
        selecteGameList: res.list
      });

      wx.hideLoading()

    }).catch((errMsg) => {
      console.log(errMsg); //错误提示信息
      wx.hideLoading()
    });

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    var that = this;
    that.getHomeData();
    //that.getGameSelected();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {//触发 加载更多
    // wx.showToast({
    //   title: '加载更多...',
    //   icon: 'none',
    //   duration: 1500,
    // })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})