<template>
  <div class="footer">
<!--    <a href="/#/help">帮助</a>-->
<!--    <a href="/#/privacy">隐私</a>-->
<!--    <a href="/#/terms">条款</a>-->
    <p>本网站系统不支持IE11以下浏览器</p>
  </div>
</template>

<script>
export default {};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.footer {
  position: absolute;
  bottom: 50px;
  left: 0%;
  width: 100%;
  text-align: center;
  color: #666666;
  font-size: 14px;
  a {
    color: #666666;
    text-decoration: none;
    padding: 0 10px;
  }
  a:hover {
    text-decoration: underline;
  }
  a:nth-child(2) {
    margin: 0 45px;
  }
  p {
    text-align: center;
    margin-top: 25px;
  }
}
</style>
