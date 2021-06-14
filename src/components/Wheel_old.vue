<template>
  <div class="wheel-wrapper">
    <div class="wheel">
      <img src="../assets/images/wheel_frame.png" class="wheel-frame" alt="" />
      <img
        src="../assets/images/wheel_numbers.png"
        ref="wheel_numbers"
        class="wheel-numbers"
        :style="[is_turning ? displayWheelNone : resetWheelStyle]"
        alt=""
      />
      <img
        src="../assets/images/wheel_numbers.png"
        ref="wheel_numbers"
        class="wheel-numbers"
        :style="[is_turning ? rotateWheelStyle : displayWheelNone]"
        alt=""
      />

      <img
        src="../assets/images/0.png"
        ref="wheel_numbers"
        class="wheel-numbers"
        :style="[is_turning ? displayWheelNone : resetWheelStyle]"
        alt=""
        v-if="current_result == 0"
      />

      <img
        src="../assets/images/1.png"
        ref="wheel_numbers"
        class="wheel-numbers"
        :style="[is_turning ? displayWheelNone : resetWheelStyle]"
        alt=""
        v-if="current_result == 1"
      />

      <img
        src="../assets/images/2.png"
        ref="wheel_numbers"
        class="wheel-numbers"
        :style="[is_turning ? displayWheelNone : resetWheelStyle]"
        alt=""
        v-if="current_result == 2"
      />

      <img
        src="../assets/images/3.png"
        ref="wheel_numbers"
        class="wheel-numbers"
        :style="[is_turning ? displayWheelNone : resetWheelStyle]"
        alt=""
        v-if="current_result == 3"
      />

      <img
        src="../assets/images/4.png"
        ref="wheel_numbers"
        class="wheel-numbers"
        :style="[is_turning ? displayWheelNone : resetWheelStyle]"
        alt=""
        v-if="current_result == 4"
      />

      <img
        src="../assets/images/5.png"
        ref="wheel_numbers"
        class="wheel-numbers"
        :style="[is_turning ? displayWheelNone : resetWheelStyle]"
        alt=""
        v-if="current_result == 5"
      />

      <img
        src="../assets/images/6.png"
        ref="wheel_numbers"
        class="wheel-numbers"
        :style="[is_turning ? displayWheelNone : resetWheelStyle]"
        alt=""
        v-if="current_result == 6"
      />

      <img
        src="../assets/images/7.png"
        ref="wheel_numbers"
        class="wheel-numbers"
        :style="[is_turning ? displayWheelNone : resetWheelStyle]"
        alt=""
        v-if="current_result == 7"
      />

      <img
        src="../assets/images/8.png"
        ref="wheel_numbers"
        class="wheel-numbers"
        :style="[is_turning ? displayWheelNone : resetWheelStyle]"
        alt=""
        v-if="current_result == 8"
      />

      <img
        src="../assets/images/9.png"
        ref="wheel_numbers"
        class="wheel-numbers"
        :style="[is_turning ? displayWheelNone : resetWheelStyle]"
        alt=""
        v-if="current_result == 9"
      />

      <img
        src="../assets/images/10.png"
        ref="wheel_numbers"
        class="wheel-numbers"
        :style="[is_turning ? displayWheelNone : resetWheelStyle]"
        alt=""
        v-if="current_result == 10"
      />

      <img
        src="../assets/images/11.png"
        ref="wheel_numbers"
        class="wheel-numbers"
        :style="[is_turning ? displayWheelNone : resetWheelStyle]"
        alt=""
        v-if="current_result == 11"
      />

      <img
        src="../assets/images/12.png"
        ref="wheel_numbers"
        class="wheel-numbers"
        :style="[is_turning ? displayWheelNone : resetWheelStyle]"
        alt=""
        v-if="current_result == 12"
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
    ]),
    rotateWheelStyle() {
      return {
        // transition: `transform ${this.turning_duration + this.delay}s cubic-bezier(0,0,0.58,1),
        //                         ${this.turning_duration + this.delay}s filter cubic-bezier(0,0,0.58,1),
        //                           ${this.turning_duration + this.delay}s -webkit-filter cubic-bezier(0,0,0.58,1)`,

        // '-webkit-transition': `background-color 2s ease-out`,
        // '-moz-transition': `background-color 2s ease-out`,
        // '-o-transition': `background-color 2s ease-out`,
        // transition: `background-color 2s ease-out`,

        "-webkit-transition": `-webkit-transform ${this.turning_duration +
          this.delay}s cubic-bezier(0,0,0.58,1)`,
        // animation: "wheelMove 2s linear infinite",

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
    // rotateBallStyle() {
    //   return {
    //     animation: `${this.turning_duration}s linear forwards orbit2`,
    //   };
    // },
  },
  watch: {
    you_win(value) {
      if (value == 1) {
        this.$Alert.alert({
          type: "success",
          message: `
            <h2>You Win!</h2>
          `,
          timeout: 2000,
        });
      }
    },
    money(value) {
      if (value < 1) {
        if (this.$refs.wheel_numbers) {
          this.$refs.wheel_numbers.style.filter = "";
          this.$refs.wheel_numbers.style.animation = "";
        }
      }
    },
    is_turning(newValue) {
      if (newValue) {
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

        // this.$refs.wheel_numbers.style.filter = "blur(1px)";

        this.$refs.ball.style.animation = `${this.turning_duration +
          this.delay}s linear forwards orbit${this.random_diamond}_${
          state.random_rotation_index
        }`;

        // this.$refs.ball.style.animation = `${this.turning_duration +
        //   this.delay}s linear forwards orbit2_1`;
        // console.log("ball animation---->", this.$refs.ball.style.animation);
        // this.$refs.ball.style.animation = `${this.turning_duration +this.delay}s linear forwards orbit2_1`;
        // this.$refs.ball.addEventListener('animationend', function() {
        //   console.log(this.getBoundingClientRect());
        // });
        // when roulette stops

        // setTimeout(() => {
        //   this.$refs.wheel_numbers.style.filter = "blur(0px)";
        // }, (this.turning_duration + this.delay) * 1000);
        //
        console.log("turning_duration", this.turning_duration);
        console.log("delay", this.delay);
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
        }, (this.turning_duration + this.delay) * 1000);
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
  transform: translate(-50%, -50%);
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
    width: 70vw;
  }
  &-frame {
    max-width: 100%;
    @media screen and (max-width: 1080px) and (orientation : portrait) {
      width: clamp(200px, 80vw, 525px);
    }
  }
  &-numbers {
    width: clamp(200px, 27.3vw, 525px);
    @include wheelComponents;
    @media screen and (max-width: 1080px) and (orientation : portrait) {
      width: clamp(175px, 55vw, 210px);
    }
  }
  &-handle {
    img {
      @include wheelComponents;
    }
    &__handles {
      width: clamp(90px, 12.8vw, 247px);
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
  }
}
.ball {
  @include wheelComponents();
  width: clamp(15px, 1.77vw, 34px);
  height: clamp(15px, 1.77vw, 34px);
  transform-origin: top left;
}

// @media screen and (max-width: 1080px) and (orientation : portrait) {
//   .wheel {
//     &-numbers {
//       width: clamp(180px, 27.3vw, 525px);
//     }
//   }
// }
</style>
