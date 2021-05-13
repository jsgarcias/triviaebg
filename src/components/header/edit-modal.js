import React, { useContext, useState, useRef, useEffect, useMemo } from 'react';
import ContentEditable from 'react-simple-contenteditable';
import TextFit from 'react-textfit';
import styled from 'styled-components';
import { isMobile } from 'react-device-detect';
import ColorPicker from './color-picker';

const Container = styled.div`
  transform: translateZ(1px);
  -webkit-transform: translateZ(1px);
  -webkit-transform-style: preserve-3d;
  #content-editable{
    text-align: ${({ hasNoContent }) => hasNoContent ? 'left' : 'center'}
    color: ${props => props.color};
    font-family: Poppins;
    font-weight: 800;
    text-transform: uppercase;
  }

  .done-action{
    color: white;
    font-family: 'Lilita One';
    font-weight: 800;
    font-size: 25px;
    cursor: pointer;
  }

  @media (min-width: 700px){
    .done-action{
      font-size: 30px;
    }
  }
`;
const setEndOfContentEditable = (contentEditableElement) => {
  let range, selection;
  if (document.createRange) {
    //Firefox, Chrome, Opera, Safari, IE 9+
    range = document.createRange(); //Create a range (a range is a like the selection but invisible)
    range.selectNodeContents(contentEditableElement); //Select the entire contents of the element with the range
    range.collapse(false); //collapse the range to the end point. false means collapse to end rather than the start
    selection = window.getSelection(); //get the selection object (allows you to change selection)
    selection.removeAllRanges(); //remove any selections already made
    selection.addRange(range); //make the range you have just created the visible selection
  } else if (document.selection) {
    //IE 8 and lower
    range = document.body.createTextRange(); //Create a range (a range is a like the selection but invisible)
    range.moveToElementText(contentEditableElement); //Select the entire contents of the element with the range
    range.collapse(false); //collapse the range to the end point. false means collapse to end rather than the start
    range.select(); //Select the range (make it the visible selection
  }
};

const defaultTitle = 'NAME 4 PIXAR ANIMATED MOVIES';

const EditModal = ({ setShowEditModal, placeholder = 'ENTER TITLE', showEditModal, appService, color, background }) => {
  const setDefaultTitle = (title) => {
    if(title === defaultTitle && isMobile) {
      return `NAME 4 PIXAR\nANIMATED MOVIES`;
    }
    return title;
  }

  const [content, setContent] = useState(setDefaultTitle(appService.title));
  const contentRef = useRef(null);
  useEffect(() => {
    let element = document.getElementById('content-editable');
    setTimeout(() => setEndOfContentEditable(element), 0);
    contentRef.current.elem.focus();
    window.dispatchEvent(new Event('resize'));
  }, []);
  useEffect(() => {
    if (!appService.isRemixing) {
      handleSave();
    }
  }, [appService.isRemixing]);
  useEffect(() => {
    let string = content;
    if (string[string.length - 1] === '\n') {
      string = string.slice(0, -1)
    }
    appService.onSetValue('title', string);
  }, [content])
  useEffect(() => {
    if (
      contentRef.current.elem.innerHTML === '<br>'
      || !contentRef.current.elem.innerHTML
      || contentRef.current.elem.innerHTML === ' '
      || contentRef.current.elem.innerHTML === '\n'
    ) {
      contentRef.current.elem.innerHTML = '';
    }
  }, [contentRef, content]);
  const handleSave = () => {
    setShowEditModal(false);
  };
  const handleSetContent = (e, value) => {
    if (!value || value === ' ' || value === '\n') {
      setContent('');
    } else {
      setContent(value);
    }
  };
  const getContent = useMemo(() => {
    if (!content || content === ' ' || content === '\n') {
      return ''
    } else {
      return content
    }
  }, [content])

  const onContainerTap = () => {
    if (isMobile) {
      contentRef.current.elem.blur();
      return;
    };

    if (!content) contentRef.current.elem.focus();
  };

  return (
    <Container
      fontFamily="Poppins"
      hasNoContent={(content.length === 1 && content[0] === '\n') || !content.length}
      className={'edit-modal-container'}
      color={appService.textColor}
      onClick={onContainerTap}
    >
      <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '10px', backgroundColor: 'black' }}>
        <div className={'done-action'} onClick={handleSave}>
          DONE
				</div>
      </div>
      <ColorPicker appService={appService} isModal={true} />
      <TextFit
        mode="multi"
        min={5}
        max={60}
        className={'text-fit'}
      >
        <ContentEditable
          ref={contentRef}
          id={'content-editable'}
          onClick={(e) => {
            e.stopPropagation();
            contentRef.current.elem.focus()
          }}
          placeholder={placeholder}
          contentEditable="plaintext-only"
          tagName="span"
          html={getContent}
          onChange={handleSetContent}
          onKeyPress={() => { }}
        />
      </TextFit>
      {/* <div onClick={handleSave} className={'done-button'}>
        <span style={{background: background, color: color}}>DONE</span>
      </div> */}
    </Container>
  );
};
export default EditModal;