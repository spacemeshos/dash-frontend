import React from 'react';
import mobile from 'is-mobile';
import ReactTooltip from 'react-tooltip';

const TileTitle = ({ title, toolTipMessage, icon, url }) => {
  const textClassName = title.length > 20 ? 'tileTitle-text short-letter-spacing' : 'tileTitle-text';

  const isLayerEpochTitle = title === 'Layer / Epoch';

  const renderTitle = () => (
    <div className={textClassName}>
      {url ? (
        <a className="link" href={url} target="_blank" rel="noopener noreferrer">{ title }</a>
      ) : (
        title
      )}
    </div>
  );

  const renderLayerEpochTitle = () => (
    <div className="tileTitle-text">
      { url && (
        <>
          <a className="link" href={`${url}layers`} target="_blank" rel="noopener noreferrer">Layer</a>
          <span> / </span>
          <a className="link" href={`${url}epochs`} target="_blank" rel="noopener noreferrer">Epoch</a>
        </>
      )}
    </div>
  );

  return (
    <div className="tileTitle-wrap">
      { isLayerEpochTitle ? renderLayerEpochTitle() : renderTitle() }
      <div className="tileTitle-icons">
        <svg className="icon-tooltip" viewBox="0 0 10 10" data-tip data-for={`tile-tooltip-${icon}`} xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" clipRule="evenodd" d="M10 0H0V10H10V0ZM5.15678 6.416H4.58078C4.48082 5.7072 4.84794 5.25388 5.18382 4.83911C5.43934 4.52359 5.67678 4.23038 5.67678 3.864C5.67678 3.44 5.41278 3.088 4.90078 3.088C4.54878 3.088 4.22878 3.264 3.98078 3.552L3.60478 3.208C3.94078 2.824 4.38078 2.544 4.94878 2.544C5.77278 2.544 6.31678 3.032 6.31678 3.824C6.31678 4.32212 6.0258 4.67927 5.7342 5.03719C5.41229 5.4323 5.08962 5.82834 5.15678 6.416ZM4.88478 8.096C4.62078 8.096 4.41278 7.888 4.41278 7.6C4.41278 7.296 4.62078 7.088 4.88478 7.088C5.14878 7.088 5.36478 7.296 5.36478 7.6C5.36478 7.888 5.14878 8.096 4.88478 8.096Z" />
        </svg>
        <img className="icon-tile" src={icon} alt="" />
        {toolTipMessage && (
          <ReactTooltip effect="float" className="tileTitle-tooltip" place={mobile() ? 'left' : 'right'} id={`tile-tooltip-${icon}`} arrowColor="transparent" aria-haspopup="true">
            <svg className="active-tooltip-icon" viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M10 0H0V10H10V0ZM5.15678 6.416H4.58078C4.48082 5.7072 4.84794 5.25388 5.18382 4.83911C5.43934 4.52359 5.67678 4.23038 5.67678 3.864C5.67678 3.44 5.41278 3.088 4.90078 3.088C4.54878 3.088 4.22878 3.264 3.98078 3.552L3.60478 3.208C3.94078 2.824 4.38078 2.544 4.94878 2.544C5.77278 2.544 6.31678 3.032 6.31678 3.824C6.31678 4.32212 6.0258 4.67927 5.7342 5.03719C5.41229 5.4323 5.08962 5.82834 5.15678 6.416ZM4.88478 8.096C4.62078 8.096 4.41278 7.888 4.41278 7.6C4.41278 7.296 4.62078 7.088 4.88478 7.088C5.14878 7.088 5.36478 7.296 5.36478 7.6C5.36478 7.888 5.14878 8.096 4.88478 8.096Z" />
            </svg>
            <div style={{ width: mobile() ? '250px' : '350px' }}>
              {toolTipMessage}
            </div>
          </ReactTooltip>
        )}
      </div>
    </div>
  );
};

export default TileTitle;
