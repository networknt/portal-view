export default {
  palette: {
    primary: {
      main: '#FFCB05',
      light: '#ffffee',
    },
    secondary: {
      main: '#004C6C',
      light: '#f5fcff',
    },
    tertiary: {
      main: '#ffd0d7',
      light: '#fffefe',
    },
    text: {
      primary: '#212121',
      secondary: '#1E2830',
      hint: '#7288A1',
    },
    background: {
      default: '#FCFCFC',
      light: '#F3F5FF',
    },
    custom: {
      darkBlue: '#004C6C',
      lightGrey: '#F3F3F5',
    },
  },
  customShadows: {
    widget:
      '0px 3px 11px 0px #E8EAFC, 0 3px 3px -2px #B2B2B21A, 0 1px 8px 0 #9A9A9A1A',
    widgetDark:
      '0px 3px 18px 0px #4558A3B3, 0 3px 3px -2px #B2B2B21A, 0 1px 8px 0 #9A9A9A1A',
    widgetWide:
      '0px 12px 33px 0px #E8EAFC, 0 3px 3px -2px #B2B2B21A, 0 1px 8px 0 #9A9A9A1A',
  },
  overrides: {
    MuiBackdrop: {
      root: {
        backgroundColor: '#4A4A4A1A',
      },
    },
    MuiMenu: {
      paper: {
        boxShadow:
          '0px 3px 11px 0px #E8EAFC, 0 3px 3px -2px #B2B2B21A, 0 1px 8px 0 #9A9A9A1A',
      },
    },
    MuiSelect: {
      icon: {
        color: '#B9B9B9',
      },
    },
    MuiListItem: {
      root: {
        '&$selected': {
          backgroundColor: '#F3F5FF !important',
          '&:focus': {
            backgroundColor: '#F3F5FF',
          },
        },
      },
      button: {
        '&:hover, &:focus': {
          backgroundColor: '#F3F5FF',
        },
      },
    },
    MuiTouchRipple: {
      child: {
        backgroundColor: 'white',
      },
    },
    MuiTableRow: {
      root: {
        height: 56,
      },
    },
    MuiTableCell: {
      root: {
        borderBottom: '1px solid rgba(224, 224, 224, .5)',
      },
      head: {
        fontSize: '0.95rem',
      },
      body: {
        fontSize: '0.95rem',
      },
    },
  },
};
