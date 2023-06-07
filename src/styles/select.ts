import { StylesConfig } from 'react-select';
import { DefaultTheme } from 'styled-components';

export function renderReactSelectCSS(theme: DefaultTheme): StylesConfig {
  return {
    control: (baseStyles, state) => ({
      ...baseStyles,
      borderRadius: '10px',
      border: ` 1px solid rgba(${theme.font}, 0.2);`,
      background: `rgba(${theme.background}, 0.07);`,
      ':focus': {
        border: ` 1px solid rgba(${theme.font}, 0.4);`,
        boxShadow: `0 0 20px rgba(${theme.accent}, 0.06);`
      },
      ':hover': {
        border: ` 1px solid rgba(${theme.font}, 0.4);`,
        boxShadow: `0 0 20px rgba(${theme.accent}, 0.06);`
      },
      ':read-only': {
        border: ` 1px solid rgba(${theme.font}, 0.4);`,
        boxShadow: `0 0 20px rgba(${theme.accent}, 0.06);`
      }
    }),
    input: (baseStyles, state) => ({
      ...baseStyles,
      background: `rgba(${theme.background}, 0.07);`,
      color: `rgb(${theme.font})`,

    }),
    placeholder: (baseStyles, state) => ({
      ...baseStyles,
      background: `rgba(${theme.background}, 0.07);`,
      color: `rgb(${theme.font})`,
      fontSize: '.9rem'
    }),
    menu: (baseStyles, state) => ({
      ...baseStyles,
      borderRadius: '10px'
    }),
    menuList: (baseStyles, state) => ({
      ...baseStyles,
      backgroundColor: `rgb(${theme.background});`,
      color: `rgb(${theme.font})`,
      fontSize: '.98rem',
      borderRadius: '10px',border: ` 1px solid rgba(${theme.font}, 0.2);`,
      ':hover': {
        backgroundColor: `rgb(${theme.background});`
      }
    }),
    container: (baseStyles, state) => ({
      ...baseStyles,
      backgroundColor: `rgba(${theme.background}, 0.7);`,      borderRadius: '10px',
      ':focus': {
        border: ` 1px solid rgba(${theme.font}, 0.4);`,
        boxShadow: `0 0 20px rgba(${theme.accent}, 0.06);`
      }
    }),
    valueContainer: (baseStyles, state) => ({
      ...baseStyles,
      color: `rgb(${theme.font})`,
      padding: '10px',
      borderRadius: '10px 0 0 10px'
    }),
    option: (baseStyles, state) => ({
      ...baseStyles,
      backgroundColor: `transparent`,
      color: `rgb(${theme.font})`,
      ':hover': {
        color: `rgb(${theme.neutral})`,
        backgroundColor: `rgb(${theme.primary_variant});`,
        cursor: 'pointer'
      }
    }),
   
  };
}
