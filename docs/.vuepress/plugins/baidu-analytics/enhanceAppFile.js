export default ({ router }) => {
  // 百度分析集成
  if (process.env.NODE_ENV === 'production' && typeof window !== 'undefined') {
    let _hmt = _hmt || [];
    (function () {
      let hm = document.createElement("script");
      hm.src = "https://hm.baidu.com/hm.js?b355f21e987a46e0bb25036f07cfb2bb";
      let s = document.getElementsByTagName("script")[0];
      s.parentNode.insertBefore(hm, s);
    })();
  }
}