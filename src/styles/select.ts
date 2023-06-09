import { StylesConfig } from 'react-select';
import { DefaultTheme } from 'styled-components';

export function renderReactSelectCSS(theme: DefaultTheme): StylesConfig {
  return {
    singleValue: (base, props) => ({
      ...base,
      color: `rgb(${theme.font})`
    }),
    control: (baseStyles, state) => ({
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
        color: `rgb(${theme.font})`
      }
    }),
    input: (baseStyles, state) => ({
      ...baseStyles,
      background: `rgba(${theme.background}, 0.07);`,
      color: `rgb(${theme.font})`,
      ':read-only': {
        color: `rgb(${theme.font})`
      },
      ':focus': {
        color: `rgb(${theme.font})`
      }
    }),
    placeholder: (baseStyles, state) => ({
      ...baseStyles,
      background: `rgba(${theme.background}, 0.07);`,
      color: `rgb(${theme.font})`,
      fontSize: '.9rem'
    }),
    menu: (baseStyles, state) => ({
      ...baseStyles,
      borderRadius: '10px',
      color: `rgb(${theme.font})`
    }),
    menuList: (baseStyles, state) => ({
      ...baseStyles,
      backgroundColor: `rgb(${theme.background});`,
      color: `rgb(${theme.font})`,
      fontSize: '.98rem',
      borderRadius: '10px',
      border: `none`,
      ':hover': {
        backgroundColor: `rgb(${theme.background});`
      }
    }),
    container: (baseStyles, state) => ({
      ...baseStyles,
      backgroundColor: `rgba(${theme.background}, 0.7);`,
      borderRadius: '10px',
      color: `rgb(${theme.font})`,
      ':focus': {
        border: ` 1px solid rgba(${theme.font}, 0.4);`,
        boxShadow: `0 0 25px rgba(${theme.accent}, 0.06);`
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
    })
  };
}
