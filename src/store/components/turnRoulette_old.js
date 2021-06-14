import _ from 'lodash';
import { timer, Subject } from 'rxjs';
import { take, takeUntil, finalize, tap } from 'rxjs/operators';
import { getRandomInt } from "../helpers";
import { getRouletteResult } from "../helpers";
import state from "../initialState";

export const TURN_ROULETTE = (state) => {
    state.autoCount--;
    state.is_turning = true;
    state.drag = false;
    state.you_win = 0;
    state.dragPrice = 0;
    state.random_rotation_index = getRandomInt(1, state.random_rotation_range)
        // console.log('random rotation index: ', state.random_rotation_index);
    state.turning_deg =
        state.random_rotation_index * (360 / state.num_count) + 3 * 360;
    state.kickSound3.currentTime = 1;
    state.kickSound3.play();
};

export const turnRoulette = (context) => {
    context.commit("RESET_CURRENT_RESULT");
    context.commit("TURN_ROULETTE");
};

export const SET_MODE = (state, mode) => {
    // console.log("mode----->", mode);
    state.mode = mode;
    if (mode === "autoStart-start") {
        state.turning_duration = 10;
        state.delay = 2;

    }
    if (mode === "normalSpin-start") {
        state.turning_duration = 10;
        state.delay = 2;
    }
    if (mode === "turbo-start") {
        state.turning_duration = 5;
        state.delay = 1;
    }
    if (mode === "auto-turbo-start") {
        state.turning_duration = 5;
        state.delay = 1;
    }
};

export const setMode = (context, { mode, count }) => {
    context.commit("SET_MODE", mode);
    state.autoCount = count;
    const replayInterval = mode === "autoStart-start" ? 14500 : 7000;
    const endReadyMessage = mode === "autoStart-start" ? "autoStart-end-ready" : "auto-turbo-end-ready";
    if (mode === "autoStart-start" || mode === "auto-turbo-start") {
        let stopAutoPlayByError = false;
        const playInterval = timer(0, replayInterval);
        state.stopAutoPlay$ = new Subject();
        const playAutoStart = playInterval.pipe(
            take(count),
            takeUntil(state.stopAutoPlay$),
            tap(() => {
                const lastStake = JSON.parse(localStorage.getItem('placedChips'));
                context.dispatch("setChips", { chips: lastStake });
                const totalStake = _.sumBy(lastStake, (stake) => stake.price);
                if (context.getters.getMoneyLeft >= totalStake) {
                    context.dispatch("turnRoulette");
                }
                if ((context.getters.getMoneyLeft - totalStake) < totalStake) {
                    stopAutoPlayByError = true;
                    context.commit("SET_MODE", endReadyMessage);
                    // state.stopAutoPlay$.next();
                    // state.stopAutoPlay$.complete();
                    context.dispatch("stopAutoPlay");
                }
            }),
            finalize(() => {
                timer(500).subscribe(() => {
                    if (!stopAutoPlayByError)
                        context.commit("SET_MODE", endReadyMessage);
                });
            })
        );
        playAutoStart.subscribe();
    }

    if (mode === "normalSpin-start" || mode === "turbo-start") {
        const duration = mode === 'normalSpin-start' ? 10000 : 5000;
        const message = mode === 'normalSpin-start' ? 'normalSpin-end' : 'turbo-end';
        const playNormal = timer(0, duration);
        playNormal.pipe(
            take(1),
            tap(() => {
                context.dispatch("turnRoulette");
            }),
            finalize(() => {
                context.commit("SET_MODE", message);
            })
        ).subscribe();
    }
    // if (mode === "turbo-start") {
    //   context.dispatch("turnRoulette");
    //   setTimeout(() => {
    //     context.commit("SET_MODE", "turbo-end");
    //   }, 6000);
    // }
};

