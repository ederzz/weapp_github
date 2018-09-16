Component({
  properties: {
    imgSrc: {
      type: String,
      value: ''
    }
  },
  data: {
    show: false
  },
  ready() {
    const intersectionObj = this.createIntersectionObserver()
    intersectionObj.relativeToViewport({ bottom: 100 }).observe('.custom__wrapper', res => {
      this.setData({
        'show': true
      }, () => {
        console.log('加载图片')
      })
    })
  }
})
