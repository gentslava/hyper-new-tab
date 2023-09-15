exports.decorateConfig = (config) => {
    const tabText = document.querySelector('.tab_active .tab_text');
    const tabTextColor = tabText && window.getComputedStyle(tabText).color || '#fff';

    return Object.assign({}, config, {
        css: `
            ${config.css || ''}
            .tabs_nav.tabs_hiddenNav {
                display: block;
            }
            .tabs_list {
                margin-right: 36px;
            }
            .tab_new {
              position: absolute;
              top: 0;
              right: 0;
              width: 36px;
              height: 100%;

              display: flex;
              align-items: center;
              justify-content: center;

              font-size: large;
              color: ${tabTextColor};
            }
        `
    });
};

exports.decorateTabs = (Tabs, { React }) => {
    const newTab = () => window.rpc.emit('new');

    return class extends Tabs {
        render() {
            const newTabButton = React.createElement('div', { className: 'tab_new', onClick: newTab }, '+');
            const tabs = React.createElement(Tabs, Object.assign({}, this.props, { customChildren: newTabButton }));
            return tabs;
        }
    };
};
