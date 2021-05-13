const hideKeyboard = () => {
  document.activeElement.blur();
}

const scrollTop = () => {
  window.scrollTo(0,0);
}

const setEndOfContentEditable = (contentEditableElement) => {
  if (typeof contentEditableElement.createTextRange != "undefined") {
    contentEditableElement.focus();
    let range = contentEditableElement.createTextRange();
    range.collapse(false);
    range.select();
  }
};

const createRange = (node, chars, range) => {
    if (!range) {
        range = document.createRange()
        range.selectNode(node);
        range.setStart(node, 0);
    }
    if (chars.count === 0) {
        range.setEnd(node, chars.count);
    } else if (node && chars.count >0) {
        if (node.nodeType === Node.TEXT_NODE) {
            if (node.textContent.length < chars.count) {
                chars.count -= node.textContent.length;
            } else {
                 range.setEnd(node, chars.count);
                 chars.count = 0;
            }
        } else {
            for (var lp = 0; lp < node.childNodes.length; lp++) {
                range = createRange(node.childNodes[lp], chars, range);
                if (chars.count === 0) {
                   break;
                }
            }
        }
   } 
   return range;
};

const setCurrentCursorPosition = (chars, el) => {
    if (chars >= 0) {
        var selection = window.getSelection();
        range = createRange(el.parentNode, { count: chars });
        if (range) {
            range.collapse(false);
            selection.removeAllRanges();
            selection.addRange(range);
        }
    }
};

const formatSpaces = (str, remix) => {
  if(!remix) return (str || '').toString().replace(/<[^>]*(>|$)|&nbsp;|&amp;|&zwnj;|&raquo;|&laquo;|&gt;/g, ' ').replace(/\s\s+/g, ' ');
  return (str || '').toString().replace(/\s\s+/g, ' ');
}

export {
  hideKeyboard,
  scrollTop,
  setEndOfContentEditable,
  setCurrentCursorPosition,
  formatSpaces,
}