export const STOP_ROULETTE = (state) => {
    const rouletteResult = getRouletteResult(
        state.turning_deg,
        state.wheel_numbers
    );
    state.latest_result = rouletteResult
    state.current_result = rouletteResult
    state.is_turning = false;
    state.turning_deg = 0;
    state.historyArr[state.finished_num] = state.latest_result;
    state.historyArr = [...state.historyArr];
    state.finished_num++;

    state.kickSound3.pause();

    //console.log('last res: ', state.latest_result, state.placedChips)
    // check se vince

    // cancella puntata
    // state.placedChips.splice(0, state.placedChips.length);
    let buttonData = [
            { id: 0, cells: [0], buttonType: "btn-zero", winning: 11, stakeType: 'EN PLAIN' },
            { id: 1, cells: [0, 3], buttonType: "vertical", winning: 5, stakeType: "A CAVALLO" },
            { id: 2, cells: [3], buttonType: "self", winning: 11, stakeType: 'EN PLAIN' },
            { id: 3, cells: [0, 2, 3], buttonType: "center", winning: 3, stakeType: "TRE" },
            { id: 4, cells: [0, 2], buttonType: "vertical", winning: 5, stakeType: "A CAVALLO" },
            { id: 5, cells: [2, 3], buttonType: "horizontal", winning: 5, stakeType: "A CAVALLO" },
            { id: 6, cells: [2], buttonType: "self", winning: 11, stakeType: 'EN PLAIN' },
            { id: 7, cells: [0, 1, 2], buttonType: "center", winning: 3, stakeType: "TRE" },
            { id: 8, cells: [0, 1], buttonType: "vertical", winning: 5, stakeType: "A CAVALLO" },
            { id: 9, cells: [1, 2], buttonType: "horizontal", winning: 5, stakeType: "A CAVALLO" },
            { id: 10, cells: [1], buttonType: "self", winning: 11, stakeType: 'EN PLAIN' },
            { id: 11, cells: [3, 6], buttonType: "center", winning: 5, stakeType: "A CAVALLO" },
            { id: 12, cells: [3, 6], buttonType: "vertical", winning: 5, stakeType: "A CAVALLO" },
            { id: 13, cells: [6], buttonType: "self", winning: 11, stakeType: 'EN PLAIN' },
            { id: 14, cells: [2, 3, 5, 6], buttonType: "center", winning: 2, stakeType: "CARRÉ" },
            { id: 15, cells: [2, 5], buttonType: "vertical", winning: 5, stakeType: "A CAVALLO" },
            { id: 16, cells: [5, 6], buttonType: "horizontal", winning: 5, stakeType: "A CAVALLO" },
            { id: 17, cells: [5], buttonType: "self", winning: 11, stakeType: 'EN PLAIN' },
            { id: 18, cells: [1, 2, 4, 5], buttonType: "center", winning: 2, stakeType: "CARRÉ" },
            { id: 19, cells: [1, 4], buttonType: "vertical", winning: 5, stakeType: "A CAVALLO" },
            { id: 20, cells: [4, 5], buttonType: "horizontal", winning: 5, stakeType: "A CAVALLO" },
            { id: 21, cells: [4], buttonType: "self", winning: 11, stakeType: 'EN PLAIN' },
            { id: 22, cells: [6, 9], buttonType: "vertical", winning: 5, stakeType: "A CAVALLO" },
            { id: 23, cells: [9], buttonType: "self", winning: 11, stakeType: 'EN PLAIN' },
            { id: 24, cells: [5, 6, 8, 9], buttonType: "center", winning: 2, stakeType: "CARRÉ" },
            { id: 25, cells: [5, 8], buttonType: "vertical", winning: 5, stakeType: "A CAVALLO" },
            { id: 26, cells: [8, 9], buttonType: "horizontal", winning: 5, stakeType: "A CAVALLO" },
            { id: 27, cells: [8], buttonType: "self", winning: 11, stakeType: 'EN PLAIN' },
            { id: 28, cells: [4, 5, 7, 8], buttonType: "center", winning: 2, stakeType: "CARRÉ" },
            { id: 29, cells: [4, 7], buttonType: "vertical", winning: 5, stakeType: "A CAVALLO" },
            { id: 30, cells: [7, 8], buttonType: "horizontal", winning: 5, stakeType: "A CAVALLO" },
            { id: 31, cells: [7], buttonType: "self", winning: 11, stakeType: 'EN PLAIN' },
            { id: 32, cells: [9, 12], buttonType: "vertical", winning: 5, stakeType: "A CAVALLO" },
            { id: 33, cells: [12], buttonType: "self", winning: 11, stakeType: 'EN PLAIN' },
            { id: 34, cells: [8, 9, 12, 11], buttonType: "center", winning: 2, stakeType: "CARRÉ" },
            { id: 35, cells: [8, 11], buttonType: "vertical", winning: 5, stakeType: "A CAVALLO" },
            { id: 36, cells: [12, 11], buttonType: "horizontal", winning: 5, stakeType: "A CAVALLO" },
            { id: 37, cells: [11], buttonType: "self", winning: 11, stakeType: 'EN PLAIN' },
            { id: 38, cells: [7, 8, 10, 11], buttonType: "center", winning: 2, stakeType: "CARRÉ" },
            { id: 39, cells: [7, 10], buttonType: "vertical", winning: 5, stakeType: "A CAVALLO" },
            { id: 40, cells: [10, 11], buttonType: "horizontal", winning: 5, stakeType: "A CAVALLO" },
            { id: 41, cells: [10], buttonType: "self", winning: 11, stakeType: 'EN PLAIN' },

            // bottom sectors
            { id: 42, cells: [1, 2, 3, 4, 5, 6], buttonType: "self", winning: 1, stakeType: "MEZZA DOZZINA" },
            { id: 43, cells: [4, 5, 6, 7, 8, 9], buttonType: "self", winning: 1, stakeType: "MEZZA DOZZINA" },
            { id: 44, cells: [7, 8, 9, 10, 12, 11], buttonType: "self", winning: 1, stakeType: "MEZZA DOZZINA" },
            { id: 45, cells: [2, 4, 6, 8, 10, 12], buttonType: "self", winning: 1, stakeType: "ROSSO" },
            { id: 46, cells: [1, 3, 5, 7, 9, 11], buttonType: "self", winning: 1, stakeType: "NERO" },
            { id: 47, cells: [2, 4, 6, 8, 10, 12], buttonType: "self", winning: 1, stakeType: "PARI" },
            { id: 48, cells: [1, 3, 5, 7, 9, 11], buttonType: "self", winning: 1, stakeType: "DISPARI" },

            // right sectors
            { id: 49, cells: [3, 6, 9, 12], buttonType: "self", winning: 2, stakeType: "COLONNA" },
            { id: 50, cells: [2, 5, 8, 11], buttonType: "self", winning: 2, stakeType: "COLONNA" },
            { id: 51, cells: [1, 4, 7, 10], buttonType: "self", winning: 2, stakeType: "COLONNA" },

        ] // chips for id: 0, cells
    let bids = JSON.parse(localStorage.getItem('placedChips'))
    if (!bids || !bids[0]) return;
    let id = bids[0].place;

    buttonData.forEach(element => {
        if (element.id == id) {
            element.cells.forEach(el => {
                if (el == state.latest_result) {
                    state.money += bids[0].price;
                    state.you_win = 1;
                }
            });
            if (state.you_win == 0)
                state.you_win = 2;
        }
    });
};

export const stopRoulette = ({ commit, state }) => {
    commit("STOP_ROULETTE");
    if (state.mode === "autoStart-end-ready") {
        commit("SET_MODE", "autoStart-end");
    }
    if (state.mode === "auto-turbo-end-ready") {
        commit("SET_MODE", "auto-turbo-end");
    }
};

export const RESET_CURRENT_RESULT = (state) => {
    state.current_result = -1
};

export const resetCurrentResult = ({ commit }) => {
    commit("RESET_CURRENT_RESULT");
};

export const STOP_AUTO_PLAY = (state) => {
    state.stopAutoPlay$.next();
    state.stopAutoPlay$.complete();
}
export const stopAutoPlay = ({ commit }) => {
    commit("STOP_AUTO_PLAY");
}