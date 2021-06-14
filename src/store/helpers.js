import state from "./initialState";

export const getRandomInt = (min, max) => {

    state.random_rotation_index = Math.floor(Math.random()) + 1;

    return Math.floor(Math.random() * (max - min + 1)) + min;

}

export const getRouletteResult = (deg, array) => {

    let offset = ((deg % 360) / (360 / state.num_count));
    offset = state.num_count - Math.round(offset);
    let arrayHead = array.slice(0, offset);
    let arrayTail = array.slice(offset);
    array = arrayTail.concat(arrayHead);

    let number_index = 9 - state.sync_offset;
    // console.log('Roulette Result: ', array[number_index]);

    return array[number_index];
    // return array[9];
}