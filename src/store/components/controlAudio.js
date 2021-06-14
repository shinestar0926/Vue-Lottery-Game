const repeatBgAudio = (state) => {
  state.audio_bg.addEventListener(
    "ended",
    function () {
      state.audio_bg.currentTime = 0;
      state.audio_bg.play();
    },
    false
  );
}
export const CONTROL_AUDIO = (state, {type, volume}) => {
  if (type === 'background') {
    state.bg_audio_volume = volume / 100;
    state.audio_bg.volume = volume / 100;
    if (volume <= 0) {
      state.bg_audio_disabled = true;
      state.audio_bg.pause();
    } else {
      state.bg_audio_disabled = false;
      state.audio_bg.play();
      repeatBgAudio(state);
    }
  } else if (type === 'effect'){
    state.effect_audio_volume = volume / 100;
    state.effect_audio_disabled = volume <= 0;
    state.kickSound3.volume = volume / 100;
    state.kickSound2.volume = volume / 100;
    state.kickSound1.volume = volume / 100;
  } else {
    state.audio_bg.volume = state.bg_audio_volume;
    state.bg_audio_disabled = false;
    state.audio_bg.play();
    repeatBgAudio(state);

    state.effect_audio_disabled =false;
    state.kickSound3.volume = state.effect_audio_volume;
    state.kickSound2.volume = state.effect_audio_volume;
    state.kickSound1.volume = state.effect_audio_volume;
  }
};

export const controlAudio = (context, { type, volume }) => {
  context.commit("CONTROL_AUDIO", {type, volume});
};
