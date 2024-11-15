import { useEffect } from 'react';
import { hydrateRoot } from 'react-dom/client';
import { ComponentPair } from './DynamicRenderer';


export const useDynamicComponents = (components: ComponentPair[]) => {
  useEffect(() => {
    components.forEach(({ id, useComponent }) => {
      const container = document.getElementById(id);
      if (container) {
        hydrateRoot(container, useComponent());
      }
    });
  }, [components]);
};
