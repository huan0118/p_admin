<template>
  <section class="Page404">
    <div class="cube-grid">
      <div class="cube cube-1">4</div>
      <div class="cube cube-2">0</div>
      <div class="cube cube-3">4</div>
      <div class="cube cube-4">0</div>
      <div class="cube cube-5">0</div>
      <div class="cube cube-6">0</div>
      <div class="cube cube-7">4</div>
      <div class="cube cube-8">0</div>
      <div class="cube cube-9">4</div>
    </div>

    <div class="back">
      <a href="/" rel="noopener noreferrer">返回首页</a>
    </div>
  </section>
</template>

<script>
export default {
  name: "Page404"
};
</script>

<style lang="scss" scoped>
.Page404 {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-size: 14px;

  .back {
    margin-top: 10px;
    font-size: 16px;
  }

  .cube-grid {
    width: 128px;
    height: 128px;
    color: white;
  }
  .cube-grid .cube {
    width: 33%;
    height: 33%;
    background-color: #126e82;
    float: left;
    display: flex;
    justify-content: center;
    align-items: center;
    animation: cube-grid 1.3s infinite ease-in-out;
  }
  .cube-grid .cube-1 {
    animation-delay: 0.2s;
  }
  .cube-grid .cube-2 {
    animation-delay: 0.3s;
  }
  .cube-grid .cube-3 {
    animation-delay: 0.4s;
  }
  .cube-grid .cube-4 {
    animation-delay: 0.1s;
  }
  .cube-grid .cube-5 {
    animation-delay: 0.2s;
  }
  .cube-grid .cube-6 {
    animation-delay: 0.3s;
  }
  .cube-grid .cube-7 {
    animation-delay: 0s;
  }
  .cube-grid .cube-8 {
    animation-delay: 0.1s;
  }
  .cube-grid .cube-9 {
    animation-delay: 0.2s;
  }
  @keyframes cube-grid {
    0% {
      transform: scale3D(1, 1, 1);
    }
    35% {
      transform: scale3D(0, 0, 1);
    }
    70% {
      transform: scale3D(1, 1, 1);
    }
    100% {
      transform: scale3D(1, 1, 1);
    }
  }
}
</style>
