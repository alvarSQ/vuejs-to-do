<script setup lang="ts">
import { ref } from "vue";

const liul = ref(['Все сделал', 'Все сделал', 'Все сделал', 'Все сделал', 'Все сделал', 'Все сделал'])
</script>

<template>
<li v-for="(il, index) in liul" :key="index">
          <div class="flex-center">
            <input
              style="margin-bottom: 0; text-align: center"
              type="checkbox"
              name="task.title"
            />
            <p :class="{ 'task-ready': false }">
              {{ il }}
            </p>
          </div>
          <div class="edit">
            <div class="icon-box">
              <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
                <path
                  d="M16 20H12V16L24 4L28 8L16 20Z"
                  stroke="#222"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M21 7L25 11"
                  stroke="#222"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M27 15V26C27 26.2652 26.8946 26.5196 26.7071 26.7071C26.5196 26.8946 26.2652 27 26 27H6C5.73478 27 5.48043 26.8946 5.29289 26.7071C5.10536 26.5196 5 26.2652 5 26V6C5 5.73478 5.10536 5.48043 5.29289 5.29289C5.48043 5.10536 5.73478 5 6 5H17"
                  stroke="#222"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
            <div class="icon-box">
              <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
                <path
                  d="M24.7969 6.98438H5.20312"
                  stroke="#222222"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  fill="none"
                />
                <path
                  d="M12.3282 12.3281V19.4531"
                  stroke="#222222"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M17.6719 12.3281V19.4531"
                  stroke="#222222"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M23.0156 6.98438V23.9062C23.0156 24.1425 22.9218 24.369 22.7547 24.536C22.5877 24.703 22.3612 24.7969 22.125 24.7969H7.87497C7.63876 24.7969 7.41223 24.703 7.2452 24.536C7.07818 24.369 6.98434 24.1425 6.98434 23.9062V6.98438"
                  stroke="#222222"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M19.4531 6.98438V5.20313C19.4531 4.73071 19.2655 4.27764 18.9314 3.94359C18.5974 3.60954 18.1443 3.42188 17.6719 3.42188H12.3281C11.8557 3.42188 11.4026 3.60954 11.0686 3.94359C10.7345 4.27764 10.5469 4.73071 10.5469 5.20313V6.98438"
                  stroke="#222222"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
          </div>
        </li>
  
</template>


<style lang="scss">
@use "@/assets/scss/var.scss" as *;

input[type="checkbox"] {
  accent-color: #999;
  width: wmax(30);
  height: wmax(30);
  @media (max-width: 768px) {
    width: 12px;
  height: 12px;
}
}

.icon-box {
  display: flex;
  align-items: center;
  justify-content: center;
  width: wmax(38);
  height: wmax(38);
  cursor: pointer;
  border-radius: 10px;
  background-color: #999;
  @media (max-width: 1240px) {
    width: 25px;
    height: 25px;
    background-color: #222;
    svg :nth-child(n) {
      stroke: white;
    }
  }
}

</style>
