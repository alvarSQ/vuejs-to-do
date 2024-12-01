<template>
<div class="title">
        <div class="title-line">
          <div class="line"></div>
          <slot> </slot>
          <div class="line"></div>
        </div>
        <div style="width: 95%" class="title-line">
          <div class="line-big"></div>
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <path
              d="M16 20H12V16L24 4L28 8L16 20Z"
              stroke="white"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M21 7L25 11"
              stroke="white"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M27 15V26C27 26.2652 26.8946 26.5196 26.7071 26.7071C26.5196 26.8946 26.2652 27 26 27H6C5.73478 27 5.48043 26.8946 5.29289 26.7071C5.10536 26.5196 5 26.2652 5 26V6C5 5.73478 5.10536 5.48043 5.29289 5.29289C5.48043 5.10536 5.73478 5 6 5H17"
              stroke="white"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <div class="line-big"></div>
        </div>
      </div>
</template>

<style lang="scss">
@use "@/assets/scss/var.scss" as *;

.title {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 15px;
  width: 40%;
}
.title-line {
  width: 82%;
  min-width: 200px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  p {
    font-family: "Racing Sans One";
    font-size: 3.33vmax;
    color: white;
  }
  svg {
    width: 6%;
  }
}
.line {
  width: 10%;
  height: 1px;
  background-color: white;
}
.line-big {
  width: 40%;
  height: 2px;
  background-color: white;
}

.verybig {
  width: 68%;
  margin-top: 20px;
  @media (max-width: 640px) {
    width: 95%;
    margin-top: 0;
  }
}
</style>