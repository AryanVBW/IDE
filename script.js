
const tabs = document.querySelectorAll('.tab');
const editors = document.querySelectorAll('.editor');
const runButton = document.getElementById('run-button');
const outputIframe = document.getElementById('output-iframe');

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    const tabId = tab.dataset.tab;

    
    editors.forEach(editor => editor.classList.add('hidden'));
    document.getElementById(`${tabId}-editor`).classList.remove('hidden');

   
    tabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
  });
});

runButton.addEventListener('click', () => {
  const activeTab = document.querySelector('.tab.active').dataset.tab;

  if (activeTab === 'python') {
 
    const pythonCode = document.getElementById('python-editor').value;
    fetch('/run-python', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ code: pythonCode })
    })
    .then(response => response.json())
    .then(data => {
    
      outputIframe.contentDocument.body.textContent = data.output;
    });
  } else {
    
    const htmlCode = document.getElementById('html-editor').value;
    const cssCode = document.getElementById('css-editor').value;
    const jsCode = document.getElementById('js-editor').value;

    outputIframe.contentDocument.body.innerHTML = htmlCode;
    outputIframe.contentDocument.head.innerHTML = `<style>${cssCode}</style>`;
    outputIframe.contentWindow.eval(jsCode);
  }
});
