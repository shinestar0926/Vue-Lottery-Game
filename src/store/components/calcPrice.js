// import { uuid } from 'vue-uuid'; 

const moneyLeft = ({ money, placedChips }) => {
  if (!placedChips) return money;
  const sum = placedChips.map((el) => el.price).reduce((a, b) => a + b, 0);
  return money - sum;
};

const checkMaxStakePossible = ({ money, placedChips }) => {
  if (!placedChips) return money;
  return placedChips.map((el) => el.price).reduce((a, b) => a + b, 0);
};

const totalWinCheck = ({ money, max_win, placedChips }) => {
  if (!placedChips) return money;
  let sum = placedChips.map((el) => el.price * el.winning).reduce((a, b) => a + b, 0);
  return sum > max_win
};

export const PLACE_CHIP = (state, { place, price, winning, stakeType, key }) => {

  if (moneyLeft(state) < price) return false;

  state.disableRepeatbutton = false;//By Yulia, enable the repeat button once starting PLACE_CHIP
  
  if (
    state.placedChips &&
    state.placedChips.find(({ place: orgP }) => orgP === place)
  ) {
    state.kickSound1.currentTime = 0;
    state.kickSound1.play();
  } else {
    state.kickSound2.currentTime = 0;
    state.kickSound2.play();
  }
  state.placedChips.push({ place, price, winning, stakeType, key });


  if (checkMaxStakePossible(state) > 100) {
    return
    // alert('Massima giocata consentita: 100 €')
    // CANCEL_LAST(state)
    // return
  }

  if (totalWinCheck(state)) {
    alert('La vincita massima consentita è 10000€')
    CANCEL_LAST(state)
    return
  }
};

export const placeChip = (context, { place, price, winning, stakeType, key }) => {
  context.commit("PLACE_CHIP", { place, price, winning, stakeType, key });
};

export const SET_CHIPS = (state, { chips }) => {
  if(!chips) return;
  const price = chips.map( c => c.price ).reduce( (a, b) => a + b, 0)
  if (moneyLeft(state) < price) return;
  state.placedChips = [...chips]
};

export const setChips = (context, { chips }) => {
  context.commit("SET_CHIPS", { chips });
};

export const CANCEL_LAST = (state) => {
  state.placedChips.pop();
};

export const cancelLast = (context) => {
  context.commit("CANCEL_LAST");
};

export const CLEAR_ALL = (state) => {
  state.placedChips.splice(0, state.placedChips.length);
};
export const clearAll = (context) => {
  context.commit("CLEAR_ALL");
};

export const DOUBLE_CHIP = (state) => {
  const leftMoney = moneyLeft(state);
  if (leftMoney < state.money - leftMoney) return;
  state.placedChips.push(...state.placedChips);
};

export const doubleChip = (context) => {
  context.commit("DOUBLE_CHIP");
};

export const REFRESH_AVAILABLE_MONEY = (state) => {
  state.money = state.money - state.moneyStaked;
};

export const refreshAvailableMoney = (context) => {
  context.commit("REFRESH_AVAILABLE_MONEY");
};

