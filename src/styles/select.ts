import { StylesConfig } from 'react-select';
import { DefaultTheme } from 'styled-components';

export function renderReactSelectCSS(theme: DefaultTheme): StylesConfig {
  return {
    singleValue: (base) => ({
      ...base,
      color: `rgb(${theme.font})`,
    }),
    control: (baseStyles) => ({
      ...baseStyles,
      borderRadius: '10px',
      border: ` 1px solid rgba(${theme.accent}, 0.05);`,
      background: `rgba(${theme.background}, 0.07);`,
      color: `rgb(${theme.font})`,
      ':focus': {
        border: ` 1px solid rgba(${theme.accent}, 0.15);`,
        boxShadow: `0 0 20px rgba(${theme.accent}, 0.05);`,
      },
      ':hover': {
        border: ` 1px solid rgba(${theme.accent}, 0.15);`,
        boxShadow: `0 0 20px rgba(${theme.accent}, 0.1);`,
      },
      ':read-only': {
        border: ` 1px solid rgba(${theme.accent}, 0.05);`,
        boxShadow: `0 0 20px rgba(${theme.accent}, 0.02);`,
        color: `rgb(${theme.font})`,
      },
    }),
    input: (baseStyles) => ({
      ...baseStyles,
      background: `rgba(${theme.background}, 0.07);`,
      color: `rgb(${theme.font})`,
      ':read-only': {
        color: `rgb(${theme.font})`,
      },
      ':focus': {
        color: `rgb(${theme.font})`,
      },
    }),
    placeholder: (baseStyles) => ({
      ...baseStyles,
      background: `rgba(${theme.background}, 0.07);`,
      color: `rgb(${theme.font})`,
      fontSize: '.9rem',
    }),
    menu: (baseStyles) => ({
      ...baseStyles,
      borderRadius: '10px',
      color: `rgb(${theme.font})`,
    }),
    menuList: (baseStyles) => ({
      ...baseStyles,
      backgroundColor: `rgb(${theme.background});`,
      color: `rgb(${theme.font})`,
      fontSize: '.98rem',
      borderRadius: '10px',
      border: `none`,
      ':hover': {
        backgroundColor: `rgb(${theme.background});`,
      },
    }),
    container: (baseStyles) => ({
      ...baseStyles,
      backgroundColor: `rgba(${theme.background}, 0.7);`,
      borderRadius: '10px',
      color: `rgb(${theme.font})`,
      ':focus': {
        border: ` 1px solid rgba(${theme.font}, 0.4);`,
        boxShadow: `0 0 25px rgba(${theme.accent}, 0.06);`,
      },
    }),
    valueContainer: (baseStyles) => ({
      ...baseStyles,
      color: `rgb(${theme.font})`,
      padding: '10px',
      borderRadius: '10px 0 0 10px',
    }),
    option: (baseStyles) => ({
      ...baseStyles,
      backgroundColor: `transparent`,
      color: `rgb(${theme.font})`,
      ':hover': {
        color: `rgb(${theme.neutral})`,
        backgroundColor: `rgb(${theme.primary_variant});`,
        cursor: 'pointer',
      },
    }),
  };
}
