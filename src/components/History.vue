<template>
  <div class="history-wrapper">
    <span class="history-title" @click="slideResult(historyArr, 'prev')">
      <img class="arrow" src="../assets/images/top-arrow.png">
    </span>
    <span class="history-title">
      ULTIMI
    </span>
    <span class="history-title" @click="slideResult(historyArr, 'next')">
      <img class="arrow" src="../assets/images/bottom-arrow.png">
    </span>
    <div class="history-items-wrapper" >
      <div class="history-items">
        <div
          class="history-item"
          v-for="(history, index) in getFirstLineNumbers(this.historyArr, this.cursor)"
          :key="index"
        >
          <span
            class="history-item__value"
            style="font-weight: bolder;"
            v-bind:style="{ color: getColor(history) }"
            >{{ history }}</span
          >
        </div>
      </div>
      <div class="history-items">
        <div
          class="history-item"
          v-for="(history, index) in getSecondLineNumbers(this.historyArr, this.cursor)"
          :key="index"
        >
          <span
            class="history-item__value"
            style="font-weight: bolder;"
            v-bind:style="{ color: getColor(history) }"
            >{{ history }}</span
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "History",
  data() {
    return {
      cursor: 0,
    }
  },
  computed: {
    ...mapState([
      "num_count",
      "finished_num",
      "historyArr",
      "wheel_numbers",
      "wheel_colors",
    ]),
  },
  watch: {
    finished_num(newValue) {
      if (newValue == this.num_count - 1) {
        this.$store.dispatch("finishedRound");
      }
    },
  },
  methods: {
    getColor(number) {
      let index = -1;
      this.wheel_numbers.forEach((n, idx) => {
        if (n === number) index = idx;
      });
      return index !== -1 ? this.wheel_colors[index] : "transparent";
    },
    getLatest(array, cursor = 0) {
      const length = array ? array.length : 0;
      if (!length) return [];

      // Il cursore permette di scorrere tra gli utlimi numeri usciti
      const startIndex = length - 12 - cursor
      const finalIndex = length - cursor

      return array
        .slice(Math.max(0, startIndex), Math.max(12, finalIndex))
        .filter((item) => item !== undefined)
        .reverse();
    },
    getFirstLineNumbers(array, cursor = 0) {
      const latest = this.getLatest(array, cursor);
      const firstLine = latest.filter((item, index) => !(index % 2));
      return [...firstLine, ...new Array(6 - firstLine.length)];
    },
    getSecondLineNumbers(array, cursor = 0) {
      const latest = this.getLatest(array, cursor);
      const secondLine = latest.filter((item, index) => index % 2);
      return [...secondLine, ...new Array(6 - secondLine.length)];
    },

    slideResult(array, direction) {
      // vengono definiti i valori limite che il cursore può assumere
      // direction = prev --> scorre verso i numeri meno recenti [VALORE MAX = historyArr.length - 12, in cui 12 sono il numero di elementi mostrati]
      // direction = next --> scorre verso i numeri più recenti [VALORE MIN = 0]
      direction === 'prev'
          ? this.cursor < this.historyArr.length - 12 ? this.cursor++ : this.historyArr.length - 12
          : this.cursor > 0 ? this.cursor-- : 0

      this.getFirstLineNumbers(array, this.cursor)
      this.getSecondLineNumbers(array, this.cursor)
    },

  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.history-wrapper {
  display: flex;
  flex-direction: column;
  margin-top: 4vw;
  padding: 2vw 1vw;
  background-color: var(--green-color);
  border-radius: 20px;
  height: 28vw;
  align-items: center;
  padding-top: 15px;
  .history-title {
    color: white;
    .arrow {
      width: 40px;
      cursor: pointer;
      @media screen and (max-width:1080px) {
        width: 25px;
      }
    }
  }
  .history-items-wrapper {
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 100%;
    margin-top: clamp(12px, 1vw, 40px);
    .history-items {
      display: flex;
      flex-direction: column;
      flex-wrap: wrap;
      height: 100%;
      place-content: space-between;
      align-items: center;
      margin-top: clamp(10px, 5vw, 30px);
      margin-bottom: 0;
      min-width: 20px;
    }
    .history-items:nth-child(1) {
      margin-bottom: 30px;
      margin-top: 0;
    }
    .history-item {
      display: flex;
      padding: 5px;
      align-items: center;
      // background-color: white;
      color: white;
      border-radius: 50%;
      font-size: clamp(20px, 1vw, 40px);
      font-weight: bold;
      text-align: center;
      justify-content: center;
      height: 2.8vw;
      span {
        transform: scale(1, 1.4);
        font-weight: 400;
      }
    }
  }
}
@media screen and (max-width: 1080px) and (orientation : portrait) {
  .history-wrapper {
    height: 70vw;
    margin-top: 0;
    padding: 1vw 0.5vw;
    .history-title {
      color: white;
      font-size: 11px;
    }
    .history-items-wrapper {
      .history {
        position: absolute;
        left: 9.2vw;
        flex-wrap: wrap;
      }
      .history-items {
        width: 100%;
        height: 100%;
        max-width: clamp(20px, 5vw, 50px);
        flex-direction: column;
        min-width: 20px;
        //by Yulia
        font-weight:  inherit;
        margin-right: 6px;
        margin-bottom: 16px;
      }
      .history-item {
        height: 6.3vw;
        font-size: clamp(15px, 2.2vw, 35px);
      }
      .history-item:nth-child(7) {
        margin-left: 0;
        margin-top: 3.2vw;
      }
    }
  }
}
</style>
