<template>
  <div
    class="btn common"
    :class="showInfo ? [this.buttonData.buttonType ,'hover'] : this.buttonData.buttonType"
    @mouseover="enterCell"
    @mouseleave="leaveCell"
    @dragleave="leaveCell"
    @click="clickCell"
    @drop="dropDrag"
    @dragover="enterCell"
    @dragover.prevent
    @dragenter.prevent
  >
    <button
      v-if="this.latestChip && this.latestChip.price"
      v-bind:style="{ maxWidth: maxWidth }"
      v-bind:class="{ 'img-transition': maxWidth }"
      class="chip"
    >
      <div
        v-for="(chip, index) in this.getFirstButtonsPerCell"
        :key="chip.key"
        class="cell-container-margin t1"
        :style="`top:${index * -3}px`"
      >
        <img
          :src="getImageUrlFromPrice(chip.price)"
          class="img-transition"
          v-bind:style="{ maxWidth: maxWidth }"
          alt="100"
        />
      </div>
      <div
        v-for="(chip, index) in this.getButtonsPerCell"
        :key="chip.key"
        class="cell-container-margin t2"
        :style="`top:${(index + 1) * -3}px`"
      >
        <img
          :src="getImageUrlFromPrice(chip.price)"
          class="img-transition"
          v-bind:style="{ maxWidth: maxWidth }"
          alt="100"
        />
      </div>
    </button>
    <div v-if="showInfo" class="tooltip">
      <ul>
        <li>PUNTATA: {{ getCellStake.toFixed(2) }} €</li>
        <li>{{ buttonData.stakeType }}</li>
        <li>Paga {{ buttonData.winning }} a 1</li>
        <li>MIN: €0,10</li>
        <li>MAX: €{{ buttonData.max }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import { chips } from "./Chips";
import { mapState } from "vuex";

export default {
  name: "CellButton",
  data() {
    return {
      chips: chips,
      maxWidth: false,
      showInfo: false,
      testflag: true,
    };
  },
  computed: {
    ...mapState(["drag", "dragPrice", "placedChips"]),
    getCellStake() {
      const getChipsPacedInCell = this.placedChips.filter(
        (c) => c.place === this.buttonData.id
      );
      return getChipsPacedInCell.map((c) => c.price).reduce((a, b) => a + b, 0);
    },
    getFirstButtonsPerCell() {
      const self = this;
      const buttonsPerCell = this.placedChips
        .filter((c) => c.place === this.buttonData.id)
        .map((c) => ({ ...c, key: self.$uuid.v1() }));
      let arr = Array();
      arr = Object.keys(buttonsPerCell).map((index) => buttonsPerCell[index]);
      // console.log("type:", arr);
      return arr.slice(0, 1);
    },
    getButtonsPerCell() {
      const self = this;
      const buttonsPerCell = this.placedChips
        .filter((c) => c.place === this.buttonData.id)
        .map((c) => ({ ...c, key: self.$uuid.v1() }));
      let arr = Array();
      arr = Object.keys(buttonsPerCell).map((index) => buttonsPerCell[index]);
      // console.log("type:", typeof arr);
      return arr.slice(1, 5);
    },
  },
  watch: {
    latestChip: {
      // the callback will be called immediately after the start of the observation
      immediate: true,
      handler(val, oldval) {
        if (
          !oldval ||
          val.isLastPlaced !== oldval.isLastPlaced ||
          val.price !== oldval.price
        )
          this.getMaxWidth();
      },
    },
  },
  props: {
    buttonData: Object,
    latestChip: Object,
  },
  methods: {
    enterCell(event) {
      const targetClass = event.target.classList;
      if (window.innerWidth > 1080) {
        if (targetClass.contains("btn") && targetClass.contains("common"))
          this.showInfo = true;
      }
      if (targetClass.contains("btn") && targetClass.contains("common")) {
        if (this.drag) this.$parent.enterCell(this.buttonData.cells);
      } else this.showInfo = false;
    },
    leaveCell() {
      this.showInfo = false;
      this.$parent.leaveCell();
    },
    clickCell() {
      if (this.getCellStake < this.buttonData.max) {
        if (this.drag && this.dragPrice) {
          this.$parent.clickCell(
            this.buttonData.id,
            this.dragPrice,
            this.buttonData.winning,
            this.buttonData.stakeType
          );
        }
      } else {
        // alert(`Massima giocata consentita: ${this.buttonData.max} €`);
      }
    },
    dropDrag() {
      if (this.drag && this.dragPrice) {
        this.$parent.clickCell(
          this.buttonData.id,
          this.dragPrice,
          this.buttonData.winning,
          this.buttonData.stakeType
        );
      }
      this.$store.dispatch("dropDrag");
    },
    getImageUrlFromPrice(recentPrice) {
      const latestChip = this.chips.find(
        // (chip) => chip.price === this.latestChip.price
        (chip) => chip.price === recentPrice
      );

      return latestChip ? latestChip.src : null;
    },
    getMaxWidth() {
      if (this.latestChip.isLastPlaced) {
        this.maxWidth = true;
        setTimeout(() => {
          this.maxWidth = false;
        }, 10);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.btn.common.hover{
  z-index: 999;
}
.vertical {
  width: 10px;
  height: 6.3vw;
  transform: translateX(-50%);
  z-index: 4;
  @media screen and (max-width: 1080px) and (orientation : portrait) {
    top: 0vw;
    height: 9.3vw;
    button {
      // margin-bottom: -2vw;
    }
  }
}
.horizontal {
  width: 6.3vw;
  height: 10px;
  transform: translateY(-50%);
  z-index: 4;
  @media screen and (max-width: 1080px) and (orientation : portrait) {
    width: 12.3vw;
    button {
      margin-bottom: 6vw;
    }
  }
  button.chip {
    @media screen and (max-width: 1080px) and (orientation : portrait) {
      margin-top: 0vw;
    }
  }
}
.center {
  width: 10px;
  height: 10px;
  transform: translate(-50%, -50%);
  z-index: 5;
  @media screen and (max-width: 1080px) and (orientation : portrait) {
    // margin-top: 1.5vw;
    button {
      // margin-bottom: 9vw;
    }
  }
  button.chip {
    @media screen and (max-width: 1080px) and (orientation : portrait) {
      margin-top: 0vw;
    }
  }
}
.self {
  width: 6.25vw;
  height: 6.25vw;
  z-index: 3;
  @media screen and (max-width: 1080px) and (orientation : portrait) {
    width: 12.25vw;
    height: 11.25vw;
    // margin-top: 2vw;
    .chip {
      // margin-bottom: 5vw;
    }
  }
}
.chip {
  // padding: 0.2vw 0 0 0.2vw;
  transition: 0.1s all cubic-bezier(0.6, -0.28, 0.74, 0.05);
  // margin-bottom: 2vw;
  overflow: visible;
  position: absolute;
  @media screen and (max-width: 1080px) and (orientation : portrait) {
    margin-bottom: 5vw;
    transform: rotate(-90deg) translate(0%, 0%);
    margin-top: 0;
    top: 50%;
  }
  img {
    max-width: 3vw;
    transition: 0.1s all cubic-bezier(0.6, -0.28, 0.74, 0.05);
    @media screen and (max-width: 1080px) and (orientation : portrait) {
      max-width: 5vw;
    }
  }
  .cell-container-margin:nth-child(2) {
    top: -3px !important;
  }
}
.img-transition {
  max-width: 5vw;
  transition: none;
  img {
    transition: none;
    max-width: 5vw;
  }
}

.tooltip {
  position: absolute; /* making the .tooltip span a container for the tooltip text */
  top: 20%;
  left: 80%;
  //transform:translateY(-50%, -50%);
  margin-left: 15px; /* and add a small left margin */

  /* basic styles */
  min-width: 130px;
  width: fit-content;
  height: auto;
  padding: 5px 10px;
  border: 3px solid #ffffff;
  border-radius: 20%;
  background: rgba(31, 30, 30, 0.8);
  color: #ffffff;
  text-align: left;
  font-size: 13px;
}
.cell-container-firstChip {
  // margin-bottom: 0vw;

  display: block;
}
.cell-container-margin {
  // margin-bottom: -60px;
  // margin-top: -69px;
  position: absolute;
  transform: translate(-50%, -50%);
  margin-bottom: -3vw;
  @media screen and (max-width: 1080px) and (orientation : portrait) {
    margin-bottom: 0vw;
  }
}
.cell-container-disabled {
  display: none;
}
</style>
