import { useBackToTop } from '../hooks/useAnimations';

const BackToTop = () => {
  const { visible, scrollToTop } = useBackToTop();

  return (
    <button
      onClick={scrollToTop}
      className={`btn btn-lg btn-primary btn-lg-square back-to-top pt-2 ${
        visible ? 'show-btn' : ''
      }`}
      style={{ cursor: 'pointer', border: 'none' }}
    >
      <i className="bi bi-arrow-up"></i>
    </button>
  );
};

export default BackToTop;
