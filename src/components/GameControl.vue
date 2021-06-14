<template>
  <div class="control-wrapper">
    <div class="controls">
      <div class="controls-buttons">
        <button
          class="btn control-button"
          :class="{
            disabled: this.isAvailableTurn(),
          }"
          @click="cancelLast"
        >
          <img
            class="control-button__img"
            src="../assets/images/btn_pause.png"
            alt=""
          />
          <span class="control-button__text">ANNULLA</span>
        </button>

        <button
          class="btn control-button"
          :class="{
            disabled: this.isAvailableTurn(),
          }"
          @click="clearAll"
        >
          <img
            class="control-button__img"
            src="../assets/images/btn_cancel.png"
            alt=""
          />
          <span class="control-button__text">CANCELLA</span>
        </button>

        <button
          class="btn control-button"
          :class="{
            disabled: this.isAvailableTurn(),
          }"
          @click="doubleChip"
        >
          <img
            class="control-button__img"
            src="../assets/images/btn_double.png"
            alt=""
          />
          <span class="control-button__text">RADDOPPIA</span>
        </button>

        <button
          class="btn control-button btn-turn btn-portrait"
          :class="{
            disabled: this.isAvailableTurn(),
          }"
          @click="turnRoulette"
        >
          <img
            class="control-button__img"
            src="../assets/images/btn_reset.png"
            alt=""
          />
          <span class="control-button__text">GIRA</span>
        </button>

        <button
          class="btn control-button"
          style="margin-left:0.2vw;"
          :class="{
            disabled: this.isAvailableRepeat(),
          }"
          @click="repeat"
        >
          <img
            class="control-button__img"
            src="../assets/images/btn_ripunta.png"
            alt=""
          />
          <span class="control-button__text">RIPUNTA</span>
        </button>

        <div class="dropdown-btn" ><!-- openDropdownMenu -->
          <button
            class="btn control-button"
            :class="{ disabled: disableAutoPlayButton() }"
          >
            <img
              @click="openDropdownMenu"
              class="control-button__img"
              :src="
                isAutoPlaying()
                  ? require('../assets/images/btn_stop.png')
                  : require('../assets/images/btn_auto_start.png')
              "
              alt=""
            />
            <span
              class="control-button__text"
              v-if="
                mode !== 'autoStart-start' &&
                  mode !== 'auto-turbo-start' &&
                  mode !== 'autoStart-end-ready' &&
                  mode !== 'auto-turbo-end-ready'
              "
              >AUTOSTART</span
            >
            <span
              class="control-button__text"
              v-if="
                mode === 'autoStart-start' ||
                  mode === 'auto-turbo-start' ||
                  mode === 'autoStart-end-ready' ||
                  mode === 'auto-turbo-end-ready'
              "
              >{{ autoCount }}</span
            >
          </button>
          <div
            id="myDropdown"
            class="dropdown-content"
            :class="{ show: showDropdown }"
          >
            <a @click="autoStart(5)">5</a>
            <a @click="autoStart(10)">10</a>
            <a @click="autoStart(20)">20</a>
            <a @click="autoStart(50)">50</a>
          </div>
        </div>

        <button
          class="btn control-button btn-turn btn-landscape"
          :class="{
            disabled: this.isAvailableTurn(),
          }"
          @click="turnRoulette"
        >
          <img
            class="control-button__img"
            src="../assets/images/btn_reset.png"
            alt=""
          />
          <span class="control-button__text">GIRA</span>
        </button>
      </div>
    </div>
    <div class="turbo-button-wrapper">
      <button
        class="btn control-button turbo-button"
        @click="toggleTurbo"
        :class="{
          disabled: false,//is_turning
        }"
      >
        <img
          class="control-button__img"
          src="../assets/images/turbo-btnback.png"
          alt=""
        />
        <div class="for-pc">
          <img
            :style="{ left: turboStatus === 'off' ? '1vw' : '5.3vw' }"
            class="control-button__img__ball"
            src="../assets/images/turbo-btnball.png"
            alt=""
          />
          <span
            class="control-button__text"
            :style="{ left: turboStatus === 'off' ? '4vw' : '2.2vw' }"
            >{{ turboStatus }}</span
          >
        </div>
        <div class="for-mobile">
          <img
            :style="{ left: turboStatus === 'off' ? '3.5vw' : '12.5vw' }"
            class="control-button__img__ball"
            src="../assets/images/turbo-btnball.png"
            alt=""
          />
          <span
            class="control-button__text"
            :style="{ left: turboStatus === 'off' ? '9.5vw' : '4vw' }"
            >{{ turboStatus }}</span
          >
        </div>
      </button>
      <span class="control-button-wrapper__text">Turbo</span>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";

