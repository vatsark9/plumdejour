import { marked } from "marked";

function MarkdownRenderer({ content, className = "" }) {
  const renderMarkdown = (markdown) => {
    try {
      const html = marked.parse(markdown);
      return { __html: html };
    } catch (error) {
      return { __html: `<pre>${markdown}</pre>` };
    }
  };

  return (
    <div
      className={`markdown-content ${className}`}
      dangerouslySetInnerHTML={renderMarkdown(content)}
    />
  );
}

export default MarkdownRenderer;
