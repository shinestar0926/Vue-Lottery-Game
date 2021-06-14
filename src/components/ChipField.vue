<template>
  <div class="history">
    <div class="chipfield">
      <button v-for="chip in chips" :key="chip.price" class="chip">
        <img
          :src="chip.src"
          :alt="chip.alt"
          v-bind:class="[
            classBindHovering(chip.price),
            {
              disabled: isAvailableTurn(),
            },
          ]"
          draggable
          @click="startDrag(chip.price)"
          @dragstart="startDrag(chip.price)"
          @dragend="endDrag"
        />
      </button>
    </div>
    <div class="history-tooltip">
      <p class="history-min">
        MIN €<span class="history-min__value">0.10</span>
      </p>
      <!-- <p class="history-max">
        MAX €<span class="history-max__value">100.00</span>
      </p> -->
      <p class="history-max-table">
        MAX WIN €<span class="history-max-table__vale">10.000,00</span>
      </p>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { chips } from "./Chips";
export default {
  name: "ChipField",
  computed: {
    ...mapState(["dragPrice", "is_turning", "mode"]),
  },
  props: {
    msg: String,
  },
  data() {
    return {
      chips: chips,
    };
  },
  methods: {
    startDrag(price) {
      this.$store.dispatch("startDrag", {
        price,
      });
    },
    endDrag() {
      this.$store.dispatch("dropDrag");
    },
    classBindHovering: function(price) {
      return {
        "hover-number": this.isHovering(price),
      };
    },
    isHovering: function(price) {
      return this.dragPrice === price;
    },
    isAvailableTurn() {
      return (
        this.is_turning ||
        this.mode === "autoStart-start" ||
        this.mode === " normalSpin-start"
      );
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.history {
  display: flex;
  flex-direction: column;
  margin-top: 1vw;
  .chipfield {
    padding: 1.5vw;
    background-color: #104703;
    border-radius: 20px;
    display: flex;
    flex-direction: row;
    // gap: 0.5vw;
    width: 100%;
    .hover-number {
      box-shadow: 0px 0px 4px 3px #f9d53e;
      border-radius: 100%;
    }
    button.chip {
      width: 4.5vw;
      height: 3.1vw;
      position: relative;
      margin: 0 0.25vw;
      img {
        position: absolute;
        top: 0;
        left: 0;
      }
    }

    @media screen and (max-width: 1080px) and (orientation : portrait) {
      button.chip {
        width: 7.5vw;
        height: 7.5vw;
      }
    }
  }
  .chip {
    padding: 0;
  }

  .history-tooltip {
    /*margin-left: clamp(10px, 1.5vw, 30px);*/
    color: white;
    font-size: clamp(16px, 1vw, 20px);
    display: flex;
    gap: 1vw;
    justify-content: center;
    /*padding-right: 3vw;*/
    width: 100%;
  }
  .history-tooltip p {
    margin: 0;
    line-height: 1.5;
  }
}
.disabled {
  filter: grayscale(1);
  cursor: not-allowed;
  pointer-events: none;
}
@media screen and (max-width: 1080px) and (orientation : portrait) {
  .history {
    position: absolute;
    left: 9.2vw;
    top: calc(40vw + 98px); //changed by Yulia
    flex-direction: column;
    .chipfield {
      padding: 1.3vw;
      flex-direction: column;
      order: 2;
      width: 10vw;
    }
    .history-tooltip {
      font-size: clamp(11px, 1vw, 13px); //added by Yulia
      margin-top: 1.8vw;
      margin-left: 0;
      order: 1;
      flex-direction: column;
      gap: 0;
      .history-max-table {
        display: none;
      }
    }
    button {
      // margin-bottom: 6px;
      margin-bottom: 1vw;
    }
  }
}
</style>
