import React from 'react';
import {createGlobalStyle} from 'styled-components';

const StudioLayoutFixes = createGlobalStyle`
  @media (min-width: 900px) {
    /* Let the final Structure pane use the rest of a wide screen. */
    [data-ui='PaneLayout'] > [data-pane-index]:not(:has(~ [data-pane-index])) {
      flex: 1 1 auto !important;
      max-width: none !important;
    }
  }
`;

export default function StudioLayout(props) {
  return (
    <>
      <StudioLayoutFixes />
      {props.renderDefault(props)}
    </>
  );
}
