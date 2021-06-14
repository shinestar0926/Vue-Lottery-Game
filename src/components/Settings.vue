<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="inner-wrapper">
            <div class="close-wrapper">
              <button class="btn settings-button" @click="$emit('close')">
                <img
                  class="settings-button__img"
                  src="../assets/images/settings/extit.png"
                  alt=""
                />
              </button>
            </div>
            <div class="modal-header">
              <slot name="header"> </slot>
            </div>

            <div class="modal-body">
              <slot name="body">
                <div v-if="isMobile" class="column__mobile">
                  <div class="sound">
                    <button
                      class="btn settings-button"
                      @click="onGameSoundBtnClicked()"
                    >
                      <img
                        class="settings-button__img"
                        :src="
                          isGameSoundDisabled
                            ? require('../assets/images/settings/volume_off.png')
                            : require('../assets/images/settings/volume_on.png')
                        "
                        alt=""
                      />
                    </button>
                    <div class="slider-wrapper">
                      <span class="text">SOTTOFONDO</span>
                      <vue-slider
                        :change="onGameSoundChanged()"
                        v-bind="options"
                        v-model="gameSoundValue"
                      />
                    </div>
                    <div class="label">{{ gameSoundValue.toFixed(0) }} %</div>
                  </div>
                  <div class="sound">
                    <button
                      class="btn settings-button"
                      @click="onEffectSoundBtnClicked()"
                    >
                      <img
                        class="settings-button__img"
                        :src="
                          isEffectSoundDisabled
                            ? require('../assets/images/settings/volume_off.png')
                            : require('../assets/images/settings/volume_on.png')
                        "
                        alt=""
                      />
                    </button>
                    <div class="slider-wrapper">
                      <span class="text">EFFETTI SONORI</span>
                      <vue-slider
                        :change="onEffectSoundChanged()"
                        v-bind="options"
                        v-model="effectSoundValue"
                      />
                    </div>
                    <div class="label">{{ effectSoundValue.toFixed(0) }} %</div>
                  </div>
                </div>
                <div class="column">
                  <div v-if="!isMobile" class="sound">
                    <button
                      class="btn settings-button"
                      @click="onGameSoundBtnClicked()"
                    >
                      <img
                        class="settings-button__img"
                        :src="
                          isGameSoundDisabled
                            ? require('../assets/images/settings/volume_off.png')
                            : require('../assets/images/settings/volume_on.png')
                        "
                        alt=""
                      />
                    </button>
                    <div class="slider-wrapper">
                      <span class="text">SOTTOFONDO</span>

                      <vue-slider
                        :change="onGameSoundChanged()"
                        v-bind="options"
                        v-model="gameSoundValue"
                      />
                    </div>
                    <div class="label">{{ gameSoundValue.toFixed(0) }} %</div>
                  </div>
                  <div class="settings-button">
                    <div class="title">Info</div>
                    <button
                      class="btn settings-button"
                      @click="onInfoClicked()"
                    >
                      <img
                        class="settings-button__img"
                        src="../assets/images/settings/info.png"
                        alt=""
                      />
                    </button>
                  </div>
                  <div class="settings-button">
                    <div class="title">Account utente</div>
                    <button
                      class="btn settings-button"
                      @click="onAccountClicked()"
                    >
                      <img
                        class="settings-button__img"
                        src="../assets/images/settings/account.png"
                        alt=""
                      />
                    </button>
                  </div>
                  <div class="settings-button">
                    <div class="title">Altri giochi</div>
                    <button
                      class="btn settings-button"
                      @click="onMoreGamesClicked()"
                    >
                      <img
                        class="settings-button__img"
                        src="../assets/images/settings/more_game.png"
                        alt=""
                      />
                    </button>
                  </div>
                </div>
                <div class="column">
                  <div v-if="!isMobile" class="sound">
                    <button
                      class="btn settings-button"
                      @click="onEffectSoundBtnClicked()"
                    >
                      <img
                        class="settings-button__img"
                        :src="
                          isEffectSoundDisabled
                            ? require('../assets/images/settings/volume_off.png')
                            : require('../assets/images/settings/volume_on.png')
                        "
                        alt=""
                      />
                    </button>
                    <div class="slider-wrapper">
                      <span class="text">EFFETTI SONORI</span>
                      <vue-slider
                        :change="onEffectSoundChanged()"
                        v-bind="options"
                        v-model="effectSoundValue"
                      />
                    </div>
                    <div class="label">{{ effectSoundValue.toFixed(0) }} %</div>
                  </div>
                  <div class="settings-button">
                    <div class="title">Cronologia</div>
                    <button
                      class="btn settings-button"
                      @click="onChronologyClicked()"
                    >
                      <img
                        class="settings-button__img"
                        src="../assets/images/settings/history.png"
                        alt=""
                      />
                    </button>
                  </div>
                  <div class="settings-button">
                    <div class="title">Aggiungi Fondi</div>
                    <button
                      class="btn settings-button"
                      @click="onAddFundsClicked()"
                    >
                      <img
                        class="settings-button__img"
                        src="../assets/images/settings/add_money.png"
                        alt=""
                      />
                    </button>
                  </div>
                  <div class="settings-button">
                    <div class="title">Scelta lingua</div>
                    <div class="dropdown-btn">
                      <button
                        class="btn settings-button"
                        @click="openDropdownMenu()"
                      >
                        <img
                          class="settings-button__img"
                          src="../assets/images/settings/language.png"
                          alt=""
                        />
                      </button>
                      <div
                        id="myDropdown"
                        class="dropdown-content"
                        :class="showDropdown ? 'show' : ''"
                      >
                        <a @click="onLanguageChanged('IT')">IT</a>
                        <a @click="onLanguageChanged('EN')">EN</a>
                      </div>
                    </div>
                  </div>
                </div>
              </slot>
            </div>

            <div class="modal-footer">
              <slot name="footer"> </slot>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
