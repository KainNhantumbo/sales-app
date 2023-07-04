import {
  BaseButton,
  BaseButtonOutline,
  Button_Mono_B,
  StyledInputs,
} from '../defaults';
import styled from 'styled-components';

export const SeachEngineContainer = styled.aside`
  width: 100%;
  max-width: 380px;
  position: relative;

  @media screen and (max-width: 830px) {
    z-index: 12000;
    position: fixed;
    width: 100vw;
    max-width: 100%;
    height: 100vh;
    background: rgba(${({ theme }) => theme.background}, 0.2);
    backdrop-filter: blur(2px);
    top: 0;
    left: 0;
    display: grid;
    place-content: center;
    user-select: none;
  }

  .wrapper-container {
    position: sticky;
    top: 90px;
    left: 0;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 25px;
    background: rgb(${({ theme }) => theme.foreground});
    padding: 10px 20px;
    border-radius: 12px;

    @media screen and (max-width: 830px) {
      position: relative;
      width: 400px;
      box-shadow: 0 0 25px rgba(${({ theme }) => theme.accent}, 0.08);
      border-radius: 12px;
      margin-bottom: -30px;
      padding-bottom: 40px;

      @media screen and (max-width: 430px) {
        width: 300px;
      }
    }

    * {
      ::selection {
        background: rgb(${({ theme }) => theme.background_variant});
        color: rgb(${({ theme }) => theme.primary_variant});
      }
    }

    .onDragCloseButton {
      width: 120px;
      height: 6px;
      background: rgb(${({ theme }) => theme.primary});
      position: absolute;
      top: 10px;
      left: calc(50% - 60px);
      z-index: 2200;
      border-radius: 10px;
      outline: none;
      border: none;
      cursor: grab;

      @media screen and (min-width: 830px) {
        display: none;
      }
    }

    .show-results-btn {
      ${BaseButton}
      background: rgb(${({ theme }) => theme.accent});
      color: rgb(${({ theme }) => theme.neutral});
      width: 280px;
      margin: 0 auto;
      border-radius: 30px;
      margin-bottom: 30px;

      :hover {
        background: rgb(${({ theme }) => theme.secondary});
      }

      @media screen and (min-width: 830px) {
        display: none;
      }
    }

    .header-container {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      gap: 10px;
      margin-top: 12px;

      h3 {
        display: flex;
        flex-direction: row;
        gap: 5px;
        flex-wrap: nowrap;
        align-items: center;
        color: rgb(${({ theme }) => theme.primary_variant});
        span {
          padding-left: 3px;
          font-size: 1.1rem;
          font-weight: 500;
          line-height: 1.6rem;
        }
      }

      button {
        ${BaseButtonOutline}
        color: rgb(${({ theme }) => theme.secondary});
      }
    }

    .form-container {
      width: 100%;
      display: flex;
      flex-direction: row;

      form {
        width: 100%;
        display: flex;
        align-items: center;
        gap: 10px;
        .form-element {
          position: relative;
          width: 100%;
          ${StyledInputs}

          svg {
            position: absolute;
            top: calc(50% - 10px);
            left: 10px;
            width: 20px;
            height: 20px;
            color: rgba(${({ theme }) => theme.font}, 0.5);
          }
        }

        button {
          ${Button_Mono_B}
          width: 41px;
          height: 41px;
          border: 1px solid rgba(${({ theme }) => theme.font}, 0.2);
        }
      }
    }

    .caret-container {
      display: flex;
      flex-direction: column;
      gap: 12px;

      h3 {
        display: flex;
        flex-direction: row;
        gap: 5px;
        flex-wrap: nowrap;
        align-items: center;

        span {
          padding-left: 3px;
        }
      }

      .price-range {
        ${StyledInputs}
        display: flex;
        gap: 10px;
        flex-direction: column;
        .prices {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          gap: 10px;
          align-items: center;
          margin-top: 12px;
        }
      }

      .rc-slider {
        position: relative;
        width: 100%;
        height: 20px;
        padding: 5px 0;
        margin: 8px 5px;
        border-radius: 6px;
        touch-action: none;
        box-sizing: border-box;
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
      }
      .rc-slider * {
        box-sizing: border-box;
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
      }
      .rc-slider-rail {
        position: absolute;
        width: 100%;
        height: 10px;
        background-color: rgb(${({ theme }) => theme.text});
        border-radius: 10px;
      }
      .rc-slider-track {
        position: absolute;
        height: 10px;
        background-color: rgb(${({ theme }) => theme.primary_variant});
        border-radius: 10px;
      }
      .rc-slider-track-draggable {
        z-index: 1;
        box-sizing: content-box;
        background-clip: content-box;
        border-top: 5px solid rgba(0, 0, 0, 0);
        border-bottom: 5px solid rgba(0, 0, 0, 0);
        transform: translateY(-5px);
      }
      .rc-slider-handle {
        position: absolute;
        width: 20px;
        height: 20px;
        margin-top: -5px;
        background-color: rgb(${({ theme }) => theme.foreground});
        border: solid 2px rgb(${({ theme }) => theme.primary_variant});
        border-radius: 50%;
        cursor: -webkit-grab;
        cursor: grab;
        touch-action: pan-x;
      }
      .rc-slider-handle-dragging.rc-slider-handle-dragging.rc-slider-handle-dragging {
        border-color: rgb(${({ theme }) => theme.primary});
        box-shadow: 0 0 0 5px rgba(${({ theme }) => theme.primary}, 0.6);
      }
      .rc-slider-handle:focus {
        outline: none;
        box-shadow: none;
      }
      .rc-slider-handle:focus-visible {
        border-color: rgb(${({ theme }) => theme.primary});
        box-shadow: 0 0 0 3px #96dbfa;
      }
      .rc-slider-handle-click-focused:focus {
        border-color: #96dbfa;
        box-shadow: unset;
      }
      .rc-slider-handle:hover {
        border-color: rgb(${({ theme }) => theme.primary});
      }
      .rc-slider-handle:active {
        border-color: rgb(${({ theme }) => theme.primary});
        box-shadow: 0 0 5px rgb(${({ theme }) => theme.primary});
        cursor: -webkit-grabbing;
        cursor: grabbing;
      }
      .rc-slider-mark {
        position: absolute;
        top: 18px;
        left: 0;
        width: 100%;
        font-size: 12px;
      }
      .rc-slider-mark-text {
        position: absolute;
        display: inline-block;
        color: #999;
        text-align: center;
        vertical-align: middle;
        cursor: pointer;
      }
      .rc-slider-mark-text-active {
        color: #666;
      }
      .rc-slider-step {
        position: absolute;
        width: 100%;
        height: 4px;
        background: transparent;
      }
      .rc-slider-dot {
        position: absolute;
        bottom: -2px;
        width: 8px;
        height: 8px;
        vertical-align: middle;
        background-color: #fff;
        border: 2px solid #e9e9e9;
        border-radius: 50%;
        cursor: pointer;
      }
      .rc-slider-dot-active {
        border-color: #96dbfa;
      }
      .rc-slider-dot-reverse {
        margin-right: -4px;
      }
      .rc-slider-disabled {
        background-color: #e9e9e9;
      }
      .rc-slider-disabled .rc-slider-track {
        background-color: #ccc;
      }
      .rc-slider-disabled .rc-slider-handle,
      .rc-slider-disabled .rc-slider-dot {
        background-color: #fff;
        border-color: #ccc;
        box-shadow: none;
        cursor: not-allowed;
      }
      .rc-slider-disabled .rc-slider-mark-text,
      .rc-slider-disabled .rc-slider-dot {
        cursor: not-allowed !important;
      }
      .rc-slider-vertical {
        width: 14px;
        height: 100%;
        padding: 0 5px;
      }
      .rc-slider-vertical .rc-slider-rail {
        width: 4px;
        height: 100%;
      }
      .rc-slider-vertical .rc-slider-track {
        bottom: 0;
        left: 5px;
        width: 4px;
      }
      .rc-slider-vertical .rc-slider-track-draggable {
        border-top: 0;
        border-bottom: 0;
        border-right: 5px solid rgba(0, 0, 0, 0);
        border-left: 5px solid rgba(0, 0, 0, 0);
        transform: translateX(-5px);
      }
      .rc-slider-vertical .rc-slider-handle {
        margin-top: 0;
        margin-left: -5px;
        touch-action: pan-y;
      }
      .rc-slider-vertical .rc-slider-mark {
        top: 0;
        left: 18px;
        height: 100%;
      }
      .rc-slider-vertical .rc-slider-step {
        width: 4px;
        height: 100%;
      }
      .rc-slider-vertical .rc-slider-dot {
        margin-left: -2px;
      }
      .rc-slider-tooltip-zoom-down-enter,
      .rc-slider-tooltip-zoom-down-appear {
        display: block !important;
        animation-duration: 0.3s;
        animation-fill-mode: both;
        animation-play-state: paused;
      }
    }
  }
`;
