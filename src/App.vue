<template>
  <div class="roulette-game">
    <pulse-loader :loading="!didFullyLoad" color="green"></pulse-loader>
    <div
      :class="didFullyLoad ? 'loaded' : ''"
      class="content-wrapper"
      v-images-loaded:on.progress="imageProgress"
    >
      <span
        class="history-maxwin__value"
        style="color: white;font-size: 11px; padding-top:6px;margin-left:30px;"
        >MAX WIN €10.000,00</span
      >
      <div class="game">
        <div class="game-left ">
          <Wheel />
          <ChipField />
        </div>
        <div class="game-center ">
          <BettingTable />
          <GameControl />
        </div>
        <div class="game-right ">
          <History />
        </div>
      </div>
      <Summary @settings="showSettings = true" />
      <Settings
        :bgVolume="bg_audio_volume"
        :effectVolume="effect_audio_volume"
        v-if="showSettings"
        @close="showSettings = false"
      />
    </div>
  </div>
</template>

<script>
import Wheel from "./components/Wheel";
import BettingTable from "./components/BettingTable";
import History from "./components/History";
import ChipField from "./components/ChipField";
import GameControl from "./components/GameControl";
import Summary from "./components/Summary";
import Settings from "./components/Settings";
import { mapState } from "vuex";
import imagesLoaded from "vue-images-loaded";
import PulseLoader from "vue-spinner/src/PulseLoader.vue";

export default {
  name: "App",
  directives: {
    imagesLoaded,
  },
  components: {
    Wheel,
    BettingTable,
    History,
    ChipField,
    GameControl,
    Summary,
    Settings,
    PulseLoader,
  },
  data: function() {
    return {
      imageCount: 41,
      showSettings: false,
      window: {
        width: 0,
        height: 0,
      },
    };
  },
  methods: {
    handleResize() {
      this.window.width = window.innerWidth;
      this.window.height = window.innerHeight;
      this.$store.dispatch("resizeWindow", {
        width: this.window.width,
        height: this.window.height,
      });
    },
    imageProgress() {
      // console.log(this.imageCount);
      this.imageCount--;
      if (this.imageCount === 0) {
        // console.log("images all fully loaded!");
        setTimeout(() => {
          this.$store.dispatch("setLoadState", { value: true });
          // console.log("loaded?", this.didFullyLoad);
        }, 500);
      }
    },
  },
  computed: {
    ...mapState([
      "bg_audio_volume",
      "effect_audio_volume",
      "effect_audio_disabled",
      "bg_audio_disabled",
      "didFullyLoad",
    ]),
  },
  created() {
    window.addEventListener("resize", this.handleResize);
    this.handleResize();
  },
  destroyed() {
    window.removeEventListener("resize", this.handleResize);
  },
  mounted() {
    // console.log("ready to go");
  },
};
</script>

<style lang="scss" scoped>
.history-maxwin__value {
  display: none;
  @media screen and (max-width: 1080px) and (orientation : portrait) {
    display: block;
  }
}
</style>
