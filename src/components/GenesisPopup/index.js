// @flow
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import React, { useState } from 'react';
import genesisTimeline from '../../assets/genesis_timeline.png';
import BitmapSVG from './BitmapSVG';

const GenesisPopup = ({ checkedTheme }) => {
  const [open, setOpen] = useState(true);
  const closeModal = () => setOpen(false);
  const imageStyle = { 'max-width': '100%', 'max-height': '100%' };
  const closeStyle = { color: '#F79F53',
    cursor: 'pointer',
    'margin-right': '8px',
    'font-size': '40px',
    'text-decoration': 'none',
    'font-family': '"Source Code Pro", monospace' };

  return (
    <Modal
      open={open}
      closeOnOverlayClick
      showCloseIcon={false}
      onClose={closeModal}
      center
      styles={{
        modal: {
          'max-width': '1200px',
          padding: 0,
        },
      }}
    >
      <div className="titleBlock">
        <div className="titleBlock-wrap" style={{ display: 'flex', 'align-items': 'center' }}>
          <p style={{ color: '#F79F53' }} className="titleBlock-title">Genesis period</p>
        </div>
        <div style={{ display: 'flex', 'align-items': 'center' }}>
          <a className="close" style={closeStyle} onClick={closeModal}>
            &times;
          </a>
          <div style={{ display: 'flex', 'align-items': 'flex-start' }}>
            <BitmapSVG invert={checkedTheme !== 'dark'} />
          </div>
        </div>
      </div>
      <img src={genesisTimeline} alt="genesis period" style={imageStyle} />
    </Modal>
  );
};

export default GenesisPopup;
