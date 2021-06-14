export const RESIZE_WINDOW = (state, { width, height }) => {
    state.deviceWidth = width;
    state.deviceHeight = height;
};

export const resizeWindow = (context, { width, height }) => {
    context.commit("RESIZE_WINDOW", { width, height });
};