export default {
  name: "GameControl",
  data() {
    return {
      showDropdown: false,
      turboStatus: "off",
    };
  },
  computed: {
    ...mapState([
      "is_turning",
      "mode",
      "placedChips",
      "moneyStaked",
      "autoCount",
      "disableRepeatbutton"
    ]),
    ...mapGetters(["stakeTotal"]),
  },
  methods: {
    toggleTurbo() {
      if (this.turboStatus === "off") this.turboStatus = "on";
      else this.turboStatus = "off";
    },
    cancelLast() {
      this.$store.dispatch("cancelLast");
    },
    clearAll() {
      this.$store.dispatch("clearAll");
    },
    turnRoulette() {
      // this.$store.dispatch("resetCurrentResult");
      localStorage.setItem("placedChips_backup", JSON.stringify(this.placedChips));
      const mode = {
        mode: this.turboStatus === "on" ? "turbo-start" : "normalSpin-start",
      };
      this.$store.dispatch("setMode", mode);
    },
    doubleChip() {
      this.$store.dispatch("doubleChip");
    },
    autoStart(count) {
      //shine
      // localStorage.setItem("placedChips_backup", JSON.stringify(this.placedChips));
      const mode = {
        mode:
          this.turboStatus === "on" ? "auto-turbo-start" : "autoStart-start",
      };
      this.$store.dispatch("setMode", { ...mode, count });
      this.showDropdown = false;
    },

    openDropdownMenu() {
      if (!this.isAvailableTurn()) this.showDropdown = !this.showDropdown;
      if (this.showDropdown == false
        // this.stakeTotal > 0 &&
        // this.is_turning &&
        // (this.mode === "autoStart-start" || this.mode === "auto-turbo-start" )
      ) {
        this.$store.dispatch("stopAutoPlay");
      }
    },
    repeat() {
      this.$store.dispatch("resetCurrentResult");
      const lastStake = JSON.parse(localStorage.getItem("placedChips_backup"));
      this.$store.dispatch("setChips", { chips: lastStake });
    },

    isAvailableTurn() {
      return (
        this.is_turning ||
        !this.stakeTotal ||
        this.mode === "autoStart-start" ||
        this.mode === "normalSpin-start" ||
        this.mode === "auto-turbo-start"
      );
    },

    isAvailableRepeat() {
      return (
        this.is_turning ||
        !this.moneyStaked ||
        this.mode === "autoStart-start" ||
        this.mode === "normalSpin-start" ||
        this.mode === "turbo-start" ||
        this.mode === "auto-turbo-start"||
        this.disableRepeatbutton
      );
    },
    isAvailablePlace() {
      return (
        this.is_turning ||
        this.mode === "autoStart-start" ||
        this.mode === "normalSpin-start" ||
        this.mode === "turbo-start" ||
        this.mode === "auto-turbo-start"
      );
    },
    isAutoPlaying() {
      return (
        this.mode === "autoStart-start" ||
        this.mode === "autoStart-end-ready" ||
        this.mode === "auto-turbo-start" ||
        this.mode === "auto-turbo-end-ready"
      );
    },
    disableAutoPlayButton() {
      if (this.stakeTotal <= 0) return true;
      if (
        this.mode === "turbo-start" ||
        this.mode === "normalSpin-start" ||
        (this.mode === "normalSpin-end" && this.is_turning) ||
        (this.mode === "auto-turbo-end" && this.is_turning) ||
        (this.mode === "turbo-end" && this.is_turning)
      )
        return true;
      return false;
    },
  },
  mounted() {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.control-wrapper {
  position: relative;
  margin-top: 2vw;
  @media screen and (max-width: 1080px) and (orientation : portrait) {
    margin-top: 16vw;
    margin-left: 10vw;
  }
  .turbo-button-wrapper {
    position: absolute;
    top: -0.5vw;
    left: 7vw;
    height: 2.8vw;
    display: flex;
    align-items: center;
    @media screen and (max-width: 1080px) and (orientation : portrait) {
      // top: -11.5vw;

      left: -5vw;
      top: -7.5vw; //for android

      // left: 4vw;
      left: -8vw; //for iPhone
      top: -6.5vw;
    }
    .turbo-button {
      .for-pc {
        display: block;
        @media screen and (max-width: 1080px) and (orientation : portrait) {
          display: none;
        }
      }
      .for-mobile {
        display: none;
        @media screen and (max-width: 1080px) and (orientation : portrait) {
          display: block;
        }
      }
      position: relative;
      display: flex;
      align-items: center;
      color: white;
      img {
        height: 2.7vw;
        @media screen and (max-width: 1080px) and (orientation : portrait) {
          height: 6.7vw;
          left: 5vw;
        }
      }
      .control-button__text {
        position: absolute;
        transition: 0.3s all ease;
        text-transform: uppercase;
        left: 3.5vw;
        top: calc(1.35vw - 6.5px);
        @media screen and (max-width: 1080px) and (orientation : portrait) {
          left: 11vw;
          margin-left: 2px;
          font-size: 13px;
          line-height: 13px;;
          font-weight: bold;
          top: calc(3.35vw - 6.5px) !important;
        }
        @media screen and (max-width: 380px) and (orientation : portrait) {
          // top: 6px !important;
        }
      }
      .control-button__img__ball {
        transition: 0.3s all ease;
        position: absolute;
        height: 1.7vw;
        width: 1.7vw;
        left: 0.8vw;
        top: 0.55vw;
        @media screen and (max-width: 1080px) and (orientation : portrait) {
          height: 4.7vw !important;
          width: 4.7vw !important;
          // left: 5vw!important;
          margin-left: 2px;
          top: 1.1vw;
        }
      }
    }
    .control-button-wrapper__text {
      text-transform: uppercase;
      color: white;
      @media screen and (max-width: 1080px) and (orientation : portrait) {
        font-size: 12px;
        font-weight: bold;
        position: absolute;
        left: calc(50% - 18px);
        top: -25px;
      }
    }
  }
}

.controls {
  text-align: center;
  // margin-top: 1vw;
  width: 49vw;
  margin-left: -3vw;
  margin-bottom: -7px; //added by Yulia
  &-buttons {
    display: flex;
    align-items: flex-end;
    justify-content: center;
    .dropdown-btn {
      position: relative;
      margin-left: 0.2vw;
      button.btn {
        position: relative;
        max-width: 100%;
        z-index: 12;
      }
      .dropdown-content {
        display: none;
        position: absolute;
        bottom: calc(100% - 25px); /* added this attribute */
        left: calc(50% - 2vw);
        background-color: #114706;
        border: 3px solid #e6d593;
        border-radius: 50px 50px 0px 0px;
        color: white;
        width: 4vw;
        overflow: auto;
        box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
        z-index: 10;
      }
      .dropdown-content.show {
        display: block;
      }

      .dropdown-content a {
        color: white;
        text-decoration: none;
        display: block;
        width: 2.5vw;
        margin: auto;
        border-bottom: 1px solid #e6d593;
        margin: 20px auto 10px;
        padding-bottom: 5px;
        font-weight: bold;
        z-index: 10;
      }
      .dropdown-content a:last-child {
        border-bottom: none;
        padding-bottom: 25px;
      }
    }
  }
  .control-button {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: -webkit-center;
    // max-width: 20%;
    background-color: transparent;
    border: none;
    cursor: pointer;
    &:hover img {
      transform: scale(1.1);
    }
    &__img {
      display: block;
      transition: all 0.3s ease-in-out;
      width: 6vw;
    }
    &__text {
      display: block;
      margin-top: 10px;
      color: white;
      font-size: clamp(12px, 1vw, 20px);
      width: 6vw;
    }
    &.clicked {
      filter: grayscale(90%);
    }
  }
  .btn-portrait {
    display: none;
  }
  .btn-landscape {
    display: block;
    z-index: 999;
  }

  .control-button.btn-turn img {
    width: 9vw;
  }
  &-slider {
    position: relative;
    display: inline-block;
    margin: 24px auto 0;
    width: clamp(200px, 21.4vw, 412px);
    &__amount {
      position: absolute;
      margin: 0;
      top: 1vw;
      left: 50%;
      color: white;
      font-size: clamp(10px, 1vw, 20px);
      transform: translateX(-50%);
    }
    .slider {
      position: absolute;
      width: 15vw;
      top: 50%;
      left: 15px;
      color: white;
      text-align: right;
      transform: translateY(-50%);
      &-label {
        font-size: clamp(12px, 0.7vw, 16px);
      }
    }
    .btn-play {
      position: absolute;
      padding: 0;
      top: 50%;
      right: 0.7vw;
      width: clamp(40px, 3.8vw, 73px);
      transform: translateY(-50%);
      &:hover {
        transform: translateY(-50%) scale(1.05);
      }
    }
  }
}
.btn.disabled {
  filter: grayscale(1);
  cursor: not-allowed;
  pointer-events: none;
}

.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;

  & input {
    opacity: 0;
    width: 0;
    height: 0;

    &:checked + .slider {
      background-color: #2196f3;
    }

    &:focus + .slider {
      box-shadow: 0 0 1px #2196f3;
    }

    &:checked + .slider:before {
      -webkit-transform: translateX(26px);
      -ms-transform: translateX(26px);
      transform: translateX(26px);
    }
  }

  & .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    -webkit-transition: 0.4s;
    transition: 0.4s;

    &.round {
      width: 100px;
      height: 40px;
      border-radius: 34px;

      &:before {
        border-radius: 50%;
      }
    }

    &:before {
      position: absolute;
      content: "";
      height: 26px;
      width: 26px;
      left: 4px;
      bottom: 4px;
      background-color: white;
      -webkit-transition: 0.4s;
      transition: 0.4s;
    }
  }
}
@media screen and (max-width: 1080px) and (orientation : portrait) {
  .controls {
    margin-top: 7vw; //added by Yulia
    // margin-left: -16vw;
    margin-left: -21vw;
    margin-bottom: 10px; //added by Yulia
    // width: 80vw;
    width: fit-content;
    &-buttons {
      width: 90vw;
      align-items: center;
      justify-content: space-between;
      // gap: 1vw;
    }
    .dropdown-btn {
      .dropdown-content {
        bottom: calc(100% - 25px); /* added this attribute */
        left: calc(50% - clamp(50px, 7vw, 70px) / 2);
        width: clamp(50px, 7vw, 70px);
      }
      .dropdown-content a {
        width: 30px;
        margin: auto;
        border-bottom: 1px solid #e6d593;
        margin: 20px auto 10px;
        padding-bottom: 5px;
      }
      .dropdown-content a:last-child {
        border-bottom: none;
        padding-bottom: 25px;
      }
    }
    .control-button {
      padding: 0px; //addded by Yulia
      width: 58px;
      &__img {
        width: 12vw;
      }
      &__text {
        //added by Yulia except width: auto;
        display: block;
        margin-top: 10px;
        color: white;

        display: inline-block;
        font-size: 10px;
        transform: scale(0.7, 1);
        width: auto;
      }
    }
    .control-button.btn-turn img {
      width: 16vw;
      max-width: 16vw;
    }
    .btn-portrait {
      display: block;
      width: 18vw;
      // max-width: 18vw;
      margin-left: 0.4vw;
      img {
        width: 18vw;
        max-width: 18vw;
      }
    }
    .btn-landscape {
      display: none;
    }
    .btn.settings-button{
      width: 15vw;
    }
  }
  .controls-slider {
    width: clamp(200px, 38vw, 412px);
    &__amount {
      font-size: clamp(14px, 1.8vw, 20px);
    }
  }
  .slider-label {
    font-size: clamp(12px, 1.4vw, 16px);
  }
  .btn-play {
    right: 15px;
    width: clamp(40px, 6.7vw, 73px);
  }
}
@media screen and (max-width: 380px) and (orientation : portrait) {
  .controls {
    .control-button {
      width: 45px;

      &.btn-turn{
        width: 55px;
      }

      .control-button__text{
        font-size: 10px;
      }
    }
  }
}
</style>
