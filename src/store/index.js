import Vue from "vue";
import Vuex from "vuex";

import state from "./initialState";

// import { MUTE_AUDIO, muteAudio } from "./components/muteAudio";
// import { PLAY_AUDIO, playAudio } from "./components/playAudio";
import { CONTROL_AUDIO, controlAudio } from "./components/controlAudio";
import { RESIZE_WINDOW, resizeWindow } from "./components/resizeWindow";
import { SET_LOAD_STATE, setLoadState } from "./components/setLoadState";
import {
    TURN_ROULETTE,
    turnRoulette,
    STOP_ROULETTE,
    stopRoulette,
    RESET_CURRENT_RESULT,
    resetCurrentResult
} from "./components/turnRoulette";
import { SET_MODE, setMode, STOP_AUTO_PLAY, stopAutoPlay } from "./components/turnRoulette";
import { FINISHED_ROUND, finishedRound } from "./components/finishedRound";
import { START_DRAG, startDrag } from "./components/dragDrop";
import { DROP_DRAG, dropDrag } from "./components/dragDrop";
import { PLACE_CHIP, placeChip, SET_CHIPS, setChips } from "./components/calcPrice";
import { CANCEL_LAST, cancelLast } from "./components/calcPrice";
import { CLEAR_ALL, clearAll, REFRESH_AVAILABLE_MONEY, refreshAvailableMoney } from "./components/calcPrice";
import { DOUBLE_CHIP, doubleChip } from "./components/calcPrice";
Vue.use(Vuex);

export default new Vuex.Store({
    state,
    mutations: {
        // MUTE_AUDIO,
        // PLAY_AUDIO,
        TURN_ROULETTE,
        FINISHED_ROUND,
        START_DRAG,
        DROP_DRAG,
        PLACE_CHIP,
        CANCEL_LAST,
        CLEAR_ALL,
        DOUBLE_CHIP,
        SET_MODE,
        STOP_ROULETTE,
        REFRESH_AVAILABLE_MONEY,
        SET_CHIPS,
        RESET_CURRENT_RESULT,
        STOP_AUTO_PLAY,
        CONTROL_AUDIO,
        RESIZE_WINDOW,
        SET_LOAD_STATE
    },
    actions: {
        // muteAudio,
        // playAudio,
        turnRoulette,
        finishedRound,
        startDrag,
        dropDrag,
        placeChip,
        cancelLast,
        clearAll,
        doubleChip,
        setMode,
        stopRoulette,
        refreshAvailableMoney,
        setChips,
        resetCurrentResult,
        stopAutoPlay,
        controlAudio,
        resizeWindow,
        setLoadState
    },
    getters: {
        stakeTotal: (state) => {
            let total = 0;
            state.placedChips.forEach(({ price }) => (total += price));
            if (state.placedChips.length) state.moneyStaked = total.toFixed(2);
            return total ? total.toFixed(2) : 0;
        },
        getMoneyLeft: () => {
            // console.log(state.money)
            return state.money;
        },
        getStates: () => {
            return state;
        }
    },
});