<template>
  <div class="summary">
    <!-- <div class="row">
      <div class="col-9 col-sm-9 col-md-9 col-lg-9 col-xl-9"> -->
        <div class="summary-info">
          <span style="margin-left:-10px">
            SALDO&nbsp;MODALITA&nbsp;DEMO <br><span class="text-white" >€{{ (recent_money ).toFixed(2) }}</span>
          </span>
          <span class="text-oneline"><span >PIAZZA LE TUE PUNTATE</span></span>
          <span style="margin-left:-20px; padding-right: 20px">
            PUNTATA TOTALE <br ><span class="text-white">€{{ stakeTotal }}</span>
          </span>
        </div>
      <!-- </div> -->
      <!-- <div class="col-3 col-sm-3 col-md-3 col-lg-3col-xl-3"> -->
        <div class="summary-controls">
          <!-- <button
            v-if="this.audio_enabled"
            class="btn btn-summary-control btn-volumn"
            :class="{ active: !audio_enabled }"
            @click="muteAudio"
          >
            <img src="../assets/images/btn_volumn.png" alt="audio" />
          </button>
          <button
            v-if="!this.audio_enabled"
            class="btn btn-summary-control btn-mute"
            :class="{ active: audio_enabled }"
            @click="playAudio"
          >
            <img src="../assets/images/btn_mute.png" alt="mute" />
          </button> -->
          <button class="btn btn-summary-control btn-setting" @click="$emit('settings')">
            <img src="../assets/images/btn_setup.png" alt="settings" />
          </button>
        </div>
      <alert-alert />
      </div>

    <!-- </div> -->
  <!-- </div> -->
</template>

<script>
import { mapGetters, mapState } from "vuex";
import state from "../store/initialState";

export default {
  name: "Summary",
  computed: {
    recent_money () {
      // console.log(state.money)
      return state.money
    },

    ...mapState([
      "money",
      "winTot",
      "audio_disabled",
      "audio_enabled",
      "audio_bg",
    ]),
    ...mapGetters(["stakeTotal"]),
  },
  mounted() {
    // Play audio when loading
    if (this.audio_enabled) {
      this.audio_bg.play();
    }
  },
   watch:{
    recent_money(value)
    {
      if(value < 1)
      {
            this.$Alert.alert({
            type: 'warning',
            message: `
              <h2>Game Over!</h2>
            `,
            timeout: 45000,
          })
      }
    }
  },
  methods: {
    muteAudio() {
      this.$store.dispatch("muteAudio");
    },
    playAudio() {
      this.$store.dispatch("playAudio");
    },
    settings() {},
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
br{
  display:none;
}

.summary {
  padding: 0 50px;
  display: flex;
  justify-content: space-between;
  background-color: var(--black-color);
  @media screen and (max-width:1080px) and (orientation : portrait) {
    padding: 0 0px;
    br{
      display: block;
    }
  }
  &-info {
    display: flex;
    flex-grow: 1;
    align-items: center;
    // justify-content: center;
    justify-content: space-between;
    span {
      .text-oneline{
        margin-top:-10px;
        span{
          padding-left:0px; margin-left:-35px
        }
      }
      color: var(--yellow-color);
      font-size: clamp(16px, 1.45vw, 28px);
      // margin-right: 40px;
      span {
        color: white;
        font-size: clamp(16px, 1.45vw, 28px);
        @media screen and (max-width: 1080px) and (orientation : portrait){
          font-size: clamp(12px, 1.45vw, 15px);
          padding-left: 30px;
        }

      }
      @media screen and (max-width: 1080px) and (orientation : portrait){
        white-space: nowrap;
        font-size: clamp(12px, 1.45vw, 15px);
        transform: scale(.7, 1);
        
      }
    }
    @media screen and (max-width:1080px) and (orientation : portrait){
      .text-oneline{
          margin-top:-20px;
          span{
            padding-left:0px; margin-left:-35px
          }
      }      
    }
  }
  &-controls {
    display: flex;
    margin-left: 30px;
    align-items: center;
    @media screen and (max-width: 1080px) and (orientation : portrait){
      margin-left: 0px;
    }
  }
}
.btn-summary-control {
  margin: 5px;
  width: 40px;
  height: 40px;
  background-color: transparent;
  border: none;
  cursor: pointer;
  text-align: center;
  transition: all 0.3s ease-in-out;
  &:hover,
  &.active {
    background-color: var(--yellow-color);
  }
  @media screen and (max-width: 1080px) and (orientation : portrait) {
    margin: 3px;
    margin-left: -20px;
    
  }
}
</style>
