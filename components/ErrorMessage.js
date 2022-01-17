import React from 'react';

import PropTypes from 'prop-types';

// const ErrorStyles = styled.div`
//   padding: 2rem;
//   background: white;
//   margin: 2rem 0;
//   border: 1px solid rgba(0, 0, 0, 0.05);
//   border-left: 5px solid red;
//   p {
//     margin: 0;
//     font-weight: 100;
//   }
//   strong {
//     margin-right: 1rem;
//   }
// `;

const DisplayError = ({ error }) => {
  if (!error || !error.message) return null;
  if (
    error.networkError &&
    error.networkError.result &&
    error.networkError.result.errors.length
  ) {
    return error.networkError.result.errors.map((error, i) => (
      <div
        className='p-4 m-4 border-2 rounded-md bg-tokyo-term-black text-tokyo-term-red border-tokyo-term-red'
        key={i}
      >
        <p className='font-bold' data-test='graphql-error'>
          <strong className='mr-2 text-2xl'>Shoot!</strong>
          {error.message.replace('GraphQL error: ', '')}
        </p>
      </div>
    ));
  }
  return (
    <div>
      <p data-test='graphql-error'>
        <strong className='m-4 rounded-md text-tokyo-term-red border-tokyo-term-red'>
          Shoot!
        </strong>
        {error.message.replace('GraphQL error: ', '')}
      </p>
    </div>
  );
};

DisplayError.defaultProps = {
  error: {},
};

DisplayError.propTypes = {
  error: PropTypes.object,
};

export default DisplayError;
