import React from 'react';
import { useDynamicComponents } from './prerender/useDynamicComponents';
import { processDynamicComponents } from './prerender/DynamicRenderer';
import ExampleDynamicComponent, {HighlightDisplayComponent} from './prerender/examples/DynamicComponents';
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import markdownRaw from './prerender/examples/markdown.md?raw'

const markdownString = `
# Title

Any Context
`

export const MyPackage  = () => {


  const dynamicRenderResult = processDynamicComponents(
    markdownRaw,
    [
        {id:'dynamicComponent', Component: ExampleDynamicComponent},
        {id:'highlighted', Component: HighlightDisplayComponent}
    ]
    )

  useDynamicComponents(
    dynamicRenderResult.componentPairs
  ) 


  return (
    <div className="MyPackage">
      <ReactMarkdown
        rehypePlugins={[rehypeRaw]}
      >{dynamicRenderResult.transformedContent}</ReactMarkdown>
    </div>
  );
}

export default MyPackage;
