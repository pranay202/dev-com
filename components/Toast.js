const Toast = ({ msg, handleShow, bgColor }) => {
  return (
    <div
      className={`toast rounded border show d-flex position-fixed text-light ${bgColor}`}
      style={{ top: '5px', right: '5px', zIndex: 9, minWidth: '230px' }}
      aria-atomic='true'
    >
      <div className={`toast-header ${bgColor} text-light`}>
        <strong className='mr-auto text-light'>{msg.title}</strong>

        <div className='toast-body'>- {msg.msg}</div>
      </div>
      <button
        type='button'
        className='ml-0 mr-0 mb-2 close text-light'
        data-dismiss='toast'
        style={{ outline: 'none' }}
        onClick={handleShow}
      >
        x
      </button>
    </div>
  );
};

export default Toast;