import VueSlider from "vue-slider-component";
import "vue-slider-component/theme/antd.css";
import { mapState } from "vuex";
export default {
  components: {
    VueSlider,
  },
  props: {
    bgVolume: {
      type: Number,
    },
    effectVolume: {
      type: Number,
    },
  },
  data: function() {
    return {
      showDropdown: false,
      gameSoundValue: this.bgVolume * 100,
      effectSoundValue: this.effectVolume * 100,
      options: {
        dotSize: 24,
        width: "12vw",
        height: 10,
        contained: false,
        direction: "ltr",
        data: null,
        dataLabel: "label",
        dataValue: "value",
        min: 0,
        max: 100,
        interval: 1,
        disabled: false,
        clickable: true,
        duration: 0.5,
        adsorb: false,
        lazy: true,
        tooltip: "active",
        tooltipPlacement: "top",
        tooltipFormatter: void 0,
        useKeyboard: false,
        keydownHook: null,
        dragOnClick: false,
        enableCross: true,
        fixed: false,
        minRange: void 0,
        maxRange: void 0,
        order: true,
        marks: false,
        dotOptions: void 0,
        dotAttrs: void 0,
        process: true,
        dotStyle: { border: 0 },
        railStyle: { background: "#4d4c4c" },
        processStyle: { background: "#fff" },
        tooltipStyle: void 0,
        stepStyle: void 0,
        stepActiveStyle: void 0,
        labelStyle: void 0,
        labelActiveStyle: void 0,
      },
      isGameSoundDisabled: false,
      isEffectSoundDisabled: false,
    };
  },
  computed: {
    ...mapState([
      "bg_audio_volume",
      "effect_audio_volume",
      "effect_audio_disabled",
      "bg_audio_disabled",
      "deviceWidth",
      "deviceHeight",
    ]),
    isMobile() {
      return this.deviceWidth <= 1080;
    },
  },
  methods: {
    // onLanguageChanged(lang){ shine
    onLanguageChanged(){
      // console.log("lang", lang);
      this.showDropdown = false;
    },
    openDropdownMenu() {
      this.showDropdown = !this.showDropdown;
      // console.log("........", this.showDropdown);
    },
    onGameSoundChanged() {
      if (this.gameSoundValue <= 0) this.isGameSoundDisabled = true;
      else this.isGameSoundDisabled = false;

      this.$store.dispatch("controlAudio", {
        type: "background",
        volume: this.gameSoundValue,
      });
    },
    onGameSoundBtnClicked() {
      this.isGameSoundDisabled = !this.isGameSoundDisabled;
      this.gameSoundValue = 0;
    },
    onEffectSoundChanged() {
      if (this.effectSoundValue <= 0) this.isEffectSoundDisabled = true;
      else this.isEffectSoundDisabled = false;

      this.$store.dispatch("controlAudio", {
        type: "effect",
        volume: this.effectSoundValue,
      });
    },
    onEffectSoundBtnClicked() {
      this.isEffectSoundDisabled = !this.isEffectSoundDisabled;
      this.effectSoundValue = 0;
    },
    onInfoClicked() {},
    onAccountClicked() {},
    onMoreGamesClicked() {},
    onChronologyClicked() {},
    onAddFundsClicked() {},
    onLanguageClicked() {},
  },
};
</script>
<style lang="scss" scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;

  .modal-wrapper {
    display: table-cell;
    vertical-align: middle;
  }

  .modal-container {
    width: 80vw;
    margin: 0px auto;
    padding: 10px;
    background-color: #4d4c4c;
    border-radius: 40px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
    transition: all 0.3s ease;
    font-family: Helvetica, Arial, sans-serif;
    .inner-wrapper {
      position: relative;
      display: flex;
      flex-direction: column;
      border-radius: 33px;
      background-color: #2b2a2a;
      padding: 40px 40px 80px 40px;

      @media screen and (max-width: 1080px) and (orientation : portrait) {
        padding: 10px;
      }

      .dropdown-btn {
        position: relative;

        .btn.settings-button {
          img {
            z-index: 11;
          }
        }
        .dropdown-content {
          display: none;
          position: absolute;
          bottom: calc(-100% - 5px);
          left: calc(50% - 2vw);
          background-color: #4d4c4c;
          border: 3px solid #e6d593;
          border-radius: 0px 0px 50px 50px;
          color: white;
          width: 4vw;
          overflow: auto;
          box-shadow: 0px 8px 16px 0px rgb(0, 0, 0 / 20%);
          z-index: 9;

          @media only screen and (max-width: 1080px) and (orientation : portrait) {
            width: 28px;
            left: calc(50% - 14px);
          }

          &.show {
            display: block;
          }
          a {
            color: white;
            text-decoration: none;
            display: block;
            width: 2.5vw;
            margin: auto;
            margin: 15px auto 10px;
            padding-bottom: 5px;
            font-weight: bold;
            z-index: 10;
            text-align: center;

            &:first-child {
              border-bottom: 1px solid #e6d593;
              padding-top: 10px;
            }

            @media only screen and (max-width: 1080px) and (orientation : portrait) {
              margin: 5px auto;
              font-size: 10px;
            }
          }
        }
      }
      .close-wrapper {
        position: absolute;
        right: -2.5vw;
        top: -2.5vw;

        @media screen and (max-width: 1080px) and (orientation : portrait) {
          right: calc(50% - 7vw);
          top: -7vw;
        }
      }
      .modal-header {
        h3 {
          margin-top: 0;
          color: #42b983;
        }
      }

      .modal-body {
        display: flex;
        flex-direction: column;
        margin: 20px 0;

        @media screen and (max-width: 1080px) and (orientation : portrait) {
          margin: 20px 0 40px;
        }

        .column__mobile {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;

          .sound {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            position: relative;
            width: 100%;
            margin-bottom: 20px;
            span.text {
              position: absolute;
              top: -2.3vw;
              padding-left: 20px;
              color: white;
              font-size: 12px;
            }
            .slider-wrapper {
              flex: 1 1 auto;
              padding: 0 !important;
              .vue-slider {
                height: 6px !important;
                width: auto imp !important
              }
            }
            .vue-slider-dot {
              height: 18px !important;
              width: 18px !important;
            }
          }
        }
        .column {
          display: flex;
          flex-direction: row;
          justify-content: space-evenly;
          align-items: flex-end;
          width: 100%;

          @media screen and (max-width: 1080px) and (orientation : portrait) {
            margin-bottom: 20px;
            justify-content: space-around;
          }
          &:first-child {
            margin-bottom: 50px;
          }

          .settings-button {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;

            .title {
              color: white;
              text-transform: uppercase;
              font-size: 1rem;
              margin-bottom: 10px;

              @media screen and (max-width: 1080px) and (orientation : portrait) {
                font-size: 10px;
              }
            }
          }
        }
      }
      .settings-button {
        .settings-button__img {
          width: 6vw;

          @media screen and (max-width: 1080px) and (orientation : portrait) {
            width: 12vw;
          }
        }
      }
      .sound {
        display: flex;
        flex-direction: row;
        align-items: center;
        position: relative;
        .slider-wrapper {
          position: relative;
          span.text {
            position: absolute;
            top: -1.3vw;
            padding-left: 20px;
            color: white;
          }
          .vue-slider {
            margin: 0 20px;

            @media screen and (max-width: 1080px) and (orientation : portrait) {
              width: auto !important;
            }
          }
        }
        .label {
          background-color: #4d4c4c;
          border-radius: 5px;
          padding: 5px 15px;
          color: white;
          width: 76px;
          text-align: center;

          @media screen and (max-width: 1080px) and (orientation : portrait) {
            font-size: 12px;
          }
          @media screen and (max-width: 380px) and (orientation : portrait) {
            font-size: 10px;
            width: 50px;
            padding: 5px 0;
          }
        }
      }
    }

    @media screen and (max-width: 1080px) and (orientation : portrait) {
      width: 90%;
    }
  }
}

.modal-default-button {
  float: right;
}

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
