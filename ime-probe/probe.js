// Shared IME event probe, loaded as a classic script by both index.html and
// frame.html so the plain field and the iframe field are instrumented
// identically. Deliberately not an ES module: module scripts are blocked over
// file://, and the page must run by double-clicking it without a web server.

var ImeProbe = (function () {
    'use strict';

    // Identifies probe traffic on the postMessage channel from the iframe to
    // the top frame, so unrelated messages are ignored.
    var MESSAGE_TYPE = 'ime-probe-event';

    // Every event an IME commit can produce. keydown/keyup expose the
    // raw-vs-composition distinction (keyCode 229 / key "Process" means
    // committed text, not a real keypress); the composition trio shows the
    // preedit lifecycle; beforeinput/input carry inputType
    // (insertCompositionText vs insertText).
    var PROBED_EVENTS = [
        'keydown',
        'keyup',
        'compositionstart',
        'compositionupdate',
        'compositionend',
        'beforeinput',
        'input'
    ];

    // Events with no field payload of their own. A click followed by input
    // events with no keydown is the signature of text appearing without any
    // keystroke; focus/blur show whether the field lost input focus, which is
    // how a compositor-side window menu would swallow a pending key release.
    var CONTEXT_EVENTS = ['click', 'focus', 'blur'];

    function record(event, field, source) {
        return {
            type: MESSAGE_TYPE,
            time: performance.now(),
            event: event.type,
            key: typeof event.key === 'string' ? event.key : '',
            keyCode: typeof event.keyCode === 'number' ? event.keyCode : '',
            isComposing: event.isComposing === true,
            data: typeof event.data === 'string' ? event.data : '',
            inputType: typeof event.inputType === 'string' ? event.inputType : '',
            length: field.value.length,
            source: source
        };
    }

    function attach(field, source, report) {
        PROBED_EVENTS.concat(CONTEXT_EVENTS).forEach(function (type) {
            field.addEventListener(type, function (event) {
                report(record(event, field, source));
            });
        });
    }

    return { MESSAGE_TYPE: MESSAGE_TYPE, attach: attach };
})();
