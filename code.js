let htmlEditor = CodeMirror(document.querySelector(".col-lg-4 .html-code"), {
    lineNumbers: true,
    tabSize: 4,
    mode: {name: "htmlmixed", globalVars: true},
    foldGutter: true,
    scrollbarStyle: "simple",
    gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
    matchBrackets: true,
    autoCloseTags: true,
    styleActiveLine: true,
    gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter", "CodeMirror-lint-markers"],
    lint: true,
    extraKeys: {
        "F11": function(cm) {
          cm.setOption("fullScreen", !cm.getOption("fullScreen"));
        },
        "Esc": function(cm) {
          if (cm.getOption("fullScreen")) cm.setOption("fullScreen", false);
        },
        "Alt-F": "findPersistent",
        "Ctrl-Space": "autocomplete",
      },
    name: "htmlmixed",
    tags: {
      style: [["type", /^text\/(x-)?scss$/, "text/x-scss"],
              [null, null, "css"]],
      custom: [[null, null, "customMode"]]
      },
});

let cssEditor = CodeMirror(document.querySelector(".col-lg-4 .css-code"), {
    lineNumbers: true,
    tabSize: 4,
    mode: {name: "css", globalVars: true},
    foldGutter: true,
    scrollbarStyle: "simple",
    matchBrackets: true,
    autoCloseBrackets: true,
    styleActiveLine: true,
    gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter", "CodeMirror-lint-markers"],
    lint: true,
    extraKeys: {
        "F11": function(cm) {
          cm.setOption("fullScreen", !cm.getOption("fullScreen"));
        },
        "Esc": function(cm) {
          if (cm.getOption("fullScreen")) cm.setOption("fullScreen", false);
        },
        "Alt-F": "findPersistent",
        "Ctrl-Space": "autocomplete",
      }
});

let jsEditor = CodeMirror(document.querySelector(".col-lg-4 .js-code"), {
    lineNumbers: true,
    tabSize: 4,
    mode: {name: "javascript", globalVars: true},
    foldGutter: true,
    lineWrapping: true,
    scrollbarStyle: "simple",
    matchBrackets: true,
    autoCloseBrackets: true,
    styleActiveLine: true,
    gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter", "CodeMirror-lint-markers"],
    lint: true,
    extraKeys: {
        "F11": function(cm) {
          cm.setOption("fullScreen", !cm.getOption("fullScreen"));
        },
        "Esc": function(cm) {
          if (cm.getOption("fullScreen")) cm.setOption("fullScreen", false);
        },
        "Alt-F": "findPersistent",
        "Ctrl-Space": "autocomplete",
      }
});

var input = document.getElementById("select");

  function selectTheme() {
    var theme = input.options[input.selectedIndex].textContent;
    htmlEditor.setOption("theme", theme);
    cssEditor.setOption("theme", theme);
    jsEditor.setOption("theme", theme);
    location.hash = "#" + theme;
  }
  
  var choice = (location.hash && location.hash.slice(1)) ||
               (document.location.search &&
                decodeURIComponent(document.location.search.slice(1)));
  if (choice) {
    input.value = choice;
    htmlEditor.setOption("theme", choice);
    cssEditor.setOption("theme", theme);
    jsEditor.setOption("theme", theme);
  }
  
  CodeMirror.on(window, "hashchange", function() {
    var theme = location.hash.slice(1);
    if (theme) { input.value = theme; selectTheme(); }
  });


document.querySelector("#save-btn").addEventListener("click", function() {
  var htmlText = "index.html";
  let cssText = "style.css";
  let jsText = "code.js";

  let folder = "G-Project";

  let htmlFile = htmlEditor.getValue();
  let cssFile = cssEditor.getValue();
  let jsFile = jsEditor.getValue();

  let zip = new JSZip();
  zip.folder(folder).file(htmlText,htmlFile);
  zip.folder(folder).file(cssText, cssFile);
  zip.folder(folder).file(jsText, jsFile);

  zip.generateAsync({type:"blob"})
    .then(function(content) {
    saveAs(content, "G-Project.zip");
  });
});

document.querySelector("#run-btn").addEventListener("click", function() {
  let htmlCode = htmlEditor.getValue();
  let cssCode = "<style>" + cssEditor.getValue() + "</style>";
  console.log(htmlEditor.getValue());
  let jsCode = "<scri" + "pt>" + jsEditor.getValue() + "</scri" +"pt>";
  //Generally most of the browsers prevent injection of script using script tag. 
  //It’s just loop hole to prevent blocking of script injection.
  let previewWindow = document.querySelector("#preview-window").contentWindow.document;
  previewWindow.open();
  previewWindow.write(htmlCode + cssCode + jsCode);
  previewWindow.close();
});


//Page Pre-Loader

let loader = document.getElementById("preloader");  

window.addEventListener("load", function() {
  loader.style.display = "none";
});


//Page Pre-Loader


//Help MODAL

// Get DOM Elements
const modalHelp = document.querySelector('#my-help-modal');
const modalHelpBtn = document.querySelector('#help-btn');
const closeHelpBtn = document.querySelector('.closeHelp');

// Events
modalHelpBtn.addEventListener('click', openHelpModal);
closeHelpBtn.addEventListener('click', closeHelpModal);
window.addEventListener('click', outsideHelpClick);

// Open
function openHelpModal() {
  modalHelp.style.display = 'block';
}

// Close
function closeHelpModal() {
  modalHelp.style.display = 'none';
}

// Close If Outside Click
function outsideHelpClick(e) {
  if (e.target == modalHelp) {
    modalHelp.style.display = 'none';
  }
}

//Help MODAL





//About Modal

// Get DOM Elements
const modalAbout = document.querySelector('#my-about-modal');
const modalAboutBtn = document.querySelector('#about-btn');
const closeBtnAbout = document.querySelector('.closeAbout');

// Events
modalAboutBtn.addEventListener('click', openAboutModal);
closeBtnAbout.addEventListener('click', closeAboutModal);
window.addEventListener('click', outsideAboutClick);

// Open
function openAboutModal() {
  modalAbout.style.display = 'block';
}

// Close
function closeAboutModal() {
  modalAbout.style.display = 'none';
}

// Close If Outside Click
function outsideAboutClick(e) {
  if (e.target == modalAbout) {
    modalAbout.style.display = 'none';
  }
}

//About Modal

