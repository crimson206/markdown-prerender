import { JsonSyntax, TSSyntax } from "../DynamicRenderer"
import { HighlightDisplayComponent, ExampleDynamicComponent } from "./DynamicComponents"

export class MarkdownHolder{
    /** 
     * It uses {@link JsonSyntax} to inject {@link ExampleDynamicComponent}.
     * 
    */
    public getExample1 = () => markdownExample1

    /**
     * 
     * It uses {@link TSSyntax} to inject {@link HighlightDisplayComponent}.
     * 
     * The html in the content includes many `"`s, and it is problematic in the json syntax.\
     * It can be escaped in ts syntax easily.
     * 
     */
    public getExample2 = () => markdownExample2

    /**
     * It returns {@link getExample1}() + {@link getExample2}()
     * 
     * 
     */
    public getIntegrated = () => this.getExample1() + this.getExample2()
}


export const markdownExample1 = `
# MarkdownExample1

## Before Dynamic Rendered

Write your content as usual.

## Dynamic Rendered
\`\`\`json
{
    "type": "dynamicRenderer",
    "id": "dynamicComponent",
    "props": {
        "title": "Dynamic Counter and List",
        "initialCount": 5,
        "items": ["Item 1", "Item 2", "Item 3"]
    }
}
\`\`\`

## After Dynamic Rendered

Write your content as usual.

`

/**
 * Use {@link TSSyntax}
 * 
 * 
 */
export const markdownExample2 = `
# MarkdownExample2

## Static Component Rendered

\`\`\`ts
const spec = {
    type: "dynamicRenderer",
    id: "highlighted",
    props: {
        highlightedHTML: \`<div style="color: #cccccc;background-color: #1f1f1f;font-family: Consolas, 'Courier New', monospace;font-weight: normal;font-size: 14px;line-height: 19px;white-space: pre;"><div><span style="color: #cccccc;">{</span></div><div><span style="color: #cccccc;">&nbsp; &nbsp; </span><span style="color: #9cdcfe;">"compilerOptions"</span><span style="color: #cccccc;">: {</span></div><div><span style="color: #cccccc;">&nbsp; &nbsp; &nbsp; </span><span style="color: #9cdcfe;">"target"</span><span style="color: #cccccc;">: </span><span style="color: #ce9178;">"ES2022"</span><span style="color: #cccccc;">,</span></div><div><span style="color: #cccccc;">&nbsp; &nbsp; &nbsp; </span><span style="color: #9cdcfe;">"module"</span><span style="color: #cccccc;">: </span><span style="color: #ce9178;">"commonjs"</span><span style="color: #cccccc;">,</span></div><div><span style="color: #cccccc;">&nbsp; &nbsp; &nbsp; </span><span style="color: #9cdcfe;">"declaration"</span><span style="color: #cccccc;">: </span><span style="color: #569cd6;">true</span><span style="color: #cccccc;">,</span></div><div><span style="color: #cccccc;">&nbsp; &nbsp; &nbsp; </span><span style="color: #9cdcfe;">"outDir"</span><span style="color: #cccccc;">: </span><span style="color: #ce9178;">"./dist"</span><span style="color: #cccccc;">,</span></div><div><span style="color: #cccccc;">&nbsp; &nbsp; &nbsp; </span><span style="color: #9cdcfe;">"strict"</span><span style="color: #cccccc;">: </span><span style="color: #569cd6;">true</span><span style="color: #cccccc;">,</span></div><div><span style="color: #cccccc;">&nbsp; &nbsp; &nbsp; </span><span style="color: #9cdcfe;">"esModuleInterop"</span><span style="color: #cccccc;">: </span><span style="color: #569cd6;">true</span><span style="color: #cccccc;">,</span></div><div><span style="color: #cccccc;">&nbsp; &nbsp; &nbsp; </span><span style="color: #9cdcfe;">"types"</span><span style="color: #cccccc;">: [</span><span style="color: #ce9178;">"node"</span><span style="color: #cccccc;">, </span><span style="color: #ce9178;">"jest"</span><span style="color: #cccccc;">, </span><span style="color: #ce9178;">"@testing-library/jest-dom"</span><span style="color: #cccccc;">],</span></div><div><span style="color: #cccccc;">&nbsp; &nbsp; &nbsp; </span><span style="color: #9cdcfe;">"lib"</span><span style="color: #cccccc;">: [</span><span style="color: #ce9178;">"dom"</span><span style="color: #cccccc;">, </span><span style="color: #ce9178;">"dom.iterable"</span><span style="color: #cccccc;">, </span><span style="color: #ce9178;">"ES2022"</span><span style="color: #cccccc;">],</span></div><div><span style="color: #cccccc;">&nbsp; &nbsp; &nbsp; </span><span style="color: #9cdcfe;">"jsx"</span><span style="color: #cccccc;">: </span><span style="color: #ce9178;">"react-jsx"</span><span style="color: #cccccc;">,</span></div><div><span style="color: #cccccc;">&nbsp; &nbsp; &nbsp; </span><span style="color: #9cdcfe;">"resolveJsonModule"</span><span style="color: #cccccc;">: </span><span style="color: #569cd6;">true</span><span style="color: #cccccc;">,</span></div><div><span style="color: #cccccc;">&nbsp; &nbsp; },</span></div><div><span style="color: #cccccc;">&nbsp; &nbsp; </span><span style="color: #9cdcfe;">"include"</span><span style="color: #cccccc;">: [</span><span style="color: #ce9178;">"src"</span><span style="color: #cccccc;">],</span></div><div><span style="color: #cccccc;">&nbsp; &nbsp; </span><span style="color: #9cdcfe;">"exclude"</span><span style="color: #cccccc;">: [</span><span style="color: #ce9178;">"node_modules"</span><span style="color: #cccccc;">, </span><span style="color: #ce9178;">"**/__tests__/*"</span><span style="color: #cccccc;">]</span></div><div><span style="color: #cccccc;">&nbsp; }</span></div></div>\`
    }
}
\`\`\`

`