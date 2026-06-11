* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background: #0d1117;
    color: #c9d1d9;
    overflow: hidden;
    height: 100vh;
}

.ide-container {
    display: flex;
    flex-direction: column;
    height: 100vh;
}

/* Top Bar */
.top-bar {
    background: linear-gradient(135deg, #161b22, #1f2937);
    border-bottom: 2px solid #58a6ff;
    padding: 12px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: 0 4px 20px rgba(88, 166, 255, 0.3);
}

.logo {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 20px;
    font-weight: bold;
    color: #58a6ff;
}

.logo-icon {
    font-size: 24px;
}

.language-selector select {
    background: rgba(88, 166, 255, 0.1);
    border: 2px solid #58a6ff;
    color: #58a6ff;
    padding: 8px 16px;
    border-radius: 8px;
    font-size: 14px;
    cursor: pointer;
    outline: none;
}

.action-buttons {
    display: flex;
    gap: 12px;
}

.btn-run, .btn-preview {
    background: linear-gradient(135deg, #238636, #2ea043);
    border: none;
    color: white;
    padding: 10px 24px;
    border-radius: 8px;
    font-size: 14px;
    font-weight: bold;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 8px;
    transition: all 0.3s;
    box-shadow: 0 4px 12px rgba(46, 160, 67, 0.4);
}

.btn-preview {
    background: linear-gradient(135deg, #58a6ff, #1f6feb);
    box-shadow: 0 4px 12px rgba(88, 166, 255, 0.4);
}

.btn-run:hover, .btn-preview:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(46, 160, 67, 0.6);
}

/* Main Area */
.main-area {
    display: flex;
    flex: 1;
    overflow: hidden;
}

.editor-panel, .preview-panel {
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;
}

.panel-header {
    background: rgba(88, 166, 255, 0.1);
    padding: 10px 16px;
    border-bottom: 1px solid rgba(88, 166, 255, 0.3);
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 14px;
    font-weight: 600;
    color: #58a6ff;
}

.file-name {
    color: #8b949e;
    font-size: 12px;
}

.status {
    color: #3fb950;
    font-size: 12px;
}

/* Code Editor */
.CodeMirror {
    height: calc(100% - 40px);
    font-size: 14px;
    line-height: 1.6;
}

/* Preview */
.preview-container {
    flex: 1;
    background: white;
    position: relative;
}

#previewFrame {
    width: 100%;
    height: 100%;
    border: none;
    background: white;
}

.console-panel {
    height: 200px;
    background: rgba(13, 17, 23, 0.9);
    border-top: 2px solid rgba(88, 166, 255, 0.3);
    display: flex;
    flex-direction: column;
}

.console-header {
    background: rgba(88, 166, 255, 0.1);
    padding: 8px 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 13px;
    font-weight: 600;
    color: #58a6ff;
}

.btn-small {
    background: rgba(139, 148, 158, 0.2);
    border: 1px solid rgba(139, 148, 158, 0.4);
    color: #8b949e;
    padding: 4px 12px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 12px;
}

.btn-small:hover {
    background: rgba(139, 148, 158, 0.3);
    color: #c9d1d9;
}

.console-output {
    flex: 1;
    overflow-y: auto;
    padding: 12px;
    font-family: "Courier New", Courier, monospace;
    font-size: 13px;
    color: #7ee787;
}

.console-output .error {
    color: #f85149;
    background: rgba(248, 81, 73, 0.1);
    padding: 8px;
    border-radius: 4px;
    border-left: 3px solid #f85149;
    margin: 5px 0;
}

.console-output .info {
    color: #58a6ff;
}

.console-output .warn {
    color: #d29922;
}

/* Info Bar */
.info-bar {
    background: rgba(88, 166, 255, 0.1);
    border-top: 1px solid rgba(88, 166, 255, 0.3);
    padding: 8px 20px;
    display: flex;
    gap: 20px;
    font-size: 12px;
    color: #8b949e;
}

/* Fullscreen Preview */
.fullscreen .main-area {
    flex-direction: column;
}

.fullscreen .editor-panel {
    display: none;
}

.fullscreen .preview-panel {
    flex: 1;
}

.fullscreen .preview-container {
    height: calc(100% - 80px);
}

/* Responsive */
@media (max-width: 900px) {
    .main-area {
        flex-direction: column;
    }
    
    .editor-panel, .preview-panel {
        height: 50%;
    }
    
    .top-bar {
        flex-wrap: wrap;
        gap: 10px;
    }
}

/* Scrollbar */
::-webkit-scrollbar {
    width: 10px;
    height: 10px;
}

::-webkit-scrollbar-track {
    background: #0d1117;
}

::-webkit-scrollbar-thumb {
    background: linear-gradient(135deg, #58a6ff, #1f6feb);
    border-radius: 5px;
}

::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(135deg, #1f6feb, #58a6ff);
}