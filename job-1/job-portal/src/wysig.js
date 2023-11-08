import React, { useState } from 'react';
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const WysiwygEditor = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const onEditorStateChange = (newEditorState) => {
    setEditorState(newEditorState);
  };

  const convertContentToHTML = () => {
    const contentState = editorState.getCurrentContent();
    const rawContentState = convertToRaw(contentState);
    const markup = convertRawToHTML(rawContentState);
    console.log(markup);
  };

  const convertRawToHTML = (rawContentState) => {
    // Implement your own logic to convert raw content state to HTML markup
    // This can be done using libraries like draft-js-export-html or custom functions
    // For simplicity, let's assume it is already implemented
    return "<div>Converted HTML</div>";
  };

  return (
    <div>
      <Editor
        editorState={editorState}
        onEditorStateChange={onEditorStateChange}
      />
      <button onClick={convertContentToHTML}>Convert to HTML</button>
    </div>
  );
};

export default WysiwygEditor;
