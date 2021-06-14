<template>
  <transition>
    <div class="wheel-wrapper">
      <div class="wheel">
        <img
          src="../assets/images/wheel_frame.png"
          class="wheel-frame"
          alt=""
        />
        <img
          ref="wheel_numbers"
          class="wheel-numbers default"
          :class="is_turning ? 'turn-roulette-wheel' : ''"
          :style="[is_turning ? displayWheelNone : resetWheelStyle]"
          src="../assets/images/wheel_numbers.png"
          alt=""
        />
        <img
          ref="wheel_numbers"
          class="wheel-numbers default"
          :class="is_turning ? 'turn-roulette-wheel' : ''"
          :style="[is_turning ? rotateWheelStyle : displayWheelNone]"
          src="../assets/images/wheel_numbers.png"
          alt=""
        />
        <img
          src="../assets/images/0.png"
          ref="wheel_numbers"
          class="wheel-numbers"
          :class="current_result == 0 ? 'selected' : ''"
          :style="[is_turning ? displayWheelNone : resetWheelStyle]"
          alt=""
        />

        <img
          src="../assets/images/1.png"
          ref="wheel_numbers"
          class="wheel-numbers"
          :style="[is_turning ? displayWheelNone : resetWheelStyle]"
          alt=""
          :class="current_result == 1 ? 'selected' : ''"
        />

        <img
          src="../assets/images/2.png"
          ref="wheel_numbers"
          class="wheel-numbers"
          :style="[is_turning ? displayWheelNone : resetWheelStyle]"
          alt=""
          :class="current_result == 2 ? 'selected' : ''"
        />

        <img
          src="../assets/images/3.png"
          ref="wheel_numbers"
          class="wheel-numbers"
          :style="[is_turning ? displayWheelNone : resetWheelStyle]"
          alt=""
          :class="current_result == 3 ? 'selected' : ''"
        />

        <img
          src="../assets/images/4.png"
          ref="wheel_numbers"
          class="wheel-numbers"
          :style="[is_turning ? displayWheelNone : resetWheelStyle]"
          alt=""
          :class="current_result == 4 ? 'selected' : ''"
        />

        <img
          src="../assets/images/5.png"
          ref="wheel_numbers"
          class="wheel-numbers"
          :style="[is_turning ? displayWheelNone : resetWheelStyle]"
          alt=""
          :class="current_result == 5 ? 'selected' : ''"
        />

        <img
          src="../assets/images/6.png"
          ref="wheel_numbers"
          class="wheel-numbers"
          :style="[is_turning ? displayWheelNone : resetWheelStyle]"
          alt=""
          :class="current_result == 6 ? 'selected' : ''"
        />

        <img
          src="../assets/images/7.png"
          ref="wheel_numbers"
          class="wheel-numbers"
          :style="[is_turning ? displayWheelNone : resetWheelStyle]"
          alt=""
          :class="current_result == 7 ? 'selected' : ''"
        />

        <img
          src="../assets/images/8.png"
          ref="wheel_numbers"
          class="wheel-numbers"
          :style="[is_turning ? displayWheelNone : resetWheelStyle]"
          alt=""
          :class="current_result == 8 ? 'selected' : ''"
        />

        <img
          src="../assets/images/9.png"
          ref="wheel_numbers"
          class="wheel-numbers"
          :style="[is_turning ? displayWheelNone : resetWheelStyle]"
          alt=""
          :class="current_result == 9 ? 'selected' : ''"
        />

        <img
          src="../assets/images/10.png"
          ref="wheel_numbers"
          class="wheel-numbers"
          :style="[is_turning ? displayWheelNone : resetWheelStyle]"
          alt=""
          :class="current_result == 10 ? 'selected' : ''"
        />

        <img
          src="../assets/images/11.png"
          ref="wheel_numbers"
          class="wheel-numbers"
          :style="[is_turning ? displayWheelNone : resetWheelStyle]"
          alt=""
          :class="current_result == 11 ? 'selected' : ''"
        />

        <img
          src="../assets/images/12.png"
          ref="wheel_numbers"
          class="wheel-numbers"
          :style="[is_turning ? displayWheelNone : resetWheelStyle]"
          alt=""
          :class="current_result == 12 ? 'selected' : ''"
        />

        <div
          v-if="current_result !== -1"
          class="winner-number"
          :class="{ visible: showWinnerNumber }"
          :style="{ backgroundColor: getColor(this.current_result) }"
        >
          {{ this.current_result }}
        </div>
        <div class="wheel-handle">
          <img
            src="../assets/images/handles.png"
            class="wheel-handle__handles"
            :class="is_turning ? 'turn-roulette-wheel1' : ''"
            :style="[is_turning ? rotateWheelStyle : resetWheelStyle]"
            alt=""
          />
          <img
            src="../assets/images/handle_base.png"
            class="wheel-handle__base"
            alt=""
          />
          <img
            src="../assets/images/handle_top.png"
            class="wheel-handle__top"
            alt=""
          />
        </div>
        <alert-alert />
      </div>

      <img
        src="../assets/images/ball.png"
        style="opacity: 0"
        class="ball"
        ref="ball"
        alt=""
      />
    </div>
  </transition>
