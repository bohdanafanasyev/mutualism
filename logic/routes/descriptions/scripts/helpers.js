let Helpers = {


  //----------------------------------------------------------------------
  // Close button position depeneding on amount of page scrolled
  //----------------------------------------------------------------------
  closePosition: (that) => {
    let scrolled = (window.scrollX || window.pageXOffset) + window.innerWidth + that.refs.nextSlideImage.clientWidth,
        breakingPoint = that.refs.nextSlide.clientWidth + that.refs.nextSlide.offsetLeft + that.refs.nextSlideImage.clientWidth,
        closeRight = parseInt(that.refs.close.style.right),
        dynamicPosition = scrolled - breakingPoint + 79;


      // Scrolling Forward
      if (scrolled < breakingPoint) that.setState({ closePosition: 79 })
      if (scrolled > breakingPoint) that.setState({ closePosition: dynamicPosition })

      // Scrolling Backwards
      if (scrolled < breakingPoint) that.setState({ closePosition: 79 })
      if (scrolled > breakingPoint) that.setState({ closePosition: dynamicPosition})
  },



  //----------------------------------------------------------------------
  // Update Scroll Bar Width
  //----------------------------------------------------------------------

  scrollBarWidth: (that) => {
    let percents = (window.scrollX || window.pageXOffset) / ((that.refs.container.clientWidth - window.innerWidth) / 100);

    that.setState({ scrollBarPercents: percents });

  },



  //----------------------------------------------------------------------
  // Update Background Header Position
  //----------------------------------------------------------------------

  backgroundHeaderPosition(e, that) {
    // console.log(window.scrollX || window.pageXOffset)
    // console.log(that.state.backgroundHeaderPosition)
    let breakingPoint = (window.scrollX || window.pageXOffset) + window.innerWidth < that.refs.container.clientWidth

    if (e.deltaY > 1 & that.state.backgroundHeaderPosition < 50 & breakingPoint) that.setState({ backgroundHeaderPosition: that.state.backgroundHeaderPosition + 0.04 });
    if (e.deltaY < 1 & that.state.backgroundHeaderPosition > 1 & window.scrollX > 1) that.setState({ backgroundHeaderPosition: that.state.backgroundHeaderPosition - 0.05 })
  },



  // End of Helpers
}

export default Helpers;
