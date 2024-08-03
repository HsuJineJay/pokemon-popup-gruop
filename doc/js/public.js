//========================================
//首頁header下拉上滑隱藏功能
//========================================
document.addEventListener('DOMContentLoaded', function() {
  
  let lastScrollTop = 0;
    const header = document.querySelector('.nav-header');
    // console.log(header);
    const headerHeight = header.offsetHeight;
  
    window.addEventListener('scroll', () => {
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  
      if (scrollTop > lastScrollTop && scrollTop > headerHeight) {
        // 向下滾動時隱藏 header，透過top的高度來隱藏
        header.style.top = `-${headerHeight}px`;
      } else {
        // 向上滾動時顯示 header
        header.style.top = '0';
      }
  
      lastScrollTop = scrollTop;
    });
})