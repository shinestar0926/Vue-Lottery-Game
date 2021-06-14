const state = {
    num_count: 13, // Roulette number count
    money: 3500, // Startup money
    moneyStaked: 0, // Total of money staked
    number: 0,
    you_win: 0,
    winsArr: [], // Wins array
    winTot: 0, // Win total
    autoCount: 0,

    max_win: 10000, // Max win
    historyArr: new Array(12), // History
    placedChips: [], // placed chips data [{place, price}]
    finished_num: 0, // Finished number
    bg_audio_disabled: false, // Mute background audio
    effect_audio_disabled: false, // Mute effect audio
    bg_audio_volume: 1,
    effect_audio_volume: 1,

    audio_bg: new Audio(require("../assets/sounds/music-bitsnbites-liver.mp3")),
    kickSound1: new Audio(require("../assets/sounds/CasinoChips PE1097101.mp3")),
    kickSound2: new Audio(require("../assets/sounds/CasinoChips SE040304-v1.mp3")),
    kickSound3: new Audio(require("../assets/sounds/RouletteWheelSpinn PE147501_includingIdle_v2.mp3")),

    is_turning: false, // Turning flag
    turning_duration: 2, // Turning Duration
    delay: 1, // turning Delay

    mode: "normalSpin", // normalSpin or autoStart
    turning_speed: 300, // Turning Speed
    turning_deg: 0, // Turning Deg
    wheel_numbers: [9, 2, 7, 6, 12, 4, 0, 5, 11, 3, 10, 1, 8],
    wheel_colors: [
        "#D60015",
        "#000000",
        "#D60015",
        "#000000",
        "#D60015",
        "#000000",
        "#19ED14",
        "#D60015",
        "#000000",
        "#D60015",
        "#000000",
        "#D60015",
        "#000000",
    ],
    latest_result: -1, // Latest Result
    current_result: -1, // Current Result
    drag: false, // Is Dragging
    dragPrice: 0, // Dragging Chip Price


    //By Yulia
    sync_offset: 0, // default offset on number array to get correct result when stopping spinning
    random_rotation_index: 1, // random scss selection index with "_"
    random_rotation_range: 4, // max range value for wheel random rotation (we can chane it from 1 to 4)
    ball_duration: 1000,
    lackofMoneyForBetting: false,
    disableRepeatbutton: false,

    stopAutoPlay$: null, //rxjs subject which stops auto play

    deviceWidth: 0, //height of the device
    deviceHeight: 0, //width of the device

    didFullyLoad: false //check if all images are loaded
};

state.kickSound1.volume = 0;
state.kickSound2.volume = 0;
state.kickSound3.volume = 0;
// localStorage.removeItem('placedChips')
export default state;