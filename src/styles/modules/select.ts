import type { StylesConfig } from 'react-select';
import type { DefaultTheme } from 'styled-components';

export function selectStyles(theme: DefaultTheme): StylesConfig {
  return {
    singleValue: (base) => ({ ...base, color: `rgb(${theme.font})` }),
    control: (baseStyles) => ({
      ...baseStyles,
      borderRadius: '10px',
      border: ` 1px solid rgba(${theme.font}, 0.1);`,
      background: `rgba(${theme.background}, 0.07);`,
      color: `rgb(${theme.font})`,
      ':focus': {
        border: ` 1px solid rgba(${theme.font}, 0.15);`,
        boxShadow: `0 0 20px rgba(${theme.black}, 0.08);`
      },
      ':hover': {
        border: ` 1px solid rgba(${theme.font}, 0.15);`,
        boxShadow: `0 0 20px rgba(${theme.black}, 0.1);`
      },
      ':read-only': {
        border: ` 1px solid rgba(${theme.font}, 0.15);`,
        boxShadow: `inset 0 0 5px rgba(${theme.font}, 0.01);`,
        color: `rgb(${theme.font})`
      }
    }),
    input: (baseStyles) => ({
      ...baseStyles,
      borderRadius: '10px',
      background: `rgba(${theme.background}, 0.07);`,
      color: `rgb(${theme.font})`,
      ':read-only': {
        color: `rgb(${theme.font})`
      },
      ':focus': {
        color: `rgb(${theme.font})`
      }
    }),
    placeholder: (baseStyles) => ({
      ...baseStyles,
      borderRadius: '10px',
      background: `rgba(${theme.background}, 0.07);`,
      color: `rgb(${theme.font})`,
      fontSize: '.9rem',
      lineHeight: '1.6rem'
    }),
    menu: (baseStyles) => ({
      ...baseStyles,
      borderRadius: '10px',
      color: `rgb(${theme.font})`
    }),
    menuList: (baseStyles) => ({
      ...baseStyles,
      backgroundColor: `rgb(${theme.background});`,
      color: `rgb(${theme.font})`,
      fontSize: '.9rem',
      lineHeight: '1.6rem',
      borderRadius: '10px',
      border: `none`,
      ':hover': {
        backgroundColor: `rgb(${theme.background});`
      }
    }),
    container: (baseStyles) => ({
      ...baseStyles,
      backgroundColor: `rgba(${theme.background}, 0.7);`,
      borderRadius: '10px',
      color: `rgb(${theme.font})`,
      ':focus': {
        border: ` 1px solid rgba(${theme.font}, 0.4);`,
        boxShadow: `0 0 25px rgba(${theme.black}, 0.08);`
      }
    }),
    valueContainer: (baseStyles) => ({
      ...baseStyles,
      color: `rgb(${theme.font})`,
      padding: '5px 10px',
      borderRadius: '5px 0 0 5px',
      fontSize: '.9rem',
      lineHeight: '1.6rem'
    }),
    option: (baseStyles) => ({
      ...baseStyles,
      backgroundColor: `transparent`,
      color: `rgb(${theme.font})`,
      ':hover': {
        color: `rgb(${theme.white})`,
        backgroundColor: `rgb(${theme.primary_shade});`,
        cursor: 'pointer'
      }
    })
  };
}
