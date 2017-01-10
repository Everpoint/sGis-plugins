sGis.module('plugins.ZoomButtons', [
    'utils'
], (utils) => {

    "use strict";

    const TOP_CLASS = 'sGis-top';
    const BOTTOM_CLASS = 'sGis-bottom';
    const LEFT_CLASS = 'sGis-left';
    const RIGHT_CLASS = 'sGis-right';

    const WRAPPER_CLASS = 'sGis-zoomButtons';
    const ZOOM_IN_CLASS = 'sGis-zoomButtons-zoomIn';
    const ZOOM_OUT_CLASS = 'sGis-zoomButtons-zoomOut';

    class ZoomButtons {
        constructor(map, wrapper, properties) {
            this._map = map;
            this._init(wrapper);
            if (properties) utils.extend(this, properties, true);
        }

        _init(wrapper) {
            let container = utils.createNode('div', this.wrapperClass, {}, [
                utils.createNode('div', ZOOM_IN_CLASS, { onclick: this._zoomIn.bind(this) }),
                utils.createNode('div', ZOOM_OUT_CLASS, { onclick: this._zoomOut.bind(this) })
            ]);

            wrapper.appendChild(container);
            this._container = container;
        }

        _zoomIn() { this._map.zoom(1); }
        _zoomOut() { this._map.zoom(-1); }

        get position() { return this._position; }
        set position(position) {
            this._position = position;
            this._updateContainerClass();
        }

        _updateContainerClass() {
            this._container.className = this.wrapperClass;
        }

        get wrapperClass() {
            let className = WRAPPER_CLASS;
            className += ' ' + (this._position.indexOf('right') >= 0 ? RIGHT_CLASS : LEFT_CLASS);
            className += ' ' + (this._position.indexOf('bottom') >= 0 ? BOTTOM_CLASS : TOP_CLASS);
            return className;
        }
    }

    ZoomButtons.prototype._position = 'top left';

    return ZoomButtons
});