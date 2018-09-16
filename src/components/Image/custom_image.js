Component({
  properties: {
    imgInfo: {
      type: Object,
      value: {
        src: '',
        show: false
      }
    }
  },
  ready() {
    const intersectionObj = this.createIntersectionObserver()
    intersectionObj.relativeToViewport({ bottom: 100 }).observe('.custom__wrapper', res => {
      this.setData({
        'imgInfo.show': true
      }, () => {
        console.log('加载图片')
      })
    })
  }
})
