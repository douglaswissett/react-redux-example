import { css } from 'styled-components'

export const sizes = {
  xxlarge: 1600,
  xlarge: 1440,
  large: 1170,
  desktop: 992,
  tablet: 769,
  phone: 576
}

// iterate through the sizes and create a media template
export const media = Object.keys(sizes).reduce((accumulator, label) => {
  // use em in breakpoints to work properly cross-browser and support users
  // changing their browsers font-size: https://zellwk.com/blog/media-query-units/
  const emSize = sizes[label] / 16
  accumulator[label] = (...args) => css`
    @media (max-width: ${emSize}em) {
      ${css(...args)}
    }
  `
  return accumulator
}, {})