</template>

<script>
import { mapState } from "vuex";
import state from "../store/initialState";
import { timer, fromEvent } from "rxjs";
import { debounce, tap } from "rxjs/operators";

export default {
  name: "Wheel",

  data: function() {
    return {
      random_diamond: 1,
      showWinnerNumber: false,
      isResizing: false,
    };
  },
  computed: {
    ...mapState([
      "is_turning",
      "turning_duration",
      "delay",
      "turning_speed",
      "turning_deg",
      "latest_result",
      "current_result",
      "wheel_numbers",
      "wheel_colors",
      "money",
      "you_win",
      "mode",
      "didFullyLoad",
      "ball_duration",

      "winTot"
    ]),
    rotateWheelStyle() {
      return {
        "-webkit-transition": `-webkit-transform ${this.turning_duration +
          this.delay}s cubic-bezier(0,0,0.58,1)`,
        "-webkit-transform":
          "translate(-50%, -50%) rotate(" + this.turning_deg + "deg)",
      };
    },
    displayWheelNone() {
      return {
        zIndex: "-999",
      };
    },
    resetWheelStyle() {
      if (this.isResizing) return { animation: "" };
      else {
        if (this.didFullyLoad)
          return { animation: "wheelMove 18s linear infinite" };
        else return { animation: "" };
      }
    },
  },
  watch: {
    you_win(value) {
      if (value == 1) {
        let mes_win = "<h2>You Win "+state.winTot+"!</h2>";
        this.$Alert.alert({
          type: "success",
          message: mes_win,
          timeout: 3500,
        });
      } else if (value == 2) {
        this.$Alert.alert({
          type: "success",
          message: `
            <h2>You Lose!</h2>
          `,
          timeout: 3500,
        });
      }
    },
    money(value) {
      if (value < 1) {
        if (this.$refs.wheel_numbers) {
          this.$refs.wheel_numbers.style.filter = "";
          this.$refs.wheel_numbers.style.animation = "wheelMove 18s linear infinite";
        }
      }
    },
    is_turning(newValue) {
      if (newValue) {
        // alert(newValue);
        this.showWinnerNumber = true;

        this.random_diamond = Math.floor(Math.random() * 8) + 1; //getting random diamond index from 1 to 8
        switch (this.random_diamond) {
          case 1:
          case 2:
            state.sync_offset = 0;
            break;
          case 3:
          case 4:
            state.sync_offset = 3;
            break;
          case 5:
          case 6:
            state.sync_offset = 6;
            break;
          case 7:
          case 8:
            state.sync_offset = 9;
            break;
          default:
            break;
        }
        // console.log("Random wheel rotation offset: ", state.sync_offset);
        // console.log("Random rotation change level: ", state.turning_deg);

        this.$refs.ball.style.animation = `${this.turning_duration +
          this.delay}s linear forwards orbit${this.random_diamond}_${
          state.random_rotation_index
        }`;

        // console.log("turning_duration", this.turning_duration);
        // console.log("delay", this.delay);

        setTimeout(() => {
          this.$store.dispatch("stopRoulette");
          this.$refs.ball.style.animation = "none";
          if (
            this.mode === "autoStart-end" ||
            this.mode === "auto-turbo-end" ||
            this.mode === "normalSpin-end" ||
            this.mode === "turbo-end"
          )
            this.$store.dispatch("clearAll");
          this.$store.dispatch("refreshAvailableMoney");
        }, (this.turning_duration + this.delay) * this.ball_duration);
      } else{
        // alert(newValue);
        // this.$store.dispatch("stopRoulette");
        // this.$refs.ball.style.animation = "none";
        // this.$refs.wheel_numbers.style.animation = "wheelMove 18s linear infinite";


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
  },
  mounted() {
    const resizeHandler$ = fromEvent(window, "resize").pipe(
      tap(() => {
        this.isResizing = true;
      }),
      debounce(() => timer(500))
    );
    resizeHandler$.subscribe(() => {
      this.isResizing = false;
    });
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@mixin wheelComponents() {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) rotate(0);
  will-change: transform;
}
.wheel-wrapper {
  position: relative;
}
.wheel {
  position: relative;
  img {
    pointer-events: none;
  }
  @media screen and (max-width: 1080px) and (orientation : portrait) {
    width: clamp(260px, 70vw, 270px);
  }
  @media screen and (max-width: 380px) and (orientation : portrait) {
    width: 65vw;
  }
  &-frame {
    max-width: 100%;
    @media screen and (max-width: 1080px) and (orientation : portrait) {
      width: clamp(200px, 80vw, 525px);
    }
  }
  &-numbers {
    width: clamp(200px, 27.3vw, 525px);
    visibility: hidden;
    &.default,
    &.selected {
      visibility: visible;

      // transition: transform 12s cubic-bezier(0, 0, 0.58, 1) 0s;
      // transform: translate(-50%, -50%) rotate(1135.38deg);
    }
    @include wheelComponents;
    @media screen and (max-width: 1080px) and (orientation : portrait) {
      width: clamp(175px, 55vw, 210px);
    }
    @media screen and (max-width: 380px) and (orientation : portrait) {
      width: 50vw;
      top: 49%;
    }
  }
  &-handle {
    img {
      @include wheelComponents;
    }
    &__handles {
      width: clamp(90px, 12.8vw, 247px);

      @media screen and (max-width: 380px) and (orientation : portrait) {
        width: 24.5vw;
      }
    }
    &__base {
      width: clamp(30px, 4vw, 80px);
    }
    &__top {
      width: clamp(15px, 2vw, 40px);
    }
  }
  .winner-number {
    visibility: hidden;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 999;
    width: clamp(50px, 14.3vw, 525px);
    /* text-align: center; */
    height: clamp(50px, 14.3vw, 525px);
    color: #ffffff;
    border-radius: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 120px;
    font-weight: bold;
    &.visible {
      visibility: visible;
    }
    @media screen and (max-width: 1080px) and (orientation : portrait) {
      width: clamp(110px, 14.3vw, 525px);
      /* text-align: center; */
      height: clamp(110px, 14.3vw, 525px);
      font-size: 80px;
    }
    @media screen and (max-width: 380px) and (orientation : portrait) {
      width: 26vw;
      height: 26vw;
    }
  }
}
.ball {
  @include wheelComponents();
  width: clamp(15px, 1.77vw, 34px);
  height: clamp(15px, 1.77vw, 34px);
  transform-origin: top left;

  @media screen and (max-width: 1080px) and (orientation : portrait) {
    width: 3.5vw;
    height: 3.5vw;
  }
}

</style>
