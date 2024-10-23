import React from 'react';

const CircleCard = () => {
  return (
    <div>
      <div
        style={{
          height: '160px',
          width: '160px',
          color: '#fff',
          lineHeight: '160px',
          borderRadius: '50%',
          boxShadow: '2px 2px 13px rgba(0, 0, 0, 0.1)',
          background: '#ffffff',
          textAlign: 'center',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <img
          style={{
            margin: ' auto',
            // width: '100px',
            // height: '100px',
            // position: 'absolute',
            // left: '50%',
            // display: 'block',
            // position: 'absolute',
            // top: '50%',
            // right: '0',
            // left: '0',
            // borderRadius: '50%',
            // boxShadow: '10px',
            // margin: '0 auto',
          }}
          src="https://doccure.dreamstechnologies.com/react/template/assets/img/specialities/specialities-01.png"
        />
      </div>
      ABC
    </div>
  );
};

export default CircleCard;
